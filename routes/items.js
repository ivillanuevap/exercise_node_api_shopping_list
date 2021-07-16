var express = require('express');
var router = express.Router();
var itemsController = require('../controllers/items.controller');

var apiKeyMW = require('../api-key-mw');

router.get('/:id', itemsController.getById);

router.use(apiKeyMW);

router.post('/', itemsController.create);
router.get('/', itemsController.getAll);


module.exports = router;
