const Drone = require('../service/drone.js')
const ros = require('../service/ros.js')
const path = require('path');
var drone_addr = "192.168.1.24";


exports.Camera = (req, res) =>{
    console.log(req.params)
    if (req.params['0'] == 'drone'){
        ros.drone_cam(req, res);
    }
    else if (req.params['0'] == 'realSense') {    
        // ros.cam(req, res);
        res.send(html);
    }
}
