// Require Crypto and FS..
const crypto = require('crypto');
const fs = require('fs');

// Get The JSON File..
function hashJson(file) {
    const fileBuffer = fs.readFileSync('./test/'+file);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    const hex = hashSum.digest('hex');
    return hex;
}

module.exports = {
    hashJson,
}