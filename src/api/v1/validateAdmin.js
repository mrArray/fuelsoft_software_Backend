
const Joi = require('@hapi/joi')



//login validation
const loginValidation = data => {


    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });

    return schema.validate(data)
};

//registration validation
const registrationValidation = data => {

    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        phoneNumber: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
        });

        return schema.validate(data)
    };


module.exports.loginValidation = loginValidation;
module.exports.registrationValidation = registrationValidation;
