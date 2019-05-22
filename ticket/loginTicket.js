// ** return a access token to account 


var request = require('request');


var login = (username, password) => {
    return new Promise(function(resolve, reject){
        request.post({
            url: 'http://localhost:8118/api/v1/login',
            form: { username: username, password: password},
            method: 'POST'
           }
            ,(err, req, body)=>{
                if(err) reject(err);
                else {
                    resolve(JSON.parse(body).accessToken)
                }
        })
    })
}

module.exports = login;