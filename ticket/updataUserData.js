var ticketBD = require('./ticketBD');

var updateUser = (data) => {
    return new Promise(function(resolve, reject){
        ticketBD.findOne({token: data.token}, (err, doc)=> {
            if (err) reject(err);
            else{
                doc.accesstoken = data.account.accesstoken;
                doc.role = data.account.role._id;
                doc.gruop = data.account.gruop[0]._id;
                doc.idUser = data.account._id;
                doc.save();
                resolve("da update user");
            }   
        })
    })
}

module.exports = updateUser;