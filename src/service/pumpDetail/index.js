// const bcrypt = require("bcryptjs");


//create pumpDetail
const createPumpDetail = async (fuelStationDbConnection, body) => {
    try {
      // const PumpDetail = require('../../dbModel/pumpDetail/schema');
  
      const PumpDetail = await fuelStationDbConnection.model('PumpDetail');
      const pumpDetail_address=body.pumpDetail_address; 
      const no_fuel_dispenser=body.no_fuel_dispenser; 
      const type_of_fuel=body.type_of_fuel; 
      const dispenser_brand=body.dispenser_brand; 
      const mainboard_image=body.mainboard_image; 
      const no_of_storage_tank=body.no_of_storage_tank; 
      const type_of_storage=body.type_of_storage; 
      const tank_height=body.tank_height; 
      const priceboard_brand=body.priceboard_brand; 
      const attached_calib_chart=body.attached_calib_chart; 
      
      const pumpDetailPresent = await PumpDetail.findOne({
          pumpDetail_address
      });
      if (pumpDetailPresent) {
        throw new Error("PumpDetail Already Exist");
      }
      const newPumpDetail = await new PumpDetail({
          pumpDetail_address,
          no_fuel_dispenser,
          type_of_fuel,
          dispenser_brand,
          mainboard_image,
          no_of_storage_tank,
          type_of_storage,
          tank_height,
          priceboard_brand,
          attached_calib_chart,
      }).save();
      return newPumpDetail;
    } catch (error) {
      // console.log("createPumpDetail error", error);
      throw error;
    }
  };
  
  //get all pumpDetailes
  
  const getAllPumpDetailes = async fuelStationDbConnection => {
    try {
      const PumpDetail = await fuelStationDbConnection.model("PumpDetail");
      const pumpDetailes = await PumpDetail.find({});
      // console.log("getAllPumpDetails pumpDetailes", pumpDetailes);
  
      return pumpDetailes;
    } catch (error) {
      // console.log("getAllPumpDetails error", error);
      throw error;
    }
  };
  
  //get pumpDetail by id view
  
  const getPumpDetailById = async fuelStationDbConnection => {
    try {
      const PumpDetail = await fuelStationDbConnection.model("PumpDetail");
      return PumpDetail;
    } catch (error) {
      // console.log("getAllPumpDetails error", error);
      throw error;
    }
  };
  
  //get pumpDetail by id delete
  
  const getDeleteById = async fuelStationDbConnection => {
    try {
      const PumpDetail = await fuelStationDbConnection.model("PumpDetail");
      return PumpDetail;
    } catch (error) {
      // console.log("getAllPumpDetails error", error);
      throw error;
    }
  };
  
  //get pumpDetail by id update
  
  const getUpdateById = async fuelStationDbConnection => {
    try {
      const PumpDetail = await fuelStationDbConnection.model("PumpDetail");
      return PumpDetail;
    } catch (error) {
      // console.log("getAllPumpDetails error", error);
      throw error;
    }
  };
  
  
  
  module.exports = { getAllPumpDetailes, createPumpDetail,getPumpDetailById,getDeleteById,getUpdateById };
  