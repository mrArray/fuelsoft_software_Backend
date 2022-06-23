
const getAllFuelStations = async adminDbConnection => {
  try {
    const FuelStation = await adminDbConnection.model("FuelStation");
    const fuelStations = await FuelStation.find({});
    // console.log("getAllFuelStations fuelStations", fuelStations);
    return fuelStations;
  } catch (error) {
    console.log("getAllFuelStations error", error);
    throw error;
  }
};

const createFuelStation = async (adminDbConnection, body) => {
  try {
    const FuelStation = await adminDbConnection.model("FuelStation");
    const name = body.name;
    const fuelStationPresent = await FuelStation.findOne({
      name
    });
    if (fuelStationPresent) {
      throw new Error("FuelStation Already Present");
    }
    const newFuelStation = await new FuelStation({
      name,
      dbURI: `${process.env.BASE_DB_URI}/${name}`
    }).save();
    return newFuelStation;
  } catch (error) {
    console.log("createFuelStation error", error);
    throw error;
  }
};

module.exports = { getAllFuelStations, createFuelStation };
