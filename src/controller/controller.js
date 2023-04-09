const Service = require('../service/service.js');

exports.App = async (req, res, next) =>{
    try {
        if (req.body['command'] == "connection") {
            await res.send("connection success");
        };

        await Service.postcall(req, res);
    } catch (err) {
        return res.status(500).json(err);
    }
};