const arDrone = require('ar-drone');
const http = require('http');

function drone_video(drone_addr) {
    const client = arDrone.createClient(
        {ip : drone_addr}
    )
    var videoStream = client.getVideoStream();
    return new Promise(function () {
        videoStream.on('data', function(data){

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                }
            };
            const request = http.request('http://211.37.13.187/', requestOptions, (response) => {
                console.log(`Response status code: ${response.statusCode}`);
            });
            request.on('error', (error) => {
                console.error(`An error occurred: ${error}`);
            });

            const postData = {
                videoData: data
            };
            request.write(JSON.stringify(postData));

            request.end();
        })
    })
} 

exports.drone_video = async (drone_addr) => {
    drone_video(drone_addr);
}