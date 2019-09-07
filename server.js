const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

const server = require('http').Server(app);

const config = {pingTimeout: 60000};// resolve o erro WebSocket is already in CLOSING or CLOSED state
const io = require('socket.io')(server,config);

app.use((req, res, next) => {
  req.io = io;
  
  return next();
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Usando arquivo routes.js
app.use('/', require('./src/routes'));
app.use('/uploads', express.static('tmp/uploads'));

//SocketIO
io.on("connection", function (socket) {
  console.log('user connected');
});

server.listen(process.env.PORT || 3333, function(){
  console.log('listening on port 3333');
});