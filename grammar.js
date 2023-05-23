const services = require("./services");

module.exports = grammar({
  name: 'gherkin',

  rules: {
    // Other grammar rules...

    awsServiceName: $ => seq(
      choice(...services.awsServiceName)
    ),
  },
});



// const services = require("./services");
// // const apiCalls = require("./apiCalls");
// const grammar = grammar({
//   name: "gherkin",

//   rules: {
//     scene: ($) => $.given_statement,

//     // action: ($) ...

//     // expected: ($) ...

//     // known_identities: [ // aws managed identies ]

//     // s3_api_calls: $ => choice(
//     //   'CreateBucket',
//     //   'DeleteBucket',
//     //   'UpdateCORS',
//     //   // ....
//     // ),
//     // // ec2_api_calls
//     // api_calls: $ => choice($.s3_api_calls, $.ec2_calls),

//     and: ($) => "AND",
//     but: ($) => "BUT",
//     given: ($) => "GIVEN",

//     given_statement: ($) =>
//       seq(
//         seq($.given, $._service_description),
//         optional(seq($.given, choice($._service_description, _api_description))),
//         optional(seq($.and, $._service_description)),
//         optional(seq($.but, $._service_description))
//       ),

//     _service_description: ($) =>
//       repeat1(choice($.service_name, choice($.service_name, $.word))),

//     multiple_given_statements: ($) => seq($.given_statement),

//     word: ($) => /\w+/,

//   },
// });

// for (const serviceName in services) {
//   grammar.rules[serviceName] = services[serviceName];
// }

// module.exports = grammar;
