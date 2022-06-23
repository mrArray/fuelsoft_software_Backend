const { createNamespace } = require("continuation-local-storage");

const {
  getConnectionByFuelStation,
  getAdminConnection
} = require("../connectionManager");

// Create a namespace for the application.
let nameSpace = createNamespace("unique context");

/**
 * Get the connection instance for the given fuelStation's name and set it to the current context.
 */
const resolveFuelStation = (req, res, next) => {
  const fuelStation = req.headers.fuelStation;

  // console.log(fuelStation)
  if (!fuelStation) {
    return res
      .status(500)
      .json({ error: `Please provide fuelStation's name to connect` });
  }

  // Run the application in the defined namespace. It will contextualize every underlying function calls.
  nameSpace.run(() => {
    const fuelStationDbConnection = getConnectionByFuelStation(fuelStation);
    console.log(
      "resolveFuelStation fuelStationDbConnection",
      fuelStationDbConnection && fuelStationDbConnection.name
    );
    nameSpace.set("connection", fuelStationDbConnection);
    next();
  });
};

/**
 * Get the admin db connection instance and set it to the current context.
 */
const setAdminDb = (req, res, next) => {
  // Run the application in the defined namespace. It will contextualize every underlying function calls.
  nameSpace.run(() => {
    const adminDbConnection = getAdminConnection();
    // console.log("setAdminDb adminDbConnection", adminDbConnection.name);
    nameSpace.set("connection", adminDbConnection);
    next();
  });
};

module.exports = { resolveFuelStation, setAdminDb };
