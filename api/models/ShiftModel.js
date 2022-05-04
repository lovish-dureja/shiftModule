var mongoose = require("mongoose");

var ShiftSchema = new mongoose.Schema({
    name: {type: String, required: false},
	startTimeStamp: {type: Date, required: false},
    endTimeStamp: {type: Date, required: false},
    status: {type: Number, required: true, default: 1}, // 1 means shift is active, 2 means shift is ended
}, {timestamps: true});


module.exports = mongoose.model("ShiftSchema", ShiftSchema);