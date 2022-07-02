const { getConnection } = require("../../connectionManager");
const pumpService = require("../../service/pump");
// const userService = require("../../service/user");

const pumpSignUp = async (req, res) => {
  try {
    const dbConnection = getConnection();
    // console.log("pumpSignUp dbConnection", dbConnection.name);
    const pump = await pumpService.createPump(dbConnection, req.body);
    const station = req.headers.fuel_station;

    res.status(200).json(
      { 
        success: true,
        station: station,
        pump:pump,
      }
    );
  } catch (err) {
    // console.log("pumpSignUp error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const fetchAll = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const pumpes = await pumpService.getAllPumpes(dbConnection);

    const station = req.headers.fuel_station;
    // console.log(dbConnection)

    const custome_pump = [];
    const pumpObj = {}
    for (let i = 0; i < pumpes.length; i++) {
      
      pumpObj.id = pumpes[i]._id ;
      pumpObj.station = station;
      pumpObj.Id = pumpes[i].Id ;
      pumpObj.Port = pumpes[i].Port ;
      pumpObj.Address = pumpes[i].Address ;
      pumpObj.createdAt = pumpes[i].createdAt ;
      pumpObj.updatedAt = pumpes[i].updatedAt ;
      // pumpObj.__v = pumpes[i].__v ;

      custome_pump.push({ ...pumpObj });
    }

    res.status(200).json({
      success:true,
      pumpes:custome_pump

    });

  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const fetchById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const pumpes = await pumpService.getPumpById(dbConnection);
    const singlePump= await pumpes.findById(req.params.pumpId);

    res.status(200).json(
      { success: true, 
       pumpes: singlePump,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const pumpes = await pumpService.getDeleteById(dbConnection);
    const removePump= await pumpes.remove({_id:req.params.pumpId});

    res.status(200).json(
      {
        success: true, 
        message: "Pump Successfully Deleted", 
        pumpes: removePump,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const updateById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const pumpes = await pumpService.getDeleteById(dbConnection);

    const pumpData = {


      _id: req.params.pumpId,

      Id: req.body.Id,
      Port: req.body.Port,
      Address: req.body.Address,


    };

    const updatePump= await pumpes.updateMany(
      {_id:req.params.pumpId},  pumpData    
      );

    res.status(200).json(
      {
        success: true, 
        message: "Pump Successfully Updated", 
        pumpes: updatePump,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};


module.exports = { pumpSignUp, fetchAll,fetchById,deleteById,updateById };

