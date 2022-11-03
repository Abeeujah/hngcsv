// Require File System, Path..
const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');
const { turnJson } = require('./jsonize');

// Create state in memory..
const hashedArray = [];

// Parse CSV File..
fs.createReadStream(path.join(__dirname, 'nok.csv'))
    .pipe(parse({
        columns: true,
    }))
    .on('data', (data) => {
        const hashedNft = turnJson(data);
        // Store Hashed File in Memory..
        hashedArray.push(hashedNft);
    })
    .on('error', (err) => {
        console.error(err);
    })
    .on('end', () => {
        console.log('Operation ended');
        // Parse Hashed Files Stored in memory..
        const result = parserObj.parse(hashedArray);
        // Output Modified CSV(Overwrite existing one if pleased)..
        fs.writeFileSync('nalo.csv', result);
    });