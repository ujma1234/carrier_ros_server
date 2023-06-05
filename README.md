# carrier_ros_server

## Description

carrier_ros_server plays the role of communication between the carrier (mobile robot) and the control application. It receives data such as latitude, longitude, and video from the carrier, renders the data to the application, and transmits commands to the mobile robot based on the touch of the application.

### Project brief

This project was created for the purpose of communication between the control application and the carrier (mobile robot). The raw data of the carrier's front camera stream, location, battery, status, etc. are created through a web socket and directly connected to the application to continuously supply data. When a button in the application is touched, a command corresponding to that button is sent to the mobile robot (using rosnodejs).

### Key features

- **websocket** : In order to minimize the delay of data transmission such as camera stream and location, web socket was used. Direct connection between application and mobile robot through web socket and continuous transmission of frames.
- **Rosnodejs** :  ****It interacts between the control server and the mobile robot through npm rosnodejs, sends a signal to the mobile robot through the event listener of the UI, and triggers the movement of the mobile robot.

## Installation

### Requirements

For development, you will only need Node.js 

**Node** 

- Node installation on Windows
    
    Just go on [official Node.js website](https://nodejs.org/) and download the installer. Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).
    
- Node installation on Ubuntu
    
    You can install nodejs and npm easily with apt install, just run the following commands.
    
    ```
    $ sudo apt install nodejs
    $ sudo apt install npm
    ```
    
- Other Operating Systems
    
    You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).
    

If the installation was successful, you should be able to run the following command.

```
$ node --version
v16.15.1

$ npm --version
8.13.2
```

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

```
$ npm install npm -g
```

After entire installations, you just run the following command in the dircetory where README.md is located.

`$ npm init`

### Getting Started

- **Nodejs**
    
    if you want to see the app conntected
    
    ```jsx
    $ node app.js
    ```
    

## Techiques and Tools

- **Destination** : Put the latitude and longitude of the way point and arrival point received from the application into the arguments of the rosnodejs function through an array. It transmits considering the order of way point and arrival point.
- **Video frame transmission :** Send raw video data received from rosnodejs to the connected web socket peer. Frames for rendering on the server side are not considered, and light data is processed and delivered in rosnodejs.

## Support & License

### Support

The server was custom-made for the 7drone app, and this application is a flutter application written in dart.

### License

All copyrights belong to Hanyang University Robotics Engineering Department Capstone Team 7drone. For both commercial and non-commercial use,  contact my github or our team
