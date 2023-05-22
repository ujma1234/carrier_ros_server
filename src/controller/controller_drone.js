const Drone = require('../service/drone.js')
const ros = require('../service/ros.js')
var drone_addr = "192.168.1.200";

exports.Camera = (req, res) =>{
    console.log(req.params)
    if (req.params['0'] == 'drone'){
        const arDrone = require('ar-drone');
        const client = arDrone.createClient(
            drone_addr
        );

        const pngStream = client.getPngStream();
        
        Drone.drone_video(req, res, pngStream);
    }
    else if (req.params['0'] == 'realSense') {    
        ros.cam(req, res)
    }
}
