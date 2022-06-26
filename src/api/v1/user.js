const { getConnection } = require("../../connectionManager");
const userService = require("../../service/user");
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    const dbConnection = getConnection();
    console.log("signUp dbConnection", dbConnection.name);
    const user = await userService.createUser(dbConnection, req.body);
    // console.log(req.body)
    res.status(200).json({ 
    status: 'success',
    message: 'User created successfully'
   });
  } catch (err) {
    console.log("signUp error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
  
};

const loginUser =  async  (req, res) => {

  try {
    const dbConnection = getConnection();
    console.log("signUp dbConnection", dbConnection.name);
    const user = await userService.loginUser(dbConnection, req.body);
    // console.log(req.body)
    
    //return login user
    const user_to_save = await user.save();
    const token = jwt.sign({_id:user._id},process.env.ENCRYPT_TOKEN);
    const custom_profile={
        id:user_to_save._id,
        fullname:user_to_save.name,
        phone_number:user_to_save.phoneNumber,
        email:user_to_save.email
        
    }
    res.header('fuelsoft-token',token).send(
        {
            status: 'success',
            token: token,
            profile:custom_profile
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
    const users = await userService.getAllUsers(dbConnection);
    const company = req.headers.fuel_station;


    const custom_profile=[]
    const userObj = {}
    for (let i = 0; i < users.length; i++) {
      userObj.id = users[i]._id;
      userObj.name = users[i].fullname;
      userObj.phone_number = users[i].phoneNumber;
      userObj.email = users[i].email;
      userObj.company = company;
      userObj.branch = users[i].branch;
      userObj.created_at = users[i].createdAt;
      userObj.updated_at = users[i].updatedAt;
      
      custom_profile.push({ ...userObj });
     
    }
    
    res.status(200).send({ success: true, custom_profile });
  } catch (err) {
    console.log("fetchAll error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

module.exports = { signUp, fetchAll,loginUser };


// const { getConnection } = require("../../connectionManager");
// const userService = require("../../service/user");
// const UserModel = require('../../dbModel/user/schema');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { registrationValidation, loginValidation } = require('../v1/validateAdmin');


// const signUp = async (req, res) => {
 
//     //validate
//     const { error } = registrationValidation(req.body);
//     if (error) return res.status(400).send(
//         {
//             status: 'ERROR',
//             message: error.details[0].message,
//         }
//     );

//     //check if  user already exist in the database
//     const doesEmailExist = await UserModel.findOne({ email: req.body.email });
//     if (doesEmailExist) return res.status(400).send(

//         {
//             status: 'ERROR',
//             message: 'This email address is already registered'
//         }
//     );

//     //hash users password
//     const salt = await bcrypt.genSalt(15);
//     const HashedPaasword = await bcrypt.hash(req.body.password, salt)

//     //create new user
//     const user = new UserModel({
//         name: req.body.name,
//         email: req.body.email,
//         phoneNumber: req.body.phoneNumber,
//         password: HashedPaasword
//     });
//     try {
//         //try to save new user
//         const user_to_save = await user.save();
//         res.send(
//             {
//                 status: 'success',
//                 message: 'User created successfully',
//                 data: user_to_save._id
//             }
//         );


//     } catch (error) {
//         res.status(400).send(error)
//     }

// };




// const signIn =  async  (req, res) => {

//   //validate
//   const { error } = loginValidation(req.body);

//   if (error) return res.status(400).send(
//       {
//           status: 'ERROR',
//           message: error.details[0].message,
//       }
//   );

//   //check if  user   exist in the database
//   const user = await UserModel.findOne({ email: req.body.email });
//   if (!user) return res.status(400).send(

//       {
//           status: 'ERROR',
//           message: 'incorrect credentials provided '
//       }
//   );

//   //check users password
  
//   const UsersPassword = await bcrypt.compare(req.body.password, user.password)
//   if (!UsersPassword) return res.status(400).send(

//       {
//           status: 'ERROR',
//           message: 'incorrect credentials provided '
//       }
//   );
  
//   try {

//       //try to save new user
//       const user_to_save = await user.save();
//       const token = jwt.sign({_id:user._id},process.env.ENCRYPT_TOKEN);
//       const custom_profile={
//           id:user_to_save._id,
//           fullname:user_to_save.name,
//           phone_number:user_to_save.phoneNumber,
//           email:user_to_save.email
          
//       }
//       res.header('fuelsoft-token',token).send(
//           {
//               status: 'success',
//               token: token,
//               profile:custom_profile
//           }
//       );


//   } catch (error) {
//       res.status(400).send(error)
//   }
// };











// const fetchAll = async (req, res) => {
//   try {
//     const dbConnection = getConnection();
//     // console.log("fetchAll dbConnection", dbConnection.name);
//     const users = await userService.getAllUsers(dbConnection);
//     res.status(200).json({ success: true, users });
//   } catch (err) {
//     console.log("fetchAll error", err);
//     res.status(err.statusCode || 500).json({ error: err.message });
//   }
// };

// module.exports = { signUp, signIn, fetchAll };
