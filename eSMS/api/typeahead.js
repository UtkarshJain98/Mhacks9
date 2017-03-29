var key = require('../utils/key');
var request = require('request');
var _ = require('underscore');


var accountSid = 'API KEY'; // Your Account SID from www.twilio.com/console
var authToken = 'API KEY';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

// The API that returns the in-email representation.
module.exports = function(req, res) {

  var number = req.query.text.trim();

  var LookupsClient = require('twilio').LookupsClient;
    var twilioLookupClient = new LookupsClient(accountSid, authToken);

    twilioLookupClient.phoneNumbers(number).get({
      type: 'carrier'
    }, (error, resultNumber) => {
      console.log(error);
      // If carrier.type is 'mobile' then the number can receive SMS
      console.log(resultNumber.carrier.type);
      console.log(resultNumber.carrier.name);

      var carrierList = [
        ['Jasper Wireless','@sms.mycricket.com', '@mms.mycricket.com']
        ['T-Mobile USA, Inc.','@tmomail.net','@tmomail.net']
        ['AT&T Wireless','@txt.att.net','@mms.att.net']
        ['Sprint Spectrum, L.P.','@messaging.sprintpcs.com','@pm.sprint.com']
      ];

      var emailToSend1 = '';
      var emailToSend2 = '';
      var i;
      for ( i=0; i<=3; i++ ) {

        if (resultNumber.carrier.name==carrierList[i]) {
          emailToSend1 = number + carrierList[i][1];
          emailToSend2 = number + carrierList[i][2];
          console.log(emailToSend1);
          console.log(emailToSend2);

        }

      }

});
}
