
const { getConnection } = require("../../connectionManager");
const pumpDetailService = require("../../service/pumpDetail");
// const userService = require("../../service/user");

const pumpDetailSignUp = async (req, res) => {
  try {
    const dbConnection = getConnection();
    // console.log("pumpDetailSignUp dbConnection", dbConnection.name);
    const pumpDetail = await pumpDetailService.createPumpDetail(dbConnection, req.body);
    const station = req.headers.fuel_station;

    res.status(200).json(
      { 
        success: true,
        station: station,
        pumpDetail:pumpDetail,
      }
    );
  } catch (err) {
    // console.log("pumpDetailSignUp error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};


const fetchAll = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const pumpDetailes = await pumpDetailService.getAllPumpDetailes(dbConnection);

    const station = req.headers.fuel_station;
    // console.log(dbConnection)

    const custome_pumpDetail = [];
    const pumpDetailObj = {}
    for (let i = 0; i < pumpDetailes.length; i++) {
      
      pumpDetailObj.id = pumpDetailes[i]._id ;
      pumpDetailObj.station = station;
      pumpDetailObj.pumpDetail_address = pumpDetailes[i].pumpDetail_address ;
      pumpDetailObj.no_fuel_dispenser = pumpDetailes[i].no_fuel_dispenser ;
      pumpDetailObj.type_of_fuel = pumpDetailes[i].type_of_fuel ;
      pumpDetailObj.dispenser_brand = pumpDetailes[i].dispenser_brand ;
      pumpDetailObj.mainboard_image = pumpDetailes[i].mainboard_image ;
      pumpDetailObj.no_of_storage_tank = pumpDetailes[i].no_of_storage_tank ;
      pumpDetailObj.tank_height = pumpDetailes[i].tank_height ;
      pumpDetailObj.priceboard_brand = pumpDetailes[i].priceboard_brand ;
      pumpDetailObj.attached_calib_chart = pumpDetailes[i].attached_calib_chart ;
      pumpDetailObj.createdAt = pumpDetailes[i].createdAt ;
      pumpDetailObj.updatedAt = pumpDetailes[i].updatedAt ;
      // pumpDetailObj.__v = pumpDetailes[i].__v ;

      custome_pumpDetail.push({ ...pumpDetailObj });
    }

    res.status(200).json({
      success:true,
      pumpDetailes:custome_pumpDetail

    });

  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const fetchById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const pumpDetailes = await pumpDetailService.getPumpDetailById(dbConnection);
    const singlePumpDetail= await pumpDetailes.findById(req.params.pumpDetailId);

    res.status(200).json(
      { success: true, 
       pumpDetailes: singlePumpDetail,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const pumpDetailes = await pumpDetailService.getDeleteById(dbConnection);
    const removePumpDetail= await pumpDetailes.remove({_id:req.params.pumpDetailId});

    res.status(200).json(
      {
        success: true, 
        message: "PumpDetail Successfully Deleted", 
        pumpDetailes: removePumpDetail,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const updateById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const pumpDetailes = await pumpDetailService.getDeleteById(dbConnection);

    const pumpDetailData = {

    _id: req.params.pumpDetailId,
    pumpDetail_address: req.body.pumpDetail_address,
    no_fuel_dispenser:req.body.no_fuel_dispenser,
    type_of_fuel: req.body.type_of_fuel,
    dispenser_brand:req.body.dispenser_brand,
    mainboard_image: req.body.mainboard_image,
    no_of_storage_tank: req.body.no_of_storage_tank,
    type_of_storage: req.body.type_of_storage,
    tank_height: req.body.tank_height,
    priceboard_brand: req.body.priceboard_brand,
      
    };

    const updatePumpDetail= await pumpDetailes.updateMany(
      {_id:req.params.pumpDetailId},  pumpDetailData    
      );

    res.status(200).json(
      {
        success: true, 
        message: "PumpDetail Successfully Updated", 
        pumpDetailes: updatePumpDetail,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};


module.exports = { pumpDetailSignUp, fetchAll,fetchById,deleteById,updateById };

