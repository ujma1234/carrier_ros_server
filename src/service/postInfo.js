// const http = require('http');

// function sendRobotInfoToServer(robotInfo) {
//     console.log("dd");
//     const serverUrl = '"http://211.37.13.187/'

//     const postData = JSON.stringify(robotInfo);
//     const req = http.request(serverUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type' : 'application/json',
//             'Content-Length': Buffer.byteLength(postData),
//         }
//     }, (res) =>{
//         let data = '';
//         res.on('data', (chunk) =>{
//             data += chunk;
//         });
//         res.on('end', () =>{
//             console.log('Sent robot info to server', postData);
//         });
//     });

//     req.on('error', (err) => {
//         console.error('Error sending robot info to server: ', err);
//     });

//     req.write(postData);
//     req.end();
// }