var request = require('request');
var getListSupport = require('./getListSupport');


var sendTicket = (doc, message) => {
    getListSupport()
    .then(data => {
        request.post({
            url: 'http://localhost:8118/api/v1/tickets/create',
            headers : {
                'Content-Type': 'application/json',
                'accesstoken': doc.accesstoken,
            },
            form : {
                "subject": "Question",
                "issue": message.question,
                //"owner": "5ce2f07dcb196177beb78c8b",
                "group": doc.group,
                "type": "5ce5552f5521f61204bc1f54",
                "priority": "5ce55539e61aa51268be1a25",
                "assignee": data,
            },
           },
         
           function (e, r, body) {
               console.log(JSON.parse(body));
           });
    })
}

module.exports = sendTicket;
