// Require File System..
const fs = require('fs');
const jsonTemplate = require('./json_template.json');
const {
    hashJson,
} = require('./hashirama');

// Create JSON fromCSV data..
function turnJson(data) {
    jsonTemplate.name = data.Filename;
    jsonTemplate.description = data.Description;
    jsonTemplate.attributes[0].trait_type = data.Gender;
    console.log(jsonTemplate);
    const exists = fs.existsSync('./test');
    if (exists === true) {
        
    } else {
        fs.mkdirSync('./test');
    }
    const lau = JSON.stringify(jsonTemplate, null, 3);
    fs.writeFileSync(`test/${data.Filename}.json`, lau);
    const hashed = hashJson(`${data.Filename}.json`);
    jsonTemplate.hash = hashed;
    return jsonTemplate;
}

// Export Function..
module.exports = {
    turnJson,
}