const { mailgunAPIKey, mailgunDomainName } = require('../configuration');

var api_key = mailgunAPIKey;
var domain = mailgunDomainName;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 


const sendEmail = function (from, to, subject, text) {
    var data = {
        from: `<${from}>`,
        to: to,
        subject: subject,
        text: text
    };
       
    mailgun.messages().send(data, function (error, body) {
        console.log(body);
        if(error){
            console.log(error);
            return error;
        }
        else 
            return null;
    });
}

module.exports = {
    sendEmail
}