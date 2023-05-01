module.exports = grammar({
  name: "gherkin",

  rules: {
    source: ($) => seq($.given, repeat1(seq($.when, optional(repeat1($.and)))), $.then),
    given: ($) => seq("GIVEN", alias($.string, $.invariant)),
    when: ($) => seq("WHEN", alias($.string, $.invariant)),
    and: ($) => seq("AND", alias($.string, $.invariant)),
    then: ($) => seq("THEN", alias($.string, $.invariant)),
    string: $ => /.*/,
  },
});
