const bcrypt = require("bcryptjs");
// const {  loginValidation } = require('../../api/v1/validateAdmin');
const Joi = require('@hapi/joi');

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
    const company_address = body.company_address;
    const company = body.company;
    const password = body.password;
    const state =body.state
    const phone_number=body.phone_number
    const multistation=body.multistation
   
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

   
    const fuelStationPresent = await FuelStation.findOne({
      name
    });
    if (fuelStationPresent) {
      throw new Error("This FuelStation Already Exist");
    }

    const EmailPresent = await FuelStation.findOne({
      email
    });
    if (EmailPresent) {
      throw new Error("This Email Already Exist");
    }
    const newFuelStation = await new FuelStation(
      {
        name,
        email,
        company_address,
        company,
        password: hashedPassword,
        dbURI: `${process.env.BASE_DB_URI}/${name}`,
        state,
        phone_number,
        multistation
      }).save();
    return newFuelStation;
  } catch (error) {
    console.log("createFuelStation error", error);
    throw error;
  }
};

const loginFuelStations = async (adminDbConnection, body) => {
  try {
    const FuelStation = await adminDbConnection.model("FuelStation");
    const password = await body.password;
    const email = body.email;
    // const name = body.name;
    
    //check if  fuelstation   exist in the database
    const fuelstation = await FuelStation.findOne({ email: email });

    if (!fuelstation) throw new Error("incorrect credentials provided");

    //validate
    const { error } = validate(body);

    if (error) throw new Error({
      status: 'ERROR',
      message: error.details[0].message,
    });


    //check users password

    const fuelstationPassword = await bcrypt.compare(password, fuelstation.password)
    if (!fuelstationPassword) throw new Error("incorrect credentials provided");

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
module.exports = { getAllFuelStations, createFuelStation ,loginFuelStations};


