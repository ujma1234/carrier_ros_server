#!/usr/bin/env node

'use strict';
/**no
 * This example demonstrates simple sending of messages over the ROS system.
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Route = require('../carrier_ros_server/src/routes/route.js');
const app = express();
const WebSocket = require('ws');

app.use(bodyParser.json())
app.use(cors());
app.use(Route);

app.set('port', process.env.PORT || 3000);

const ros = require('../carrier_ros_server/src/service/ros.js');
app.get('/test/', (req, res)=>{
    
});

const server = app.listen(app.get('port') , ()=>{
    console.log(app.get('port'),': waiting .....');
})

const wss = new WebSocket.Server({server});

wss.on('connection', (ws) => {
    console.log('new WebSocket');
    ros.ws_cam(ws);
    
    // ws.on('messege', (msg) => {
    //     console.log(msg);
    //     wss.clients.forEach((client) => {
    //         if (client.readyState === WebSocket.OPEN) {
    //             console.log("here");
    //             ros.ws_cam(client);
    //         }
    //     })
    // })
});

// req.body list = [
//      "connection" : first connection,
//      "emergency" : Robot Stop
//      "robot_back" 
//      "robot_shoot" 
//      "drone_back"
//      "drone_shoot"
// ]