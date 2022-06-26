const express = require('express');
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { connectAllDb } = require("./connectionManager");

// Express app instance
const app = express();
const PORT = 9001;
app.set("port", PORT);

// helmet for security purpose
app.use(helmet());
dotenv.config();



//Connect to Database
const mongoString = process.env.BASE_DB_URI;

mongoose.connect(mongoString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
});
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})



// Parsing the body of the http middleware
app.use(express.json());


// Logging Http Request
const log4js = require("log4js");
const appLogger = log4js.getLogger();
app.use(log4js.connectLogger(appLogger));

// CORS - To hanlde cross origin requests
const cors = require("cors");
app.use(cors());

// Parsing the body of the http
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


connectAllDb();

global.appRoot = path.resolve(__dirname);

// mount the api routes
const router = require("./api/routes");
router(app);

app.listen(PORT, () => {
  console.log(`Express server started at port: ${PORT}`);
});






