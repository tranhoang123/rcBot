// return a list of support //
// accesstoken is admin


var request = require('request');

var getListSupport = () => {
    return new Promise(function (resolve, reject) {
        request.get({
            url: "http://localhost:8118/api/v1/users",
            headers: {
                "accesstoken": "22fd06ffe7f8052d1e8e7eee52e1cfb6eb7b0dce" 
            },
        }, function (err, req, body) {
            if (err) reject(err);
            else {
                data = JSON.parse(body)
                //console.log(data)
                let supporters = data.users.filter(e => {
                    return e.role.isAgent
                })
                let idSupport = supporters.map(e => {
                    return e._id
                })
                let chooseAngent = idSupport[Math.floor(Math.random() * idSupport.length)];
                resolve(chooseAngent)
            }
        }
        )
    })
}



module.exports = getListSupport;
