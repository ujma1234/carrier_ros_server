const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Route = require('../control-server/src/routes/route.js');
const app = express();

app.use(bodyParser.json())
app.use(cors());
app.use(Route);

app.set('port', process.env.PORT || 550);

app.get('/', function(req, res) {
    console.log("dd");
})

app.post('/', function(req, res) {
    console.log("dd");
})

app.listen(app.get('port') , ()=>{
    console.log(app.get('port'),': waiting ...');
})



// req.body list = [
//      "connection" : first connection,
//      "emergency" : Robot Stop
//      "robot_back" 
//      "robot_shoot" 
//      "drone_back"
//      "drone_shoot"
// ]