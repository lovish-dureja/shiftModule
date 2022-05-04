/*
 * User Controller
 * @description
 * The User controller is used for handling all the functions related to the user.
 */

var crypto = require('crypto');
const User = require('../models/UserModels');

const {
    errorResponse,
    successResponse,
} = require('../util/rest');
const Messages = require('../util/messages');
const httpCodes = require('../util/httpCodes');
const jwt = require('jsonwebtoken');
const db = require('../../db/db');
const dbQueryObj = require('../../db/query');
const mongoDbObject = require("../../db/db");
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../validations/validation');
// function for the create user
exports.sayHello = async function (req, res) {
    successResponse(res,'Hi', [])
};

exports.sayDBHello = async function (req, res) {
    await db.ExecuteQuery(dbQueryObj.users.all)
    successResponse(res, Messages.say('Hi'), [])
};

exports.fetchDataFromApi = async function (req, res) {
    successResponse(res, Messages.say('Hi'), [])
};

exports.register = async function (req, res) {
    console.log(req.body, '----here i ma in this controller');
    try{
        // api validations
        const { error } = registerValidation(req.body)
        if(error){
            return errorResponse(res, httpCodes.badReq,error.details[0].message);
        }

        // checking if the user already existed in the database
        const nameExist = await User.findOne({pincode:req.body.name}) 
        if(nameExist){
            return errorResponse(res, httpCodes.badReq,Messages.emailAlreadyExist);
        }

        // create a new user
        const user = new User({
            name: req.body.name,
            password : Buffer.from(req.body.password).toString('base64'),
            status: 1, // 1 means active, 2 means block
            role: 2
        })
        const savedUser = await user.save();
        successResponse(res, Messages.say('User Saved'), savedUser);
    }catch(err){
        console.log(err)
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

// api for the login 
exports.login = async function(req, res) {
    try{
        // api va;idations
        const { error } = loginValidation(req.body)
        if(error){
            return errorResponse(res, httpCodes.badReq,error.details[0].message);
        }

        // checking if the user already existed in the database
        const user = await User.findOne({name:req.body.name}) 
        if(!user){
            return errorResponse(res, httpCodes.badReq,Messages.emailNotExist);
        }
        console.log(user, '---- user password');
        let encryptedPassword = Buffer.from(req.body.password).toString('base64');
        //Password is correct or not
        if(encryptedPassword != user.password || user.status == 2){
            return errorResponse(res, httpCodes.badReq,Messages.emailNotExist);
        }
       
        // create and assign a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('Authorization', token);
        let response = {
            name: user.name,
            token: token,
            id: user._id,
            role : user.role
        }
        successResponse(res,Messages.success, response);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

// Api for fetching the users
exports.fetchAllUsers = async function(req, res) {
    try{
        const fetchAllUsers = await User.find();
        successResponse(res,Messages.say('Records are fetched'), fetchAllUsers);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

// api for deactivating the user

exports.deactivateUser = async function(req, res){
    try{
        // checking if the user already existed in the database
        const userData = await User.findOne({name:req.body.name}) 
        if(!userData){
            return errorResponse(res, httpCodes.badReq,Messages.emailNotExist);
        }
        userData.status = 2;
        const savedUser = await userData.save();
        successResponse(res, Messages.say('User has been deactivated'), savedUser);
    }catch(error){
        console.log(error);
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

// api for activating the user
exports.activateUser = async function(req, res){
    try{
        // checking if the user already existed in the database
        const userData = await User.findOne({name:req.body.name}) 
        if(!userData){
            return errorResponse(res, httpCodes.badReq,Messages.emailNotExist);
        }
        userData.status = 1;
        const savedUser = await userData.save();
        successResponse(res, Messages.say('User has been activated'), savedUser);
    }catch(error){
        console.log(error);
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}