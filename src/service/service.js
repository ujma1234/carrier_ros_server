const request = require('request');

var robot = "http://211.37.13.187";

function call(body) {
    var option = {
    uri: robot,
    method: 'POST',
    body: body,
    json: true
}
return new Promise(function () {
    request.post(option, function (err, res, body) {
        console.log(res.body);
    });
});
}

exports.postcall = async (req, res) => (
    await call(req, res)
);