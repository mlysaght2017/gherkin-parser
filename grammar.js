module.exports = grammar({
    name: 'gherkin',
  
    rules: {
      feature_file: $ => repeat1($.feature),
  
      feature: $ => seq(
        'Feature:',
        $.any_string,
        repeat1($.scenario)
      ),
  
      scenario: $ => seq(
        'Scenario:',
        $.any_string,
        $.given_statement,
        seq(
            'WHEN the following API calls are made:',
            $.api_call_table,
            'THEN alert'
        )
      ),
  
      given_statement: $ => seq(
        'GIVEN',
        'the',
        $.service_name,
        'service'
      ),
  
      service_name: $ => /"[^"]*"/,
  
      api_call_table: $ => seq(
        '|',
        $.api_call_name,
        '|',
        repeat(seq('|', $.api_call_name, '|'))
      ),
  
      api_call_name: $ => /[A-Za-z_0-9]+/,
      
      any_string: $ => /.*/,

    }
  });
  