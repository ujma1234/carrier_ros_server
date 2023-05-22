var express = require('express');
var router = express.Router();

const Controller = require('../controller/controller.js');

const Controller_camera = require("../controller/controller_drone.js")

router.get('/camera/*', Controller_camera.Camera);

// router.get('/test/*', Controller.ROS)

router.post('/info', Controller.App);

router.post('/return/*', Controller.Command);

module.exports = router

