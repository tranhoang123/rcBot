var request = require('request');
require('dotenv').config();
var getAuth = () => {
    return new Promise(function(resolve, reject) {
        request.post({
            headers: { 'content-type': 'application/json' },
            url: 'http://localhost:3001/api/v1/login',
            form: {
                username: process.env.ROCKETCHAT_USER,
                password: process.env.ROCKETCHAT_PASSWORD
            },
            method: 'POST'
        }, function(error, response, body) {
            if (error) reject(error);
            body = JSON.parse(body);
            console.log("userId la: " + body.data.userId + " " + "token la " + body.data.authToken);
            //console.log(process.env.ROCKETCHAT_PASSWORD);
            resolve({ userId: body.data.userId, auth: body.data.authToken });
        });
    })
}
module.exports = getAuth;