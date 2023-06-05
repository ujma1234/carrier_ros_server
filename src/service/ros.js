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
  var request = new RobotStart.Request();
  request.latitude = robot_latitude;
  request.longitude = robot_longitude;
  robot_start_client.call(request).then((resp) => {
      console.log('robot_start Service response ' + JSON.stringify(resp));
  });
}

exports.robot_go = (req, res) => {
  const { dest, way } = req.body;
  const wayKeys = Object.keys(way);
  const latitudeArray = [];
  const longitudeArray = [];
  latitudeArray.push(parseFloat(dest.latitude));
  longitudeArray.push(parseFloat(dest.longitude));
  for (let i = 0; i < wayKeys.length; i++) {
    const key = i.toString();
    if (way[key]) {
      latitudeArray.push(parseFloat(way[key].latitude));
      longitudeArray.push(parseFloat(way[key].longitude));
    }
  }
  robot_start(latitudeArray, longitudeArray);
  res.sendStatus(200);
}


function robot_stop() {
  robot_stop_client.call().then((resp) => {
      console.log('robot_stop Service response ' + JSON.stringify(resp));
  });
}

exports.RS = (req, res)  => {
  robot_stop();
  res.sendStatus(200);
}


function robot_recall() {
  robot_recall_clinet.call().then((resp) => {
      console.log('robot_recall Service response ' + JSON.stringify(resp));
  });
}

exports.RR = (req, res) => {
  robot_recall();
  res.sendStatus(200);
}

function robot_emergency() {
  robot_emergency_client.call().then((resp) => {
      console.log('robot_emergency Service response ' + JSON.stringify(resp));
  });
}

exports.RE = (req, res) => {
  robot_emergency();
  res.sendStatus(200);
}

function drone_start(drone_mode,robot_latitude,robot_longitude) {
  const DroneStart = rosnodejs.require('carrier_ros_srv').srv.DroneStart;
  var request = new DroneStart.Request();
  request.mode = drone_mode;
  request.latitude = robot_latitude;
  request.longitude = robot_longitude;
  drone_start_client.call(request).then((resp) => {
      console.log('drone_start Service response ' + JSON.stringify(resp));
  });
}

exports.drone_go = (req, res) => {
  let { latlng, mode } = req.body;
  // console.log(parseInt(mode),parseFloat(latlng["latitude"]),parseFloat(latlng["longitude"]));
  drone_start(parseInt(mode),parseFloat(latlng["latitude"]),parseFloat(latlng["longitude"]));
  res.sendStatus(200);
}

function drone_recall() {
  drone_recall_clinet.call().then((resp) => {
      console.log('drone_recall Service response ' + JSON.stringify(resp));
  });
}

exports.DR =(req, res) => {
  drone_recall();
  res.sendStatus(200);
}

function hello_world(req, res) {
  res.writeHead(200, {'Content-Type' : 'text/html'});
  res.write('<img style="width: 100%; height: 100vh;" src="data:image/png;base64," id="droneImage"/>');
}

exports.ws_cam = (ws) => {
  subscribeTopic('/front_camera/color/image_raw/compressed', 'sensor_msgs/CompressedImage', (data) => {
    ws.send(data.data);
  })
}

exports.cam = (req, res) => {
  var i = 0;
  hello_world(req, res);
  subscribeTopic('/front_camera/color/image_raw', 'sensor_msgs/Image', (data) => {
    i += 1;
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
}
exports.drone_cam = (req, res) => {
  hello_world(req, res);
  var i = 0;
  subscribeTopic(
  '/ardrone/image_raw', 'sensor_msgs/Image', (data) => {
    i += 1;
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
      // if(i % 10 == 0)
      // res.write('<script>document.getElementById("droneImage").src="data:image/png;base64,' + buffer.toString('base64') + '";</script>');
    });
  })
}

var lat;
var lng;

subscribeTopic('/gps/filtered', 'sensor_msgs/NavSatFix', (data) => {
  lat = data.latitude.toString();
  lng = data.longitude.toString();
  // console.log(`latitude message: ${data.latitude}`);
  // console.log(`longitude message: ${data.longitude}`);
});

exports.position = (req, res) => {
  console.log(lat,lng);
  // lat = "37.29819085564514";
  // lng = "126.83713181671659";
  res.send({"latlng" : lat+","+lng})
}

var rb;
var db;
var percent;

subscribeTopic('/battery', 'carrier_ros_msg/BatteryTwo', (data) => {
  rb = data.robot_battery.toString();
  db = data.drone_battery.toString();
  // console.log(`robot battery message: ${data.robot_battery}`);
  // console.log(`drone battery message: ${data.drone_battery}`);
});

exports.robotInfo = (req, res) => {
  console.log(rb, db)
  res.send({"robot_battery" : rb, "drone_battery" : db, "robot_state" : "10"})
}

var rs;
var ds;

ServiceServer('/robot/status', 'carrier_ros_srv/RobotStatus', (req, resp) => {
  //0 : go
  //1 : stop
  //2 : come back
  // rosnodejs.log.info(`robotstop Service response ${req.status}`);
  rs = req.status.toString();
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
  // rosnodejs.log.info(`robotstop Service response ${req.status}`);
  ds = req.status.toString();
  resp.success = true;
})

exports.status = (req, res) => {
  console.log(ds, rs)
  res.send({"drone_status" : ds, "robot_status" : rs})
}