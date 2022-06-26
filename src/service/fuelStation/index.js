
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

    const name = body.name.replace(/ /g, "");
    const email = body.email;
    const station_address = body.station_address;
    const company = body.company;
    // const no_fuel_dispenser = body.no_fuel_dispenser;
    // const type_of_fuel = body.type_of_fuel;
    // const dispenser_brand = body.dispenser_brand;
    // const mainboard_image = body.mainboard_image;
    // const no_of_storage_tank = body.no_of_storage_tank;
    // const type_of_storage = body.type_of_storage;
    // const tank_height = body.tank_height;
    // const priceboard_brand = body.priceboard_brand;
    // const attached_calib_chart = body.attached_calib_chart;


    const fuelStationPresent = await FuelStation.findOne({
      name
    });
    if (fuelStationPresent) {
      throw new Error("This FuelStation Already Exist");
    }
    const newFuelStation = await new FuelStation(
      {
        name,
        email,
        station_address,
        company,
        // no_fuel_dispenser,
        // type_of_fuel,
        // dispenser_brand,
        // mainboard_image,
        // no_of_storage_tank,
        // type_of_storage,
        // tank_height,
        // priceboard_brand,
        // attached_calib_chart,
        dbURI: `${process.env.BASE_DB_URI}/${name}`
      }).save();
    return newFuelStation;
  } catch (error) {
    console.log("createFuelStation error", error);
    throw error;
  }
};

module.exports = { getAllFuelStations, createFuelStation };


