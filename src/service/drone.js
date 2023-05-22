function drone_video (req, res, pngStream) {
    console.log("drone");

    res.writeHead(200, {'Content-Type' : 'text/html'});

    res.write('<img style="width: 100%; height: 100vh;object-fit: cover;" src="data:image/png;base64," id="droneImage"/>');

    pngStream.on('data', function(data) {
        var base64Image = Buffer.from(data, 'binary').toString('base64');
        res.write('<script>document.getElementById("droneImage").src="data:image/png;base64,' + base64Image + '";</script>');
    });
}

exports.drone_video = (req,res,pngStream) => {
    drone_video(req, res, pngStream);
}