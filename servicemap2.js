const fs = require('fs');
const csv = require('fast-csv');

const csvFile = './AwsServiceActions.csv';
const grammarFile = './grammar.js';

const actionsMap = new Map();

fs.createReadStream(csvFile)
  .pipe(csv.parse({ headers: true, skipLines: 1 }))  // Skip the first line
  .on('error', error => console.error(error))
  .on('data', row => {
    const action = row.Action.split(':')[0].trim();
    const serviceName = row.ServiceName.trim();

    actionsMap.set(action, serviceName);
  })
  .on('end', () => {
    // Generate grammar.js file with actions map
    const grammarContent = fs.readFileSync(grammarFile, 'utf8');
    const actionsCode = generateActionsCode(actionsMap);
    const updatedGrammarContent = insertActionsIntoGrammar(grammarContent, actionsCode);
    fs.writeFileSync(grammarFile, updatedGrammarContent, 'utf8');
  });

function generateActionsCode(actionsMap) {
  const actionsCode = [];
  for (const [action, serviceName] of actionsMap) {
    actionsCode.push(`"${action}"`);
  }
  return actionsCode.join(',\n  ');
}

function insertActionsIntoGrammar(grammarContent, actionsCode) {
  const actionsMarker = '// ACTIONS_MARKER';
  const actionsDeclaration = `const actions = {\n  ${actionsCode}\n};`;
  return grammarContent.replace(actionsMarker, actionsDeclaration);
}
