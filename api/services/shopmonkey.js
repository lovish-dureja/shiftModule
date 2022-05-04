const request = require("request");


exports.fetchDataFromShopMonkey = () => {
    const unixTimestamp = Date.now();
    const publicKey = "gfMaXT0yxy";
    const privateKey = "C1wV7jEIR5fJ3K9Qq2w3y2oArE4D2kzw";
    // const hash = CryptoJS.HmacSHA256([publicKey,unixTimestamp].join('\n'), privateKey);
    // const signature = CryptoJS.enc.Base64.stringify(hash);
    
    let config = {
        url: 'https://api.shopmonkey.io/v2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'publicKey': publicKey,
            'privateKey': privateKey
        },
        json: true
    }

     return new Promise(async function (resolve, reject) {
        try {
            request(config, async function (error, response, body) {
                console.log(error, 'err12')
                let code = (response && response.statusCode) ? response.statusCode : 500

                if (error) {
                    reject({
                        'status': code,
                        'body': error
                    })
                } else {
                    resolve(response.body);
                    return response.body;
                }
            })
        } catch (error) {
            reject({
                'status': 500,
                'body': error
            })
        }
    })
}

exports.orderHistory = (token, particularDate = null) => {
    var today = new Date();
    let date;
    if(particularDate == null) {
        date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    }
    else{
        date = particularDate;
    }
    //console.log(token, '----- here is the token');
    console.log(`Bearer ${token}`)
    let config = {
        url: 'https://api.shopmonkey.io/v2/orders',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        form: {
            "creationDateStart" : date
        },
        json: true
    }

     return new Promise(async function (resolve, reject) {
        try {
            request(config, async function (error, response, body) {
                console.log(error, 'err12')
                let code = (response && response.statusCode) ? response.statusCode : 500

                if (error) {
                    reject({
                        'status': code,
                        'body': error
                    })
                } else {
                    resolve(response.body);
                    return response.body;
                }
            })
        } catch (error) {
            reject({
                'status': 500,
                'body': error
            })
        }
    })
}

exports.fetchParticularOrder = (token, orderId) => {
    var today = new Date();
    let config = {
        url: `https://api.shopmonkey.io/v2/orders/${orderId}/services`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        json: true
    }

     return new Promise(async function (resolve, reject) {
        try {
            request(config, async function (error, response, body) {
                console.log(error, 'err12')
                let code = (response && response.statusCode) ? response.statusCode : 500

                if (error) {
                    reject({
                        'status': code,
                        'body': error
                    })
                } else {
                    resolve(response.body);
                    return response.body;
                }
            })
        } catch (error) {
            reject({
                'status': 500,
                'body': error
            })
        }
    })
}