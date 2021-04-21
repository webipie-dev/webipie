const AWS = require('aws-sdk');
const { accessKeyId, secretAccessKey, awsRegion, hostedZone } = require('../configuration');

AWS.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey});

AWS.config.update({region: awsRegion});

var route53 = new AWS.Route53();

var params = {
    "HostedZoneId": hostedZone,
    "ChangeBatch": {
      "Changes": [
        {
          "Action": "CREATE",
          "ResourceRecordSet": {
            "Name": "anothertest.webipie.com",
            "Type": "CNAME",
            "TTL": 86400,
            "ResourceRecords": [
              {
                "Value": "d1vcl10q923uwq.cloudfront.net"
              }
            ]
          }
        }
      ]
    }
  };

  route53.changeResourceRecordSets(params, function(err,data) {
    console.log(err,data);
  });