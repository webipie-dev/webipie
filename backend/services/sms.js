const { webipiePhoneNumber, twilioAccountSid, twilioAuthToken } = require('../configuration');

const accountSid = twilioAccountSid;
const authToken = twilioAuthToken;
const client = require('twilio')(accountSid, authToken);
const sendSMS = function (phoneNumber, orderDetails) {
    client.messages
        .create({
            body: 'Your order is confirmed. \n' + orderDetails,
            from: webipiePhoneNumber,
            to: phoneNumber
        })
        .then(message => console.log(message.sid));
}

module.exports = {
    sendSMS
}