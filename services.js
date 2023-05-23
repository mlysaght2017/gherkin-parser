const services = {
    awsServiceName: [
      createAwsServiceRule("s3"),
      createAwsServiceRule("ec2"),
      createAwsServiceRule("sns"),
      // Add more AWS service rules here
    ],
  };
  
  function createAwsServiceRule(serviceName) {
    // Modify this function to define the rule for the AWS service name
    return new RegExp(serviceName, "i");
  }
  
  module.exports = services;
  