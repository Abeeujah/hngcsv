// Require File System, Path, JSON Template, Crypto and Parser..
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { Parser } = require('json2csv');
const { parse, } = require('csv-parse');
const jsonTemplate = require('./json_template.json');

// Store Hashed NFTs in an Array..
const hashedArray = [];

// Instantiate JSON To CSV Parser..
const parserObj = new Parser();

// Read From CSV..
function alpha() {
    new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, 'nok.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', (data) => {
                const hashedNft = turnJson(data)
                hashedArray.push(hashedNft);
            })
            .on('error', (err) => {
                console.error(err);
                reject();
            })
            .on('end', () => {
                console.log('Operation ended');
                const result = parserObj.parse(hashedArray);
                fs.writeFileSync('nalo.csv', result);
                resolve();
            });
    });
}

// Create JSON fromCSV data..
function turnJson(data) {
    if (!data.Filename) {
        return data;
    } else {
        jsonTemplate.name = data.Filename;
        jsonTemplate.description = data.Description;
        jsonTemplate.series_number = (data["Series Number"]);
        jsonTemplate.attributes = data.Attributes;
        jsonTemplate.collection.name = data.Name;
        jsonTemplate.collection.id = data.UUID;
        jsonTemplate.collection.attributes = data.Attributes;
        console.log(jsonTemplate);
        const exists = fs.existsSync('./test');
        if (exists === true) {

        } else {
            fs.mkdirSync('./test');
        }
        const lau = JSON.stringify(jsonTemplate, null, 3);
        const absName = `test/${data.Filename}.json`;
        fs.writeFileSync(absName, lau);
        const hashed = hashJson(absName);
        data.hash = hashed;
        return data;
    }
}

// Create and Hash The JSON File..
function hashJson(file) {
    const fileBuffer = fs.readFileSync(file);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    const hex = hashSum.digest('hex');
    return hex;
}

alpha();