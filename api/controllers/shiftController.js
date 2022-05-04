/*
 * Shift Controller
 * @description
 * The Shift controller is used for handling all the functions related to the shift.
 */

var crypto = require('crypto');
const ShiftSchema = require('../models/ShiftModel');
const PayoutSchema = require('../models/PayoutModel');
const PriceSchema = require('../models/PriceModel');

const {
    errorResponse,
    successResponse,
} = require('../util/rest');
const Messages = require('../util/messages');
const httpCodes = require('../util/httpCodes');
const { priceChangeValidation, payoutValidation, shiftStartValidation } = require('../validations/validation');

// api for start shift
exports.startShift = async function(req, res) {
    try{
        // api validations
        const { error } = shiftStartValidation(req.body)
        if(error){
            return errorResponse(res, httpCodes.badReq,error.details[0].message);
        }
        const shiftData = new ShiftSchema({
            name: req.body.name,
            startTimeStamp : Date.now(),
            status: 1 // 1 means shift is active 2 means shift is ended
        })
        const savedData = await shiftData.save();
        
        successResponse(res,Messages.say('Shift has been started'), savedData);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}


exports.endShift = async function(req, res) {
    try{      
        const shiftData = await ShiftSchema.findOne({_id:req.body.shiftId}) 
        if(!shiftData){
            return errorResponse(res, httpCodes.badReq,Messages.emailNotExist);
        }
        shiftData.endTimeStamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        shiftData.status = 2 // it means the shift is ended
        
        let savedData = await shiftData.save();
        
        successResponse(res,Messages.say('Shift has been ended'), savedData);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

// Api for fetching the shift listing
exports.shiftListing = async function(req, res) {
    try{
        const shiftLsting = await ShiftSchema.find();
        console.log('shift listing', shiftLsting); 
        successResponse(res,Messages.say('Shift Listing'), shiftLsting);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

// Api for fetching the total lires 
exports.totallitresSale = async function(req, res) {
    try{
        const shiftLsting = await ShiftSchema.find();
        console.log('shift listing', shiftLsting); 
        successResponse(res,Messages.say('Shift Listing'), shiftLsting);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}