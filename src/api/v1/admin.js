const { getConnection } = require("../../connectionManager");
const fuelStationService = require("../../service/fuelStation");
const jwt = require('jsonwebtoken');
const fuelstationModel =require("../../dbModel/fuelStation/schema");

const create = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log("create dbConnection", dbConnection.name);
    const fuelStation = await fuelStationService.createFuelStation(dbConnection, req.body);
    res.status(200).json({ 
      status: 'success',
      message: 'Fuel Station created successfully',
      data:fuelStation
     });  } catch (err) {
    console.log("signUp error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const loginFuelStation =  async  (req, res) => {

  try {
    const dbConnection = getConnection();
    console.log("signUp dbConnection", dbConnection.name);
    const fuelStation = await fuelStationService.loginFuelStations(dbConnection, req.body);

    const getAllFuelStations = await fuelStationService.getAllFuelStations(dbConnection);
    const fuelstationFound= getAllFuelStations.filter(x => x.email === req.body.email);

    const token = jwt.sign({_id:fuelStation._id},process.env.ENCRYPT_TOKEN);

    const station_profile={

        id:fuelStation._id,
        name:fuelStation.name,
        station_address:fuelStation.station_address,
        phone_number:fuelStation.phoneNumber,
        email:fuelStation.email,
        dbURI: `${process.env.BASE_DB_URI}/${fuelStation.name}`

        
    }
    res.header('fuelsoft-token',token).send(
        {
            status: 'success',
            token: token,
            profile:fuelstationFound[0]
        }
    );
      
  } catch (err) {
    console.log("login error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
  
  
};

const fetchAll = async (req, res) => {
  try {
    const dbConnection = getConnection();
    // console.log("fetchAll dbConnection", dbConnection.name);
    const fuelStations = await fuelStationService.getAllFuelStations(dbConnection);
    res.status(200).json({ success: true, fuelStations });
  } catch (err) {
    console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

module.exports = { create, fetchAll, loginFuelStation };
