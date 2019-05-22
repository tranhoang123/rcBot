// return a list of support //
// accesstoken is admin


var request = require('request');

var getListSupport = () => {
    return new Promise(function (resolve, reject) {
        request.get({
            url: "http://localhost:8118/api/v1/users",
            headers: {
                "accesstoken": "1414806da5739e54c50f04a17ae9d67c7cd29ad7" 
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