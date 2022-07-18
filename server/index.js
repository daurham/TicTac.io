const express = require('express');
const path = require('path');
const env = require('dotenv').config().parsed;
const app = express();


const PORT = env.USER_PORT || 3000;
const URL = env.URL || 'localhost';
const DIST = path.join(__dirname, '../client/dist');
let server;


app.use(express.static(DIST));


if (env.NODE_ENV === 'development') {
  /* Runs Locally */
  server = app.listen(PORT, () => console.log(`Listening to http://${URL}:${PORT}`));
} else {
  /* Runs Deployed */
  app.listen(PORT, () => console.log(`Listening to http://${URL}:${PORT}`));
  server = require('http').createServer(app);
}


const io = require('./Socket/index').init(server, {
  cors: {
    origin: '*'
  },
});


io.on('connection', (socket) => {
  console.log(`Client ${socket.id.cut()} connected`);
});


require('./Socket/listeners');
