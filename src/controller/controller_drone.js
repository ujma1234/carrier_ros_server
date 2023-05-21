const Drone = require('../service/drone.js')
const noDrone = require('../service/wait.js')
// const ros = require('../service/ros.js')
var drone_addr = "192.168.1.200";

exports.Drone = (req, res, pngStream) =>{
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
        ros.ros_call(req, res)

    }
}
