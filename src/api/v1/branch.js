const { getConnection } = require("../../connectionManager");
const branchService = require("../../service/branch");
const userService = require("../../service/user");

const branchSignUp = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log("branchSignUp dbConnection", dbConnection.name);
    const branch = await branchService.createBranch(dbConnection, req.body);
    // console.log(req.body)

    res.status(200).json({ success: true, branch },
      );
  } catch (err) {
    console.log("branchSignUp error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};




const fetchAll = async (req, res) => {
  try {
    const dbConnection = getConnection();

    // console.log("fetchAll dbConnection", dbConnection.name);
    const branches = await branchService.getAllBranches(dbConnection);
    res.status(200).send(
      { success: true, 
       branches: branches,
      },
        );

        console.log( "value:",disUser);
  } catch (err) {
    // console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};



module.exports = { branchSignUp, fetchAll };

