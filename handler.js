'use strict';

const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1 '});

module.exports.sendEmail = async (event) => {
  const params = {
    Destination: {
      ToAddresses: ['laurie@corrin.net'], // This should be your email address
    },
    Message: {
      Body: {
        Text: {
          Data: 'This is a message generated automatically from a Lambda function.',
        },
      },
      Subject: {
        Data: 'Hello from Lambda',
      },
    },
    Source: 'laurie.corrin@multiverse.io', // This is the email listed in sender. Set it to your email for this practice
  };
  await ses.sendEmail(params).promise();

// in the object that is `return`ed, replace the `body.message` property with `Email sent to ${queryParams.email}`
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Email sent to ${queryParams.email}`,
        input: event,
      },
      null,
      2
    ),
  };

};

