const jwt = require("express-jwt");

module.exports = function (req, res, next){
	const token = req.header('Authorization');
	if(!token) return res.status(401).send('Access Denied');

	try{
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
	}catch(err){
		return res.status(400).send('Invalid Token')
	}
}