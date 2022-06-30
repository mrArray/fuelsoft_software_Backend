const bcrypt = require("bcryptjs");
// const {  loginValidation } = require('../../api/v1/validateAdmin');
const Joi = require('@hapi/joi');

const getAllUsers = async fuelStationDbConnection => {
  try {
    const User = await fuelStationDbConnection.model("User");
    const users = await User.find({});
    // console.log("getAllUsers users", users);

    
    return users;
  } catch (error) {
    // console.log("getAllUsers error", error);
    throw error;
  }
};

const loginUser = async (fuelStationDbConnection, body) => {
  try {
    const User = await fuelStationDbConnection.model("User");
    const password = body.password;
    const email = body.email;


    //check if  user   exist in the database
    const user = await User.findOne({ email: email });

    if (!user) throw new Error("incorrect credentials provided");

    //validate
    const { error } = validate(body);

    if (error) throw new Error({
      status: 'ERROR',
      message: error.details[0].message,
    });


    //check users password

    const UsersPassword = await bcrypt.compare(password, user.password)
    if (!UsersPassword) throw new Error("incorrect credentials provided");

    function validate(req) {
      
      const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
  
      return schema.validate(req);
  }
    
    return body;


  } catch (error) {
    console.log("createUser error", error);
    throw error;
  }
};
const createUser = async (fuelStationDbConnection, body) => {
  try {
    const User = await fuelStationDbConnection.model("User");
    const phoneNumber = body.phoneNumber;
    const password = body.password;
    const email = body.email;
    const name = body.name;

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userPresent = await User.findOne({
      email
    });
    if (userPresent) {
      throw new Error("User Already Exist");
    }
    const newUser = await new User({
      phoneNumber: phoneNumber,
      password: hashedPassword,
      email,
      name
    }).save();

    return newUser;
  } catch (error) {
    console.log("createUser error", error);
    throw error;
  }
};

module.exports = { getAllUsers, createUser, loginUser };
