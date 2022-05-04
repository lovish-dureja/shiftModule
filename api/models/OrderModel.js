var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema({
    name: {type: String, required: false},
	startTimeStamp: {type: Date, required: false},
    endTimeStamp: {type: Date, required: false},
    status: {type: Number, required: true, default: 1}, // 1 
    checked: {type: Number, required: true, default: 0} // 1 means checked 0 means not checked 

}, {timestamps: true});


module.exports = mongoose.model("OrderSchema", OrderSchema);