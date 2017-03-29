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
      if(error != null)
        var html = '<p> Invalid Number </p>';
      // If carrier.type is 'mobile' then the number can receive SMS
      console.log(resultNumber.carrier.type);
      console.log(resultNumber.carrier.name);

      var carrierList = [
        ['Jasper Wireless','@sms.mycricket.com', '@mms.mycricket.com'],
        ['T-Mobile USA, Inc.','@tmomail.net','@tmomail.net'],
        ['AT&T Wireless','@txt.att.net','@mms.att.net'],
        ['Sprint Spectrum, L.P.','@messaging.sprintpcs.com','@pm.sprint.com']
      ];

      //var emailToSend1 = '';
      var emailToSend2 = '';
      var i;
      for ( i=0; i<=3; i++ ) {

        if (resultNumber.carrier.name==carrierList[i][0]) {
          //emailToSend1 = number + carrierList[i][1];
          emailToSend2 = number + carrierList[i][1];
          //console.log(emailToSend1);
          console.log(emailToSend2);
          //'<p style="font-family:courier;">' + "File Name: " + name + "<br>File Size: " + fileSize + " MB<br>Download Link: " + '<a href="' + downloadURL + '"/>' + name + '</a>' +'</p>';
          //var html = '<p>' + "Please copy the email and add it to the recipents" + emailToSend2 + '</p>';
          var html = '<p style="font-family:courier;">' + "Please copy: " + emailToSend2 + " and add it to the recipents, or click on the link to send the email as an SMS " + '<a href= "mailto:' + emailToSend2 + ' "/>' + "Send Mail" + '</a>' + '</p>';
          //var html = '<a href="' + downloadURL + '"/>' + name + '</a>';
          console.log(html);
          res.json({
            body: html
          // Add raw:true if you're returning content that you want the user to be able to edit
          });
        }

      }

});
}
