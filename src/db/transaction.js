const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 1,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open");
});

// If the connection throws an error
mongoose.connection.on("error", err => {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

const initTransactionDbConnection = DB_URL => {
  try {
    const db = mongoose.createConnection(DB_URL, clientOption);

    db.on(
      "error",
      console.error.bind(
        console,
        "initTransactionDbConnection MongoDB Connection Error>> : "
      )
    );
    db.once("open", () => {
      console.log("initTransactionDbConnection client MongoDB Connection ok!");
    });

    // require all schemas !?
    require("../dbModel/transaction/schema");
    return db;
  } catch (error) {
    console.log("initTransactionDbConnection error", error);
  }
};

module.exports = {
  initTransactionDbConnection
};
