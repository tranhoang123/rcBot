var request = require('request');
var querystring = require('querystring');
var channelSupporter = require('./getChannel');

var getOnline = (data) => {
    return new Promise(function(resolve,reject){
        channelSupporter(data)
        .then(data => {
            var query = querystring.stringify({
                query: {_id: data.channelSupporter}
            })
                request({
                url: 'http://localhost:3000/api/v1/channels.online?' + query,
                headers: {
                    'X-Auth-Token': data.auth,
                    'X-User-Id': data.userId,
                    'Accepts': 'application/json',
                }
            },

            function(e, r, body) {
                if (e) reject(e)
                console.log(body)
                resolve({ online: JSON.parse(body), data: data });
                //console.log(body)
            });
        })
    })
}

module.exports = getOnline;
