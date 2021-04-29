const { mailgunAPIKey, mailgunDomainName, mailgunHost } = require('../configuration');

var api_key = mailgunAPIKey;
var domain = mailgunDomainName;
var host = mailgunHost;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain, host: host});
 


const sendEmail = function (from, to, subject, text) {
    var data = {
        from: `<${from}>`,
        to: to,
        subject: subject,
        text: text
    };
       
    mailgun.messages().send(data, function (error, body) {
        if(error){
            console.log(error);
            return error;
        }
        else 
            return null;
    });
}

sendEmail("webipie@gmail.com", "ala2017eddine@gmail.com", "test1", "test1")

module.exports = {
    sendEmail
}