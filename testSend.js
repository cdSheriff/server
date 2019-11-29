
// console.log("Region: ", AWS.config.region);

var d = new Date();

console.log(d.getHours());
console.log(d.getMinutes());

if (d.getHours() !== 23 || d.getMinutes()%5 == 0) {
	console.log(`Current minutes is ${new Date().getMinutes()}, not running.`)
	process.exit(0);
}

// process.exit(0);


var AWS = require("aws-sdk");
AWS.config.region = 'us-east-1';

var sns = new AWS.SNS();


var params = {
	Message: "It is Wednesday, my dudes",
	PhoneNumber: '+12064985138'
};

sns.publish(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});