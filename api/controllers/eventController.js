const {
    errorResponse,
    successResponse,
} = require('../util/rest');
const Messages = require('../util/messages');
const httpCodes = require('../util/httpCodes');
const { registerValidation, loginValidation } = require('../validations/validation');
const Event = require('../models/EventModels');


exports.createEvent = async function (req, res) {
    try{
        // api validations
        const { error } = registerValidation(req.body)
        if(error){
            return errorResponse(res, httpCodes.badReq,error.details[0].message);
        }

        // create a new event
        const event = new Event({
            eventName: req.body.eventName,
            location : req.body.location,
            noOfMembers: req.body.email,
            time: req.body.time,
            date: req.body.date,
            description: req.body.description,
            createdBy: req.body.createdBy
        })
        const savedEvent = await event.save();
        successResponse(res, Messages.say('Event Saved'), savedEvent);
    }catch(err){
        console.log(err)
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.getAllEvents = async function(req, res) {
    try{
        // api validations
        const getAllEvents= await Event.find();
        successResponse(res, Messages.say('List of events'), getAllEvents);
    }catch(err){
        console.log(err)
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.updateEvent = async function (req, res) {
    try{
        // api validations
        const event = await Event.findByIdAndUpdate({_id: req.body.id}, {
            eventName: req.body.eventName,
            location : req.body.location,
            noOfMembers: req.body.email,
            time: req.body.time,
            date: req.body.date,
            description: req.body.description,
            createdBy: req.body.createdBy
        });
        
        const savedEvent = await updatedEvent.save();
        successResponse(res, Messages.say('Updated Event'), event);
    }catch(err){
        console.log(err)
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}

exports.deleteEvent = async function (req, res) {
    try{
        // api validations
        const event = await Event.deleteOne({_id: req.body.id})
        
        successResponse(res, Messages.say('Event Deleted'), event);
    }catch(err){
        console.log(err)
        errorResponse(res, httpCodes.serverError,Messages.systemError);
    }
}