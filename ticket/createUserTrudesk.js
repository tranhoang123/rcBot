// create an user for guest on ticket system
// return information of user on ticket system.
// accesstoken admin

var request = require("request");

var createUser = (token, email) => {
    return new Promise(function (resolve, reject) {
        let username = Math.random().toString(36).substring(2,7) + Math.random().toString(36).substring(2,7);
        request.post({
            url: 'http://localhost:8118/api/v1/users/create',
            headers:
            {
                'Content-Type': 'application/json',
                accesstoken: '22fd06ffe7f8052d1e8e7eee52e1cfb6eb7b0dce'
            },
            body:
            {
                aUsername: username,
                aPass: "123456",
                aPassConfirm: "123456",
                aFullname: username,
                aEmail: email,
                aGrps: ['5ce2f0f2cb196177beb78c91'],
                aTitle: 'guest offline',
                aRole: '5ce2f01926d61c75b6bbe7f3'
            },
            json: true
        }, (err, req, body) => {
            if (err) reject(err);
            else resolve(body);
        })
    })
}


module.exports = createUser ;
