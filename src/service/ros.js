/*setting */

const { request } = require('express');
const rosnodejs = require('rosnodejs');
node = rosnodejs.initNode('/carrier_ros_server');
const sharp = require('sharp');
const nh = rosnodejs.nh;


const robot_start_client = nh.serviceClient('/robot/start', 'carrier_ros_srv/RobotStart');
const robot_stop_client = nh.serviceClient('/robot/stop', 'std_srvs/Trigger');
const robot_recall_clinet = nh.serviceClient('/robot/recall', 'std_srvs/Trigger');
const drone_start_client = nh.serviceClient('/drone/start', 'carrier_ros_srv/DroneStart');
const drone_recall_clinet = nh.serviceClient('/drone/recall', 'std_srvs/Trigger');

const robot_emergency_client = nh.serviceClient('/robot/emergency', 'std_srvs/Trigger');
//-----------------------------

/*subscribe function*/
function subscribeTopic(topicName, messageType, callback) {
      const sub = nh.subscribe(topicName, messageType, callback);
}

/*service_server function*/
function ServiceServer(serviceName,srvType, callback){
  const service = nh.advertiseService(serviceName, srvType, callback);
}

function robot_start(robot_latitude,robot_longitude) {
  const RobotStart = rosnodejs.require('carrier_ros_srv').srv.RobotStart;
  request = new RobotStart.Request();
  request.latitude = robot_latitude;
  request.longitude = robot_longitude;
  robot_start_client.call(request).then((resp) => {
      console.log('robot_start Service response ' + JSON.stringify(resp));
  });
}

function robot_stop() {
  robot_stop_client.call().then((resp) => {
      console.log('robot_stop Service response ' + JSON.stringify(resp));
  });
}


function robot_recall() {
  robot_recall_clinet.call().then((resp) => {
      console.log('robot_recall Service response ' + JSON.stringify(resp));
  });
}

function robot_emergency() {
  robot_emergency_client.call().then((resp) => {
      console.log('robot_emergency Service response ' + JSON.stringify(resp));
  });
}

function drone_start(drone_mode,robot_latitude,robot_longitude) {
  const DroneStart = rosnodejs.require('carrier_ros_srv').srv.DroneStart;
  request = new DroneStart.Request();
  request.mode = drone_mode;
  request.latitude = robot_latitude;
  request.longitude = robot_longitude;
  drone_start_client.call(request).then((resp) => {
      console.log('drone_start Service response ' + JSON.stringify(resp));
  });
}

function drone_recall() {
  drone_recall_clinet.call().then((resp) => {
      console.log('drone_recall Service response ' + JSON.stringify(resp));
  });
}

function hello_world(req, res) {
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.write('<img style="width: 100%; height: 100vh;" src="data:image/png;base64," id="droneImage"/>');
}

exports.ros_call = (req, res) => {

  hello_world(req, res)
  robot_start([1,1],[2,2])

  /////////////////////service server
  ServiceServer('/robot/status', 'carrier_ros_srv/RobotStatus', (req, resp) => {
    //0 : go
    //1 : stop
    //2 : come back
    rosnodejs.log.info(`robotstop Service response ${req.status}`);
    resp.success = true;
  })
  ServiceServer('/drone/status', 'carrier_ros_srv/DroneStatus', (req, resp) => {
    //0 : wait
    //1 : prepare to fly
    //2 : flying
    //3 : come back
    //4 : landing
    //5 : prepare to charge
    //6 : complete to charge
    rosnodejs.log.info(`robotstop Service response ${req.status}`);
    resp.success = true;
  })

  /////////////////////subscribe
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


  subscribeTopic('/gps/filtered', 'sensor_msgs/NavSatFix', (data) => {
    console.log(`latitude message: ${data.latitude}`);
    console.log(`longitude message: ${data.longitude}`);
  });

  subscribeTopic('/battery', 'carrier_ros_msg/Battery', (data) => {
    console.log(`robot battery message: ${data.robot_battery}`);
    console.log(`drone battery message: ${data.drone_battery}`);
  });

}
