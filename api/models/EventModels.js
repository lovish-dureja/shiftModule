var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
	eventName: {type: String, required: true},
	location: {type: String, required: true},
	noOfMembers: {type: String, required: true},
	time: {type: String, required: true},
	date: {type: Date, default:Date.now},
	description: {type: String, required: true},
    status: {type: Boolean, required: true, default: 1},
    createdBy: {type: String, required: true}
}, {timestamps: true});


module.exports = mongoose.model("Event", EventSchema);