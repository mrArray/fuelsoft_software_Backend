const express = require("express");

// connection resolver for fuelStation
const connectionResolver = require("../../middlewares/connectionResolver");



// Mounting routes
const v1Routes = express.Router();



v1Routes.use("/fuelstation", connectionResolver.resolveFuelStation);
v1Routes.use("/admin", connectionResolver.setAdminDb);


//admin auth
const let_verify = require('./tokenVerification');
const admin_route = require('./registerAdmin');
v1Routes.post('/admin/register', admin_route.createAdmin);
v1Routes.get('/admin/accounts',let_verify, admin_route.AllAdmin);
v1Routes.post('/admin/login', admin_route.loginAdmin);

// admin
const adminApi = require("./admin");
v1Routes.post("/admin/fuelstation/register", adminApi.create);
v1Routes.get("/admin/fuelstation",let_verify, adminApi.fetchAll);

// user
const userApi = require("./user");
v1Routes.post("/fuelstation/user/signup", userApi.signUp);
v1Routes.get("/fuelstation/user",let_verify, userApi.fetchAll);

module.exports = v1Routes;


