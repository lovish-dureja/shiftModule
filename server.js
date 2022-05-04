/* 
Entry file for application
*/

const express = require('express');
const app = new express();
var bodyParser = require('body-parser');
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

const config = require('./config/server');
const apiRoutes = require('./api/routes/api');
var cors = require('cors')
    /* parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({
    extended: true
}));

/* parse application/json */
app.use(bodyParser.json({
    // Because Stripe needs the raw body, we compute it but only when hitting the Stripe callback URL.
    /*verify: (req, res, buf) => {
        const url = req.originalUrl;
        //console.log('url', url)
        if (url.startsWith('/api/stripe-webhooks')) {
            req.rawBody = buf.toString();
        }
    },*/
}));

/*app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With,Authorization,authorization, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    next();
});*/

app.disable('x-powered-by');
app.use(cors())
    /* Initiating Server Routes */
app.use('/api', apiRoutes);
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v1', apiRoutes);

app.listen(config.httpsPort, function(err, res) {
    /* Initiating Server Requirements */
    console.log('server started..');
});