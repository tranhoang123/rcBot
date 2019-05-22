
var getEmail = require('./getEmail');
var checkUserExist = require('./checkUserExist');
var ifUserNotExist = require('./ifUserNotExist');
var sendTicket = require('./sendTicket')
var ticket = (message) => {
    console.log(message);
    getEmail(message.token)
    .then(email => checkUserExist(message.token, email, (err, doc, email1) => {
        if(err) console.log(err);
        console.log(doc)
        if(!doc) {
            ifUserNotExist(message.token, email1, message);
        }
        else{
            sendTicket(doc, message);
        }
    }))
    .catch(err => console.log(err))
}

module.exports = ticket;