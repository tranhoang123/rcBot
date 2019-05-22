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
                "type": "5ce2f01926d61c75b6bbe7ef",
                "priority": "5ce2f020cb196177beb78c84",
                "assignee": data,
            },
           },
         
           function (e, r, body) {
               console.log(JSON.parse(body));
           });
    })
}

module.exports = sendTicket;