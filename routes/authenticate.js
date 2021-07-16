var express = require('express');
var router = express.Router();
var apiKeyKS = require('../api-key-ks');

router.get('/', apiKeyKS);

module.exports = router;