const { getConnection } = require("../../connectionManager");
const fuelStationService = require("../../service/fuelStation");

const create = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log("create dbConnection", dbConnection.name);
    const fuelStation = await fuelStationService.createFuelStation(dbConnection, req.body);
    res.status(200).json({ success: true, fuelStation });
  } catch (err) {
    console.log("signUp error", err);
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

module.exports = { create, fetchAll };
