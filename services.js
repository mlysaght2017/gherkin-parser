const fs = require('fs');
const csv = require('csv-parser');

function createServicesFromCSV(filePath) {
  const awsServices = {};

  const fileData = fs.readFileSync(filePath, 'utf-8');
  const rows = fileData.split('\n').slice(1); // Split data by newline and skip the header

  for (const row of rows) {
    const columns = row.split(',');
    const action = columns[1]?.trim(); // Assuming 'Action' is in the second column
    const serviceName = action?.split(':')[0];
    if (serviceName && !awsServices[serviceName]) {
      awsServices[serviceName] = createAwsServiceRule(serviceName);
    }
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

const csvFilePath = './AwsServiceActions.csv';
const services = createServicesFromCSV(csvFilePath);

module.exports = services;
  