const rosnodejs = requre('rosnodejs');
const Postinfo = require('postInfo.js');

async function receiveRobotInfo() {
    const nh = await rosnodejs.initNode('robot_info_receiver_node');
    const topicName = '/robot_info';
    const msgType = "my_robot_msgs/RobotInfo";
    const subscriber = nh.subscriber(topicName, msgType, (msg) =>{
        console.log('Received robot info', msg);

        //로봇 정보를 보내주는 함수임 이거
        Postinfo.sendRobotInfoToServer(msg);
    })
}

//여기