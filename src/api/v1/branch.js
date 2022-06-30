const { getConnection } = require("../../connectionManager");
const branchService = require("../../service/branch");
// const userService = require("../../service/user");

const branchSignUp = async (req, res) => {
  try {
    const dbConnection = getConnection();
    // console.log("branchSignUp dbConnection", dbConnection.name);
    const branch = await branchService.createBranch(dbConnection, req.body);
    const station = req.headers.fuel_station;

    res.status(200).json(
      { 
        success: true,
        station: station,
        branch:branch,
      }
    );
  } catch (err) {
    // console.log("branchSignUp error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};


const fetchAll = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const branches = await branchService.getAllBranches(dbConnection);
    res.status(200).json(
      { success: true, 
       branches: branches,
      },
        );

  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const fetchById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const branches = await branchService.getBranchById(dbConnection);
    const singleBranch= await branches.findById(req.params.branchId);

    res.status(200).json(
      { success: true, 
       branches: singleBranch,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const branches = await branchService.getDeleteById(dbConnection);
    const removeBranch= await branches.remove({_id:req.params.branchId});

    res.status(200).json(
      {
        success: true, 
        message: "Branch Successfully Deleted", 
        branches: removeBranch,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const updateById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const branches = await branchService.getDeleteById(dbConnection);

    const branchData = {

    _id: req.params.branchId,
    branch_address: req.body.branch_address,
    no_fuel_dispenser:req.body.no_fuel_dispenser,
    type_of_fuel: req.body.type_of_fuel,
    dispenser_brand:req.body.dispenser_brand,
    mainboard_image: req.body.mainboard_image,
    no_of_storage_tank: req.body.no_of_storage_tank,
    type_of_storage: req.body.type_of_storage,
    tank_height: req.body.tank_height,
    priceboard_brand: req.body.priceboard_brand,
      
    };

    const updateBranch= await branches.updateMany(
      {_id:req.params.branchId},  branchData    
      );

    res.status(200).json(
      {
        success: true, 
        message: "Branch Successfully Updated", 
        branches: updateBranch,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};


module.exports = { branchSignUp, fetchAll,fetchById,deleteById,updateById };

