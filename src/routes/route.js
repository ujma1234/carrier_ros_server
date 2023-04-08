var express = require('express');
var router = express.Router();

const Controller = require('../controller/controller.js');

router.post('/', Controller.App);

module.exports = router

