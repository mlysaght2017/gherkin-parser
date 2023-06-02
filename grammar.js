// const services = require('./services');
// module.exports = grammar({
//   name: 'gherkin',
//   rules: {
//     service: $ => choice(...Object.keys(services)),
//     action: $ => /[a-zA-Z]+/,
//     // Other grammar rules...
//   },
// });

// const { services } = require('./services');

// module.exports = grammar({
//   name: 'gherkin',

//   rules: {
//     gherkin: $ => seq(
//       $.givenStatement,
//       $.whenStatement,
//       $.thenStatement
//     ),

//     givenStatement: $ => seq(
//       'GIVEN',
//       $.serviceName
//     ),

//     serviceName: $ => choice(...Object.keys(services)),
//     apiCallName: $ => seq($.serviceName, ":", alias(/[a-zA-Z0-9]+/, 'api')),

//     whenStatement: $ => seq(
//       'WHEN',
//       choice(...Object.values(getServiceActions()))
//     ),

//     thenStatement: $ => seq(
//       'THEN',
//       'alert',
//       'security'
//     )
//   },
// });

// const { services, getServiceActions } = require('./services');

// module.exports = grammar({
//   name: 'gherkin',

//   rules: {
//     gherkin: $ => seq(
//       $.givenStatement,
//       $.whenStatement
//       // Add more rule references for other statements as needed
//     ),

//     givenStatement: $ => seq(
//       'GIVEN',
//       $.serviceName
//     ),

//     serviceName: $ => choice(...Object.keys(services)),

//     whenStatement: $ => seq(
//       'WHEN',
//       $.action
//     ),

//     action: $ => choice(...Object.values(getServiceActions()))

//     // Other grammar rules...
//   },
// });

// const services = require('./services');

// debugger;
// module.exports = grammar({
//   name: 'gherkin',

//   rules: {
//     awsServiceName: $ => choice(...Object.values(services)),

//     // Other grammar rules...
//   },
// });

// const services = require("./services");

// module.exports = grammar({
//   name: 'gherkin',

//   rules: {
//     // Other grammar rules...

//     awsServiceName: $ => seq(
//       choice(...services.serviceName)
//     ),
//   },
// });

const services = require("./services");
// debugger;
module.exports = grammar({
  name: "gherkin",

  rules: {
    scene: ($) => seq($.given_statement, repeat1($.when_statement), repeat1($.then_statement)),

    and: ($) => "AND",
    but: ($) => "BUT",
    when: ($) => "WHEN",
    given: ($) => "GIVEN",
    then: ($) => "THEN",

    given_statement: ($) =>
      seq(
        seq($.given, $._service_description),
        optional(seq($.and, $._service_description)),
        optional(seq($.but, $._service_description))
      ),

    when_statement: ($) =>
      seq(
        seq($.when, $._api_description),
        optional(seq($.and, $._api_description)),
        optional(seq($.but, $._api_description))
      ),
    
    then_statement: ($) =>
      seq(
        seq($.then, $._action_names),
        optional(seq($.and, $._action_names)),
        optional(seq($.but, $._action_names))
      ),
    
    _action_names: ($) => choice('alert security', 'deny'),

    _service_description: ($) =>
      repeat1(choice($.service_name, choice($.service_name, $.word))),

    multiple_given_statements: ($) => seq($.given_statement),

    service_name: ($) => choice(...Object.values(services)),

    _api_call_name: $ => seq($.service_name, token.immediate(":"), field("api", $.word)),
    _api_description: ($) =>
      repeat1(choice($._api_call_name, choice($._api_call_name, $.word))),

    word: ($) => /\w+/,
  },
});
