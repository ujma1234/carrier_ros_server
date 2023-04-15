const rosnodejs = require('rosnodejs');
node = rosnodejs.initNode('/carrier_ros_server');
const sharp = require('sharp');
const nh = rosnodejs.nh;
const DroneStart = rosnodejs.require('carrier_ros_srv').srv.DroneStart;
// 여기

function subscribeTopic(topicName, messageType, callback) {
      const sub = nh.subscribe(topicName, messageType, callback);
}

function ServiceCreate(serviceName,srvType, callback){
  const service = nh.advertiseService(serviceName, srvType, callback);
}

<<<<<<< HEAD
ServiceCreate('/robotstatus', 'carrier_ros_srv/DroneStatus', (req, resp) => {
  //0 : go
  //1 : stop
  //2 : come back
  rosnodejs.log.info(`robotstop Service response ${req.status}`);
  resp.success = true;
})
// function robot_start(latitude, longitude) {
//     //문 닫아주세요. 성공적으로 열면 true 반환
//     const client = nh.serviceClient('/robotstart', 'carrier_ros_srv/RobotStart');
//     request = new DroneStart.Request();
//     request.latitude = latitude;
//     request.longitude = longitude;
//     client.call(request).then((resp) => {
//         console.log('robotstart Service response ' + JSON.stringify(resp));
//     });
// }

function robot_stop() {
  const client = nh.serviceClient('/robotstop', 'std_srvs/Trigger');
  client.call().then((resp) => {
      console.log('robotstop Service response ' + JSON.stringify(resp));
  });
  console.log('aa')
}

// function drone_start(mode) {
//   //문 닫아주세요. 성공적으로 열면 true 반환
//   const client = nh.serviceClient('/dronestart', 'carrier_ros_srv/DroneStart');
//   request = new DroneStart.Request();
//   request.mode = mode;
//   client.call(request).then((resp) => {
//       console.log('closedoor Service response ' + JSON.stringify(resp));
//   });
// }

function hello_world(req, res) {
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.write('<img style="width: 100%; height: 100vh;" src="data:image/png;base64," id="droneImage"/>');
}

exports.ros_call = (req, res) => {

  hello_world(req, res)
  subscribeTopic('/front_camera/color/image_raw', 'sensor_msgs/Image', (data) => {
    sharp(Buffer.from(data.data), {
      raw: {
        width: data.width,
        height: data.height,
        channels: 3
      }
    })
    .png()
    .toBuffer((err, buffer) => {
      if (err) throw err;
      res.write('<script>document.getElementById("droneImage").src="data:image/png;base64,' + buffer.toString('base64') + '";</script>');
    });
  })
  
  console.log("a")
  subscribeTopic('/gps/filtered', 'sensor_msgs/NavSatFix', (data) => {
    console.log(`latitude message: ${data.latitude}`);
    console.log(`longitude message: ${data.longitude}`);
  });

  subscribeTopic('/odom', 'nav_msgs/Odometry', (data) => {
    // console.log(`latitude message: ${data.pose.pose.position.x}`);
    // console.log(`longitude message: ${data.pose.pose.position.y}`);
  });

}
=======
exports.receiveRobotinfo = async (req, res) =>{
    receiveRobotInfo()
}
//여기
>>>>>>> fdb17d90b0686c65a56a315a813f0cb20d42e6a1
