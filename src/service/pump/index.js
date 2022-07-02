// const bcrypt = require("bcryptjs");


//create pump
const createPump = async (fuelStationDbConnection, body) => {
    try {
      // const Pump = require('../../dbModel/pump/schema');
  
      const Pump = await fuelStationDbConnection.model('Pump');

     
      const Id=body.Id; 
      const Port=body.Port; 
      const Address=body.Address; 
      
      const pumpPresent = await Pump.findOne({
          Id
      });
      if (pumpPresent) {
        throw new Error("Pump Already Exist");
      }
      const newPump = await new Pump({
        Id,
        Port,
        Address
      }).save();
      return newPump;
    } catch (error) {
      // console.log("createPump error", error);
      throw error;
    }
  };
  
  //get all pumpes
  
  const getAllPumpes = async fuelStationDbConnection => {
    try {
      const Pump = await fuelStationDbConnection.model("Pump");
      const pumpes = await Pump.find({});
      // console.log("getAllPumps pumpes", pumpes);
  
      return pumpes;
    } catch (error) {
      // console.log("getAllPumps error", error);
      throw error;
    }
  };
  
  //get pump by id view
  
  const getPumpById = async fuelStationDbConnection => {
    try {
      const Pump = await fuelStationDbConnection.model("Pump");
      return Pump;
    } catch (error) {
      // console.log("getAllPumps error", error);
      throw error;
    }
  };
  
  //get pump by id delete
  
  const getDeleteById = async fuelStationDbConnection => {
    try {
      const Pump = await fuelStationDbConnection.model("Pump");
      return Pump;
    } catch (error) {
      // console.log("getAllPumps error", error);
      throw error;
    }
  };
  
  //get pump by id update
  
  const getUpdateById = async fuelStationDbConnection => {
    try {
      const Pump = await fuelStationDbConnection.model("Pump");
      return Pump;
    } catch (error) {
      // console.log("getAllPumps error", error);
      throw error;
    }
  };
  
  
  
  module.exports = { getAllPumpes, createPump,getPumpById,getDeleteById,getUpdateById };
  