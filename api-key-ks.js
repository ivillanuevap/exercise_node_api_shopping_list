const KEYS_FILE = __dirname + '/keys.txt';
const fs = require('fs');
const shortid = require('shortid');
const EOL = require('os').EOL;


module.exports = function (req, res) {
    //TODO - Generate api_key using shortid.generate()
    //TODO - Append api_key in KEYS_FILE with EOL as line break
    //TODO - Return JSON with http 201 code { "api_key": API_KEY }
    let api_key = shortid.generate();
    fs.appendFileSync(KEYS_FILE, api_key + EOL);
    return res.status(201).json({
        api_key: api_key
    });
};



