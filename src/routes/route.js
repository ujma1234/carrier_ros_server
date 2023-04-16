var express = require('express');
var router = express.Router();

const Controller = require('../controller/controller.js');

const Controller_drone = require("../controller/controller_drone.js")

router.get('/*', Controller_drone.Drone);

router.post('/', Controller.App);

module.exports = router

