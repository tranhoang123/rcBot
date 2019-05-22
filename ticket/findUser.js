// find an user on ticket system
// access admin
var request = require('request');

var findUser = (username) => {
    return new Promise(function (resolve, reject) {
        request.get({
            url : "http://localhost:8118/api/v1/users/"+username,
            headers: {
                "accesstoken": "1414806da5739e54c50f04a17ae9d67c7cd29ad7"
            }
        }, function (err, req, body) {
            if(err) reject(err);
            else if (body.error) reject(body.err);
            else resolve(JSON.parse(body))
        })
    })
}



module.exports = findUser;