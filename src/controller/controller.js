const Service = require('../service/service.js');
const ros = require('../service/ros.js');

// exports.App = async (req, res, next) =>{
//     try {
//         if (req.body['command'] == "connection") {
//             await res.send("connection success");
//             RobotInfo.receiveRobotInfo();
//             // await Service.postcall(req, res);
//         }
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// };

exports.ROS = async (req, res) => {
    try {
        ros.ros_call(req, res);
    } catch (err) {
        console.log(err);
        return res.status(500),json(err);
    }
};