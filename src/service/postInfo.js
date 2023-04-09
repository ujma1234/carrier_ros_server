const http = require('http');

function sendRobotInfoToServer(robotInfo) {
    const serverUrl = '"http://211.37.13.187/'

    const pstData = JSON.stringify(robotInfo);
    const req = http.request(serverUrl, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Content-Length': Buffer.byteLength(poseData),
        }
    }, (res) =>{
        let data = '';
        res.on('data', (chunk) =>{
            data += chunk;
        });
        res.on('end', () =>{
            console.log('Sent robot info to server', poseData);
        });
    });

    req.on('error', (err) => {
        console.error('Error sending robot info to server: ', err);
    });

    req.write(poseData);
    req.end();
}