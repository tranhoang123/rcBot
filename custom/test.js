var request = require('request');

var getOnline = (user, pass, callback) => {
        request.post({
            headers: { 'content-type': 'application/json' },
            url: 'http://localhost:3001/api/v1/login',
            form: {
                username: user,
                password: pass
            },
            method: 'POST'
        }, function(error, response, body) {
            if (error) callback(error);
            //body = JSON.parse(body);
            
            else callback(error, body);
        });
}

getOnline("mybot","123456", (error, body) =>{
    if (error) console.log(error);
    else{
        console.log(body)
    }
} )


// curl -H "X-Auth-Token: RFVBw6CVMCoIJLXmh18X2IyTA5QlWkoQMAwvV9_mVNi" \
//      -H "X-User-Id: biGeMg5nzgH97QXdZ" \
//      http://localhost:3001/api/v1/livechat/visitor/twt4yBwc5jvvEtcPC

      