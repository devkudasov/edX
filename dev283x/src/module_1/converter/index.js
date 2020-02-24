const https = require('https');
const fs = require('fs');
const converter = require('./converter');

const fetch = (url = 'https://courses.edx.org/assets/courseware/v1/07d100219da1a726dad5eddb090fa215/asset-v1:Microsoft+DEV283x+3T2018+type@asset+block/customer-data.csv') => {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => resolve(data));
    }).on('error', reject);
  });
};

fetch(process.argv[2])
  .then(converter.csvToJson)
  .then(json => fs.writeFileSync('csv.json', JSON.stringify(json)))
  .catch(console.error);