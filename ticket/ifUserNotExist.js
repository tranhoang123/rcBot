var createUser = require('./createUserTrudesk');
var ticketDB = require('./ticketBD');
var sendTicket = require('./sendTicket');

var ifUserNotExist = (token, email, message) => {
    createUser(token, email)
    .then(data => {
        console.log(data)
        let account = data.account;
        //console.log(account.group);
        let newUser = new ticketDB({
            userTicket : {
                username : account.username,
                password: '123456'
            },
            accesstoken: account.accessToken, // accesstoken of trudesk
            token : token, // token of rocket chat
            role: account.role.id,
            group: account.groups[0]._id,
            idUser: account._id,
            email: account.email
        })
        newUser.save()
        .then(() => {
            ticketDB.findOne({token: token}, (err, doc) => {
                if(err) console.log(err);
                else{
                    console.log(doc);
                    sendTicket(doc, message);
                }
            })
        }) 
    })
    .catch(err => console.log(err))
}


module.exports = ifUserNotExist;