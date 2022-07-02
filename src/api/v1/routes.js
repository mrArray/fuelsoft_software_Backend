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
v1Routes.post("/admin/fuelstation/login", adminApi.loginFuelStation);
v1Routes.get("/admin/fuelstation",let_verify, adminApi.fetchAll);

// user
const userApi = require("./user");
v1Routes.post("/fuelstation/user/signup",let_verify, userApi.signUp);
v1Routes.post("/fuelstation/user/signin",let_verify, userApi.loginUser);
v1Routes.get("/fuelstation/user",let_verify, userApi.fetchAll);


// Branch
const branchApi = require("./branch");
v1Routes.post("/fuelstation/branch/signup",let_verify, branchApi.branchSignUp);
v1Routes.get("/fuelstation/branch",let_verify, branchApi.fetchAll);
v1Routes.get("/fuelstation/branch/:branchId",let_verify, branchApi.fetchById);
v1Routes.delete("/fuelstation/branch/:branchId",let_verify, branchApi.deleteById);
v1Routes.patch("/fuelstation/branch/:branchId",let_verify, branchApi.updateById);

// Transaction
const transactionApi = require("./transactions");
v1Routes.post("/fuelstation/transaction/push",let_verify, transactionApi.transactionSignUp);
v1Routes.get("/fuelstation/transaction/get",let_verify, transactionApi.fetchAll);
v1Routes.get("/fuelstation/transaction/:transactionId",let_verify, transactionApi.fetchById);
v1Routes.delete("/fuelstation/transaction/:transactionId",let_verify, transactionApi.deleteById);
v1Routes.patch("/fuelstation/transaction/:transactionId",let_verify, transactionApi.updateById);

// PumpDetail
const pumpDetailApi = require("./pumpDetail");
v1Routes.post("/fuelstation/pumpdetail/push",let_verify, pumpDetailApi.pumpDetailSignUp);
v1Routes.get("/fuelstation/pumpdetail/get",let_verify, pumpDetailApi.fetchAll);
v1Routes.get("/fuelstation/pumpdetail/:pumpdetailId",let_verify, pumpDetailApi.fetchById);
v1Routes.delete("/fuelstation/pumpdetail/:pumpdetailId",let_verify, pumpDetailApi.deleteById);
v1Routes.patch("/fuelstation/pumpdetail/:pumpdetailId",let_verify, pumpDetailApi.updateById);



// Pump
const pumpApi = require("./pump");
v1Routes.post("/fuelstation/pump/add",let_verify, pumpApi.pumpSignUp);
v1Routes.get("/fuelstation/pump",let_verify, pumpApi.fetchAll);
v1Routes.get("/fuelstation/pump/:pumpId",let_verify, pumpApi.fetchById);
v1Routes.delete("/fuelstation/pump/:pumpId",let_verify, pumpApi.deleteById);
v1Routes.patch("/fuelstation/pump/:pumpId",let_verify, pumpApi.updateById);



// Pump
const tagApi = require("./tag");
v1Routes.post("/fuelstation/tag/add",let_verify, tagApi.tagSignUp);
v1Routes.get("/fuelstation/tag",let_verify, tagApi.fetchAll);
v1Routes.get("/fuelstation/tag/:tagId",let_verify, tagApi.fetchById);
v1Routes.delete("/fuelstation/tag/:tagId",let_verify, tagApi.deleteById);
v1Routes.patch("/fuelstation/tag/:tagId",let_verify, tagApi.updateById);


module.exports = v1Routes;


