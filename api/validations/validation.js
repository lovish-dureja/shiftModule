const Joi = require('@hapi/joi');   

const registerValidation = (data) => {
    const UserValidationSchema = Joi.object({
        name: Joi.string().min(4).required(),
        password:Joi.string().min(4).required()
    })
    return UserValidationSchema.validate(data);
}

const loginValidation = (data) => {
    const UserLoginValidationSchema = Joi.object({
        name: Joi.string().min(4).required(),
        password : Joi.string().min(4).required(),
    })
    return UserLoginValidationSchema.validate(data);
}

const shiftStartValidation = (data) => {
    const ShiftStartValidationSchema = Joi.object({
        name: Joi.string().min(4).required(),
        price : Joi.number().min(2).required(),
        litres_dispenser1: Joi.number().min(2).required(),
        litres_dispenser2: Joi.number().min(2).required()
    })
    return ShiftStartValidationSchema.validate(data);
}

const payoutValidation = (data) => {
    const payoutValidationSchema = Joi.object({
        amount: Joi.number().min(2).required(),
        description: Joi.string().min(2).required()
    })
    return payoutValidationSchema.validate(data);
}

const priceChangeValidation = (data) => {
    const priceChangeValidationSchema = Joi.object({
        current_price: Joi.number().min(2).required(),
        new_price: Joi.number().min(2).required()
    })
    return priceChangeValidationSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.shiftStartValidation = shiftStartValidation;
module.exports.priceChangeValidation = priceChangeValidation;
module.exports.payoutValidation = payoutValidation;
