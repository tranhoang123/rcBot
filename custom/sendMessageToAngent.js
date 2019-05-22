
//var req = require('request');
var online = require('./onlineAPI');
var auth = require('./AuthAPI');
var postDirect = require('./postMessage');
var ticket = require('./../ticket/ticket');
//const accesstoken = process.env.ACCESSTOKEN
var sendMessage = (message) => {
    auth()
    .then(data => online(data))
    .then(authData => {
            //console.log(authData.online.online);
            let online = authData.online.online;
            let data = authData.data;
            //console.log(online);
            //console.log(data);
            let agent = online.filter(e => {
                    return e.username !== "mybot" && e.username !== "tranhoang";
                })
           if(agent.length !== 0) postDirect({ angent: angent, data: data, message: message }); //send message to bot
            else{ //create ticket hear 
                console.log("khong co ai online")
                ticket(message, () => {
                    console.log("done");
                });        
            }
        })
        .catch(e => console.log(e));
}

module.exports = sendMessage;