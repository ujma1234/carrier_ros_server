const Service = require('../service/service.js');
const RobotInfo = require('../service/ros.js');
const drone = require('../service/drone.js')

var drone_addr = "192.168.1.200";

exports.App = async (req, res, next) =>{
    try {
        if (req.body['command'] == "connection") {
            await res.send("connection success");
            // RobotInfo.receiveRobotInfo();
            drone.drone_video(drone_addr);
        };
        // await Service.postcall(req, res);
    } catch (err) {
        return res.status(500).json(err);
    }
};