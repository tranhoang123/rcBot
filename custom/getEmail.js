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
        botdb.find({ token: token, email: undefined }, (err, docs) => {
          if (err) console.log(err)
          else {
            docs.map(e => {
              botdb.findOneAndUpdate({ token: e.token }, { email: data.visitor.visitorEmails[0].address }, (err, result) => {
                console.log(result)
              })
            })
          }
        })
        resolve(data)
      }
    })
  })

}

getEmail("8XSHhSm5P3odMLWnD", (err, result) => {
    if(err) console.log(err);
    else console.log(result)
})

//module.exports = getEmail;