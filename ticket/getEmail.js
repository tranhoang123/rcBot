// return a email by token of user

var request = require('request');
var botdb = require('./../custom/botDb');
var getEmail = (token) => {
  return new Promise(function (resolve, reject) {
    request.get({
      url: "http://localhost:3001/api/v1/livechat/visitor/" + token
    }, function (err, req, body) {
      if (err) reject(err);
      else {
        data = JSON.parse(body);
        //console.log(data.visitor.visitorEmails)   
        resolve(data.visitor.visitorEmails[0].address)
      }
    })
  })

}


module.exports = getEmail;