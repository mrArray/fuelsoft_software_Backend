// const router = require('express').Router();
const UserAdmin = require('../../model/RegisterAdmin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registrationValidation, loginValidation } = require('./validateAdmin');

const createAdmin = async (req, res) => {
    
 
    //validate
    const { error } = registrationValidation(req.body);
    if (error) return res.status(400).send(
        {
            status: 'ERROR',
            message: error.details[0].message,
        }
    );

    //check if  user already exist in the database
    const doesEmailExist = await UserAdmin.findOne({ email: req.body.email });
    if (doesEmailExist) return res.status(400).send(

        {
            status: 'ERROR',
            message: 'This email address is already registered'
        }
    );

    //hash users password
    const salt = await bcrypt.genSalt(15);
    const HashedPaasword = await bcrypt.hash(req.body.password, salt)

    //create new user
    const user = new UserAdmin({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: HashedPaasword
    });
    try {
        //try to save new user
        const user_to_save = await user.save();
        res.send(
            {
                status: 'success',
                message: 'User created successfully',
                data: user_to_save._id
            }
        );


    } catch (error) {
        res.status(400).send(error)
    }
};


const loginAdmin =  async  (req, res) => {

    //validate
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).send(
        {
            status: 'ERROR',
            message: error.details[0].message,
        }
    );

    //check if  user   exist in the database
    const user = await UserAdmin.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(

        {
            status: 'ERROR',
            message: 'incorrect credentials provided '
        }
    );

    //check users password
    const UsersPassword = await bcrypt.compare(req.body.password, user.password)
    if (!UsersPassword) return res.status(400).send(

        {
            status: 'ERROR',
            message: 'incorrect credentials provided '
        }
    );
    
    try {

        //try to save new user
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


    } catch (error) {
        res.status(400).send(error)
    }
};

const AllAdmin = async (req, res) => {
    try{
        const admins = await UserAdmin.findOne({ });
        res.status(200).json({ success: true, admins });

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = { createAdmin, loginAdmin,AllAdmin };
