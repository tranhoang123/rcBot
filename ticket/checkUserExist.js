//var request = require('request');
// check user livechat with token on ticketDB

var ticketBD = require('./ticketBD');
var checkUser = (token, email, callback) => {
        console.log(email)
        ticketBD.findOne({ token: token}, (err, doc) => {
            console.log(doc);
            if (err) callback(err);
            if (!doc) {
                callback(null, null, email);
            }
            else {
                console.log(doc)
                callback(null, doc, email);
            }
        })  
}


// checkUser("8XSHhSm5P3odMLWnD", "hoang97sonic@gmail.com")
// .then(msg => console.log(msg))
// .catch(err => console.log(err))

module.exports = checkUser