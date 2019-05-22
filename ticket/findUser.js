// find an user on ticket system
// access admin
var request = require('request');

var findUser = (username) => {
    return new Promise(function (resolve, reject) {
        request.get({
            url : "http://localhost:8118/api/v1/users/"+username,
            headers: {
                "accesstoken": "22fd06ffe7f8052d1e8e7eee52e1cfb6eb7b0dce"
            }
        }, function (err, req, body) {
            if(err) reject(err);
            else if (body.error) reject(body.err);
            else resolve(JSON.parse(body))
        })
    })
}



module.exports = findUser;
