// const bcrypt = require("bcryptjs");


//create branch
const createBranch = async (fuelStationDbConnection, body) => {
  try {
    // const Branch = require('../../dbModel/branch/schema');

    const Branch = await fuelStationDbConnection.model('Branch');
    const branch_address=body.branch_address; 
    const no_fuel_dispenser=body.no_fuel_dispenser; 
    const type_of_fuel=body.type_of_fuel; 
    const dispenser_brand=body.dispenser_brand; 
    const mainboard_image=body.mainboard_image; 
    const no_of_storage_tank=body.no_of_storage_tank; 
    const type_of_storage=body.type_of_storage; 
    const tank_height=body.tank_height; 
    const priceboard_brand=body.priceboard_brand; 
    const attached_calib_chart=body.attached_calib_chart; 
    
    const branchPresent = await Branch.findOne({
        branch_address
    });
    if (branchPresent) {
      throw new Error("Branch Already Exist");
    }
    const newBranch = await new Branch({
        branch_address,
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
    return newBranch;
  } catch (error) {
    // console.log("createBranch error", error);
    throw error;
  }
};

//get all branches

const getAllBranches = async fuelStationDbConnection => {
  try {
    const Branch = await fuelStationDbConnection.model("Branch");
    const branches = await Branch.find({});
    // console.log("getAllBranchs branches", branches);

    return branches;
  } catch (error) {
    // console.log("getAllBranchs error", error);
    throw error;
  }
};

//get branch by id view

const getBranchById = async fuelStationDbConnection => {
  try {
    const Branch = await fuelStationDbConnection.model("Branch");
    return Branch;
  } catch (error) {
    // console.log("getAllBranchs error", error);
    throw error;
  }
};

//get branch by id delete

const getDeleteById = async fuelStationDbConnection => {
  try {
    const Branch = await fuelStationDbConnection.model("Branch");
    return Branch;
  } catch (error) {
    // console.log("getAllBranchs error", error);
    throw error;
  }
};

//get branch by id update

const getUpdateById = async fuelStationDbConnection => {
  try {
    const Branch = await fuelStationDbConnection.model("Branch");
    return Branch;
  } catch (error) {
    // console.log("getAllBranchs error", error);
    throw error;
  }
};



module.exports = { getAllBranches, createBranch,getBranchById,getDeleteById,getUpdateById };
