const fs = require('fs');
const csv = require('fast-csv');

const csvFile = './AwsServiceActions.csv';

const serviceMap = new Map();

fs.createReadStream(csvFile)
  .pipe(csv.parse({ headers: true, skipLines: 1 }))  // Skip the first line
  .on('error', error => console.error(error))
  .on('data', row => {
    const action = row.Action.split(':')[0].trim();
    const serviceName = row.ServiceName.trim();

    serviceMap.set(action, serviceName);
  })
  .on('end', () => {
    // Print the service map
    for (const [action, serviceName] of serviceMap) {
      console.log(`${action}`);
    }
  });
