const awsServices = [
    'S3',
    'EC2',
    'Lambda',
    'DynamoDB',
    'SNS',
    'SQS',
  ];
  
const awsServiceRegexList = awsServices.map(service => new RegExp(service));
  
module.exports = grammar({
    name: 'gherkin',
  
    rules: {
      feature_file: $ => $.given_statement,
  
      given_statement: $ => seq(
        'GIVEN',
        /.+?/,
        seq(
          prec.right(1, $.service_name),
          optional(/.*/)
        ),
      ),

      service_name: $ => choice(...awsServiceRegexList),
  }
});
