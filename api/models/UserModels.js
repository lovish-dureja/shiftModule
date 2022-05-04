var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	password: {type: String, required: true},
	status: {type: Number, required: true, default: 1},
	date: {type: Date, default:Date.now},
	role: {type: Number, false: true, default: 1}
}, {timestamps: true});


module.exports = mongoose.model("User", UserSchema);