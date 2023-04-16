function waiting_view (req, res) {
    res.send("대기");
}

exports.wait = (req, res) => {
    waiting_view(req, res);
}