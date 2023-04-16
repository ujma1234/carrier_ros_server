const Service = require('../service/service.js');
const RobotInfo = require('../service/ros.js');

exports.App = async (req, res, next) =>{
    console.log('recevie_robo_info');
    try {
        if (req.body['command'] == "connection") {
            await res.send("connection success");
            RobotInfo.receiveRobotInfo();
            // await Service.postcall(req, res);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};