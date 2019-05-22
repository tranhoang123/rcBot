const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bot', { useNewUrlParser: true });
var ticketdbSchema = mongoose.Schema({
    userTicket : {
        username: String,
        password: String
    },
    token: String,
    email: String,
    accesstoken: String,
    idUser: String,
    role: String,
    group: String,
})
var ticketDB = mongoose.model('ticketDB', ticketdbSchema);

module.exports = ticketDB;