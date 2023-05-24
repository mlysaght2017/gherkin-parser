const fs = require('fs');
const Parser = require('web-tree-sitter');

async function findApiCallNames(tree) {
    const apiCallNames = [];
    tree.rootNode.descendantsOfType('api_call_name').forEach((node) => {
      apiCallNames.push(node.text);
    });
    return apiCallNames;
  }
  

(async () => {
  await Parser.init();
  const parser = new Parser();
  const Lang = await Parser.Language.load('./tree-sitter-gherkin.wasm');
  parser.setLanguage(Lang);
  const featureFile = fs.readFileSync('./better_generic_glue.gherkin', 'utf8');
  const tree = parser.parse(featureFile);
  console.log(tree.rootNode.toString());

  // Find all API call names in the syntax tree
  const apiCallNames = await findApiCallNames(tree);
  console.log(apiCallNames);
})();