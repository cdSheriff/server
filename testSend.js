var AWS = require("aws-sdk");
AWS.config.region = 'us-east-2';
// console.log("Region: ", AWS.config.region);

var sns = new AWS.SNS();

var params = {
	Message: 'test',
	PhoneNumber: '+12064985138'
};

sns.publish(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});