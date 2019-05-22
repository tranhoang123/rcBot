var botdb = require('../custom/botDb');
//var online = require('../custom/onlineAPI');
//var auth = require('../custom/AuthAPI');
var sendMessageToClient = require('../custom/sendMessageToClient')
var supporter = ['sp1', 'sp2', 'sp3', 'sp4', 'sp5', 'sp6', 'sp6', 'sp7', 'sp8', 'sp9', 'tranhoang'];
var sendMessageToAngent = require('../custom/sendMessageToAngent');
//var updateEmail = require('../custom/getEmail');

(function() {
    setInterval(() => {
        // console.log("Hello");
        botdb.findOneAndUpdate({ state: "pending" }, { state: "noIssue" }, (err, doc, res) => {
            //console.log(res);
            //console.log(doc + "cua agent");
            if (err) console.log(e);
            if (doc) {
                sendMessageToAngent(doc);
                console.log(doc)
            }
        })
    }, 2000)
})();

(function() {
    setInterval(() => {
        // console.log("Hello");
        botdb.findOneAndUpdate({ state: "issueNoAnswer" }, { state: "answer" }, (err, doc, res) => {
            //console.log(doc + "cua client");
            if (err) console.log(err);
            else if (doc) sendMessageToClient(doc)
        })
    }, 2000)
})();
module.exports = (robot) => {
    robot.listen((message) => {
        console.log(message.user._getRobot);
        let user = message.user.name;
        let isSupport = supporter.filter(e => {
                return e === user;
            })
        if (isSupport.length === 1) return { message: message, type: 'Supporter' };
        else {
            return { message: message, type: 'Client' }
        }
    }, (res) => {
        //console.log(res.match.message);
        switch (res.match.type) {
            case "Client":
                {
                    console.log(res.match.message)
                    console.log("day la client");
                    var message;
                    try {
                        message = res.match.message.text.substr(6).trim();
                    } catch (e) {
                        console.log(e);
                    }
                    var id = res.match.message.user.id;
                    var token = res.match.message.user.token;
                    var roomId = res.match.message.user.roomID;
                    console.log(roomId + " " + id);
                    botdb.findOne({ question: message }, (err, result) => {
                        if (err) console.log(err);
                        if (result) {
                            if (result.state !== "answer") res.reply("This question is pending, please wait supporter");
                            else res.reply(result.answer);
                        } else {
                            switch (message) {
                                case "What's the time":
                                case "What time is it":
                                case "what's the time":
                                case "what time is it":
                                    {
                                        const d = new Date()
                                        const t = `${d.getHours()}:${d.getMinutes()} and ${d.getSeconds()} seconds`
                                        res.reply(t);
                                        break;
                                    }
                                default:
                                    {
                                        //console.log("hello Hoang");
                                        botdb.estimatedDocumentCount({}, (err, number) => {
                                            //console.log(number);
                                            let question = new botdb({
                                                    roomID: roomId,
                                                    textID: res.match.id,
                                                    id: id,
                                                    question: message,
                                                    ticket: number,
                                                    token: token,
                                                    state: "pending",
                                                    // userTicket : {
                                                    //     username: Math.random().toString(36).substring(2,7) + Math.random().toString(36).substring(2,7),
                                                    //     password: "123456"
                                                    // }
                                                })
                                                .save()
                                                .then(() => console.log("da luu"));
                                        })
                                        res.reply("Sorry, I Dont know, please wait supporter respond your question");
                                    }
                            }
                        }
                    })
                    break;
                }
            case "Supporter":
                {
                    console.log("day la supporter");
                    let angent = res.match.message.user;
                    //console.log(angent);
                    let message = res.match.message.text.substr(6).trim();
                    console.log(message);
                    let tag = message.substr(0, 7).trim();
                    //console.log(tag);
                    let answer = message.substr(8).trim();
                    //console.log(answer);
                    let tagTicket = answer.substr(0, answer.indexOf(" ") + 1).trim();
                    //console.log("chieu dai tagticket" +tagTicket)
                    //console.log(tagTicket.substr(0, 7));
                    //console.log(tagTicket);
                    let respond = answer.substr(9).trim();
                    //console.log(respond);
                    let numberTicket = parseInt(tagTicket.substr(7));
                    //console.log(numberTicket);
                    //console.log(tagTicket + " " + tag);
                    if (tag === "@answer" && tagTicket.substr(0, 7).trim() === "@ticket" && tagTicket.length === 9) {
                        //console.log(answer);
                        //console.log(tagTicket);
                        botdb.findOneAndUpdate({ ticket: numberTicket, state: "noIssue" }, { answer: respond, state: "issueNoAnswer", angentIssue: angent.name }, (err, doc, res) => {
                            if (err) console.log(err);
                            if (doc) {
                                console.log(doc);
                                //console.log(res);
                            } else {
                                res.reply("Don't find anthing, please check your ticket number")
                            }

                        })
                    } else {
                        res.reply('Please use tag @answer and @ticket[number of Ticket] to respond to customer');
                    };
                }
        }
    })
}