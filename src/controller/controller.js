const Service = require('../service/service.js');
const ros = require('../service/ros.js');

exports.App = (req, res, next) =>{
    try {
        var cmd = req.body['command']
        if (req.body['command'] == "GetPosition") {
            ros.position(req, res);
        } else if (req.body['command'] == "robot_info") {
            ros.robotInfo(req, res);
        } else if (req.body['command'] == "robot_status") {
            ros.status(req, res);
        }
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
};

exports.Command = (req, res) => {
    try {
        var cmd = req.params['0'];
        if(cmd == 'GO') {
            ros.robot_go(req, res);
        } else if (cmd == "Drone_go") {
            ros.drone_go(req, res);
        } else if (cmd == "cmd") {
            if (req.body['command'] == "drone_return") {
                ros.DR(req,res);
            } else if (req.body['command'] == "drone_stop") {
                res.sendStatus(200);
            } else if (req.body['command'] == "robot_return") {
                ros.RR(req,res);
            } else if (req.body['command'] == "robot_stop") {
                ros.RS(req,res);
            } else if (req.body['command'] == "emergency") {
                ros.RE(req,res);
            } else {
                console.log("err");
                res.sendStatus(500);
            }
        } else {
            console.log("err");
            res.sendStatus(500);
        }

    } catch (err) {
        console.log(err);
        return res.status(500);
    }
}
