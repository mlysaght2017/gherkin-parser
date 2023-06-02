const fs = require('fs');
const csv = require('csv-parser');

function createServicesFromCSV(filePath) {
  const awsServices = {};

  const fileData = fs.readFileSync(filePath, 'utf-8');
  const rows = fileData.split('\n').slice(1); // Split data by newline and skip the header

  for (const row of rows) {
    const columns = row.split(',');
    const serviceAction = columns[1]?.trim(); // Assuming 'Action' is in the second column
    const serviceName = serviceAction?.split(':')[0];
    const action = serviceAction?.split(':')[1]?.trim();
    
    if (serviceName && !awsServices[serviceName]) {
      awsServices[serviceName] = createAwsServiceRule(serviceName);
    }
    
    // if (action && !awsServices[action]) {
    //   awsServices[action] = createActionRule(action);
    // }
  }

  return awsServices;
}

function createAwsServiceRule(serviceName) {
  serviceName = serviceName.trim().replace(/^\"/, "").replace(/\"$/, "");
  serviceName = serviceName.split("").map(char => {
    if (char.match(/[a-zA-Z]/)) {
      return `[${char.toLowerCase()}${char.toUpperCase()}]`;
    } else {
      return char;
    }
  }).join("");
  
  return new RegExp(serviceName);
}

function createActionRule(action) {
  action = action.trim().replace(/^\"/, "").replace(/\"$/, "");
  action = action.split("").map(char => {
    if (char.match(/[a-zA-Z]/)) {
      return `[${char.toLowerCase()}${char.toUpperCase()}]`;
    } else {
      return char;
    }
  }).join("");
  
  return new RegExp(action);
}

const csvFilePath = './AwsServiceActions.csv';
const services = createServicesFromCSV(csvFilePath);

module.exports = services;
