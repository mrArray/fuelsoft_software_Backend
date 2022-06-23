const { getNamespace } = require("continuation-local-storage");

const { initAdminDbConnection } = require("./db/admin");

const { initFuelStationDbConnection } = require("./db/fuelStation");

const fuelStationService = require("./service/fuelStation");




let connectionMap;
let adminDbConnection;

/**
 * Create knex instance for all the fuelStations defined in common database and store in a map.
 **/
const connectAllDb = async () => {
  let fuelStations;
  const ADMIN_DB_URI = `${process.env.BASE_DB_URI}/${process.env.ADMIN_DB_NAME}`;
  adminDbConnection = initAdminDbConnection(ADMIN_DB_URI);
  // console.log("connectAllDb adminDbConnection", adminDbConnection.name);
  try {
    fuelStations = await fuelStationService.getAllFuelStations(adminDbConnection);
    // console.log("connectAllDb fuelStations", fuelStations);
  } catch (e) {
    console.log("connectAllDb error", e);
    return;
  }

  connectionMap = fuelStations
    .map(fuelStation => {
      return {
        [fuelStation.name]: initFuelStationDbConnection(fuelStation.dbURI)
      };
    })
    .reduce((prev, next) => {
      return Object.assign({}, prev, next);
    }, {});
  // console.log("connectAllDb connectionMap", connectionMap);
};

/**
 * Get the connection information (knex instance) for the given fuelStation's slug.
 */
const getConnectionByFuelStation = fuelStationName => {
  console.log(`Getting connection for ${fuelStationName}`);
  if (connectionMap) {
    return connectionMap[fuelStationName];
  }
};

/**
 * Get the admin db connection.
 */
const getAdminConnection = () => {
  if (adminDbConnection) {
    console.log("Getting adminDbConnection");
    return adminDbConnection;
  }
};

/**
 * Get the connection information (knex instance) for current context. Here we have used a
 * getNamespace from 'continuation-local-storage'. This will let us get / set any
 * information and binds the information to current request context.
 */

const getConnection = () => {
  const nameSpace = getNamespace("unique context");
  const conn = nameSpace.get("connection");

  if (!conn) {
    throw new Error("Connection is not set for any fuelStation database");
  }

  return conn;
};

module.exports = {
  connectAllDb,
  getAdminConnection,
  getConnection,
  getConnectionByFuelStation
};
