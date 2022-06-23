const express = require("express");

// connection resolver for fuelStation
const connectionResolver = require("../../middlewares/connectionResolver");

// Mounting routes
const v1Routes = express.Router();

v1Routes.use("/fuelstation", connectionResolver.resolveFuelStation);
v1Routes.use("/admin", connectionResolver.setAdminDb);

// admin
const adminApi = require("./admin");
v1Routes.post("/admin/fuelstation", adminApi.create);
v1Routes.get("/admin/fuelstation", adminApi.fetchAll);

// user
const userApi = require("./user");
v1Routes.post("/fuelstation/user/signup", userApi.signUp);
v1Routes.get("/fuelstation/user", userApi.fetchAll);

module.exports = v1Routes;
