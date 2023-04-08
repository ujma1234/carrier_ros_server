const request = require('request');

var robot = "http://localhost:4000/"

function call(req, response) {
    var option = {
    uri: robot,
    method: 'POST',
    body: req.body,
    json: true
}
console.log(req.body)
return new Promise(function () {
    request.post(option, function (err, res, body) {
        response.send(req.body);
    });
});
}

exports.postcall = async (req, res) => (
    await call(req, res)
);