const api_calls = fs.read("api_calls.csv");

module.exports = grammar({
  name: "gherkin",

  externals: [
    $.external_identities,
    $.error_sentinels
  ],

  rules: {
    scene: ($) => $.given_statement,

    // action: ($) ...

    // expected: ($) ...

    // known_identities: [ // aws managed identies ]

    s3_api_calls: $ => choice(
      'CreateBucket',
      'DeleteBucket',
      'UpdateCORS',
      // ....
    ),
    // ec2_api_calls
    api_calls: $ => choice($.s3_api_calls, $.ec2_calls),

    and: ($) => "AND",
    but: ($) => "BUT",
    given: ($) => "GIVEN",

    given_statement: ($) =>
      seq(
        seq($.given, $._service_description),
        optional(seq($.given, choice($._service_description, _api_description, _identity_description))),
        optional(seq($.and, $._service_description)),
        optional(seq($.but, $._service_description))
      ),

    // _api_description ...
    // _identity_description

    _service_description: ($) =>
      repeat1(choice($.service_name, choice($.service_name, $.word))),

    multiple_given_statements: ($) => seq($.given_statement),

    word: ($) => /\w+/,

    service_name: ($) =>
      choice(
        choice("S3", "s3"),
        choice("EC2", "ec2"),
        "Lambda",
        "DynamoDB",
        "SNS",
        "SQS"
      ),
  },
});
