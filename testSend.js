var AWS = require("aws-sdk");
AWS.config.region = 'us-east-1';
// console.log("Region: ", AWS.config.region);

var sns = new AWS.SNS();

var params = {
	Message: "It is Wednesday, my dudes",
	PhoneNumber: '+12064985138'
};

sns.publish(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});