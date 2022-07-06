// const bcrypt = require("bcryptjs");


//create transaction
const createTransaction = async (fuelStationDbConnection, body) => {
  try {

    const Transactions = await fuelStationDbConnection.model('Transaction');
    // const result=[];
    // const obj={};
    // console.log("body error", body);

    // for (let i = 0; i < body.fields.length; i++) {

    //      obj.UserId = body.fields[i].UserId;
    //      obj.Tag = body.fields[i].Tag;
    //      obj.TotalAmount = body.fields[i].TotalAmount;
    //      obj.TotalVolume = body.fields[i].TotalVolume;
    //      obj.Amount = body.fields[i].Amount;
    //      obj.Price = body.fields[i].Price;
    //      obj.Transaction = body.fields[i].Transaction;
    //      obj.TCVolume = body.fields[i].TCVolume;
    //      obj.Volume = body.fields[i].Volume;
    //      obj.Nozzle = body.fields[i].Nozzle;
    //      obj.Pump = body.fields[i].Pump;
    //      obj.DateTime = body.fields[i].DateTime;
    //      obj.DateTimeStart = body.fields[i].DateTimeStart; 
    //      obj.Pushed = body.fields[i].true; 
    //      result.push({ ...obj });
    //      const DateTimeStart = body.fields[i].DateTimeStart; 
    // }

    // console.log("lets see", ...body);

    for (let i = 0; i < body.length; i++) {

      const DateTimeStart = body[i].DateTimeStart;
      const transactionPresent = await Transactions.findOne(
        {
          DateTimeStart

        }
      );
      if (transactionPresent) {
        throw new Error("Transaction Already Exist");
      }
    }
    //  Updating properties in multiple objects
   
    const newTrx = body.map(obj => {
      if (obj.Pushed === false) {
        return { ...obj, Pushed: true };
      }

      return obj;
    });

    const newTransaction = await Transactions.insertMany(newTrx);

    return newTransaction;

  } catch (error) {
    // console.log("createTransaction error", error);
    throw error;
  }
};

//get all transactiones

const getAllTransactiones = async fuelStationDbConnection => {
  try {
    const Transaction = await fuelStationDbConnection.model("Transaction");
    const transactiones = await Transaction.find({});
    // console.log("getAllTransactions transactiones", transactiones);

    return transactiones;
  } catch (error) {
    // console.log("getAllTransactions error", error);
    throw error;
  }
};

//get transaction by id view

const getTransactionById = async fuelStationDbConnection => {
  try {
    const Transaction = await fuelStationDbConnection.model("Transaction");
    return Transaction;
  } catch (error) {
    // console.log("getAllTransactions error", error);
    throw error;
  }
};

//get transaction by id delete

const getDeleteById = async fuelStationDbConnection => {
  try {
    const Transaction = await fuelStationDbConnection.model("Transaction");
    return Transaction;
  } catch (error) {
    // console.log("getAllTransactions error", error);
    throw error;
  }
};

//get transaction by id update

const getUpdateById = async fuelStationDbConnection => {
  try {
    const Transaction = await fuelStationDbConnection.model("Transaction");
    return Transaction;
  } catch (error) {
    // console.log("getAllTransactions error", error);
    throw error;
  }
};



module.exports = { getAllTransactiones, createTransaction, getTransactionById, getDeleteById, getUpdateById };
