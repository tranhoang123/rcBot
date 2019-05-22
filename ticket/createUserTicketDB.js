var ticketBD = require('./ticketBD');

var createUser = (token, email, callback) => {
    ticketBD.findOne({ token: token }, (err, doc) => {
        if (err) callback(err);
        if (!doc) {
            let newUser = new ticketBD({
                token: token,
                userTicket: {
                    username: Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7),
                    password: '123456'
                },
                email: email
            })
            newUser
            .save()
            .then(() => callback());
        }
    })
}

module.exports = createUser;