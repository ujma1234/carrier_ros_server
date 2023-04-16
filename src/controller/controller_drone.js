const Drone = require('../service/drone.js')
const noDrone = require('../service/wait.js')
var drone_addr = "192.168.1.200";

exports.Drone = (req, res, pngStream) =>{
    console.log(req.params)
    if (req.params['0'] == 'drone'){
        try {
            const arDrone = require('ar-drone');
            const client = arDrone.createClient(
                drone_addr
            );

            const pngStream = client.getPngStream();
            
            Drone.drone_video(req, res, pngStream);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    else if (req.params['0'] == 'drone') {
       try {
            noDrone.wait(req, res);
       } catch (err) {
            return res.status(500).json(err);
       }
    }
}
