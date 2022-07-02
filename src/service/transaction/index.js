// const bcrypt = require("bcryptjs");


//create transaction
const createTransaction = async (fuelStationDbConnection, body) => {
    try {
      // const Transaction = require('../../dbModel/transaction/schema');
  
      const Transactions = await fuelStationDbConnection.model('Transaction');
      
      const UserId = body.UserId;
      const Tag = body.Tag;
      const TotalAmount = body.TotalAmount;
      const TotalVolume = body.TotalVolume;
      const Amount = body.Amount;
      const Price = body.Price;
      const Transaction = body.Transaction;
      const TCVolume = body.TCVolume;
      const Volume = body.Volume;
      const Nozzle = body.Nozzle;
      const Pump = body.Pump;
      const DateTime = body.DateTime;
      const DateTimeStart = body.DateTimeStart; 
           
      const transactionPresent = await Transactions.findOne({
        DateTimeStart
      });
      if (transactionPresent) {
        throw new Error("Transaction Already Exist");
      }
      const newTransaction = await new Transactions({
        UserId,
        Tag,
        TotalAmount,
        TotalVolume,
        Amount,
        Price,
        Transaction,
        TCVolume,
        Volume,
        Nozzle,
        Pump,
        DateTime,
        DateTimeStart

      }).save();
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
  
  
  
  module.exports = { getAllTransactiones, createTransaction,getTransactionById,getDeleteById,getUpdateById };
  