const KEYS_FILE = __dirname + '/keys.txt';
const fs = require('fs');
const EOL = require('os').EOL;

module.exports = function (req, res, next) {
    //TODO - validate req.headers['api_key'], if doesn't exist then return http 401 code
    //TODO - validate api_key exist in KEYS_FILE, if doesn't exist then return http 401 code
    if(req.headers['api_key']) {
        let keys_content = fs.readFileSync(KEYS_FILE, 'utf8');
        let keys = keys_content.split(EOL);
        keys.pop();//removes last line(EOL)
        if(keys.indexOf(req.headers['api_key']) >= 0) {
            next();
        } else {
            return res.status(401).json({
                "error": "Invalid Api Key"
            });
        }
    } else {
        return res.status(401).json({
            "error": "Api Key Missing"
        });
    }
};
