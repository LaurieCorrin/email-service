'use strict';

const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-west-2'});

module.exports.sendEmail = async (event) => {
  // get requested fields from query parameters
  const queryParams = event.queryStringParameters || {};
  let { email, message, subject } = queryParams;
 
  // must provide email
  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Email is required',
      })
    }
  }
  message = message || "This is a message generated automatically from a Lambda function.";
  subject = subject || "Hello from Lambda";

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
        message: `Email sent to ${email} with subject ${subject} and message ${message}`,
        input: event,
      },
      null,
      2
    ),
  };

};

