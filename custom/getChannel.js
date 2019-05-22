var request = require('request');
var auth = require('./AuthAPI');
require('dotenv').config();
var getChannels = (data) => {
    return new Promise(function(resolve, reject) {
        request.get({
            headers: {
                 'content-type': 'application/json' ,
                        'X-Auth-Token':data.auth,
                        'X-User-Id': data.userId 
                },
            url: 'http://localhost:3000/api/v1/channels.list',
            method: 'GET'
        }, function(error, response, body) {
            if (error) reject(error);
            body = JSON.parse(body);
            
            let supportChannel = body.channels.filter((e)=>{
                //console.log("process.env "+process.env.CHANNEL_SUPPORT_NAME+" typeof "+typeof(process.env.CHANNEL_SUPPORT_NAME))
                return e.fname === "supporter"
            })
            
            resolve({auth: data.auth, userId: data.userId, channelSupporter: supportChannel[0]._id});
        });
    })
};

module.exports = getChannels

