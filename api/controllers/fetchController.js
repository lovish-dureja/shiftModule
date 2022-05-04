/*
 * Fetch Controller
 * @description
 * The Fetch controller is used for fetching all the data required from the shop monkey.
 */

var crypto = require('crypto');
const ShiftSchema = require('../models/ShiftModel');
const PayoutSchema = require('../models/PayoutModel');
const orderSchema = require('../models/OrderModel');

const {
    errorResponse,
    successResponse,
} = require('../util/rest');
const Messages = require('../util/messages');
const httpCodes = require('../util/httpCodes');
const shopMonkey = require('../services/shopmonkey');

exports.getData = async function(req, res) {
    try{
        let output = await shopMonkey.fetchDataFromShopMonkey();
        //console.log(output, '------ print the output here in this function');
        let fetchedData = await shopMonkey.orderHistory(output);
        let finalArray = [];
        if(fetchedData.length > 0){
            fetchData.forEach(element => {
                if(element.isInvoiced == true && workflow =='Partially Paid'){
                    finalArray.push(element);
                }
            });
        }
        successResponse(res,Messages.success, finalArray);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }

}

exports.fetchDataParticular = async function(req, res){
    try{
        let output = await shopMonkey.fetchDataFromShopMonkey();
        let fetchedData = await shopMonkey.fetchParticularOrder(output, req.body.orderId);
        successResponse(res,Messages.success, fetchedData);
    }catch(error){
        console.log(error) 
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.orderChecked = async function(req, res){
    try{
        const orderData = await orderSchema.findOne({name:req.body.orderId}) 
        if(!orderData){
            return errorResponse(res, httpCodes.badReq,Messages.emailNotExist);
        }
        orderData.status = 1;  // it measns the order is checked by the user
        const savedOrder = await orderData.save();
        successResponse(res, Messages.say('Order has been checked by the admin'), savedOrder);
    }catch(error){
        console.log(error);
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}