const express = require('express');
const path = require('path');

let players = [];
let departingID;


const app = express();
const PORT = process.env.USER_PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));

//* Local 
const server = app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`));
//*/

/* Deployed
app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`));
const server = require('http').createServer(app);
// */
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  },
});

io.on('connection', (socket) => {
  console.log('client connected');

  socket.on('addPlayer', (name) => {
    console.log(name, 'is joining');
    if (players.length === 0) {
      players.push({ player: 'player1', id: socket.id, name });
    } else if (players.length === 1) {
      players.push({ player: 'player2', id: socket.id, name });
    }

    io.emit('addPlayer', players); // everyone gets it
  });

  socket.on('message', (message) => { // 'message' is an event
    console.log(message);
    let name;
    for (let player of players) {
      if (player.id === socket.id) {
        name = player.name;
      }
    }
    io.emit('message', `${name} said ${message}`); // emit broadcasts to all connected sessions
  });

  socket.on('move', (move) => {
    io.emit('move', move);
    let curPlayer = players.filter((p) => p.id === socket.id);

    io.emit('announcer', `${curPlayer[0].name} Made a move!`);
  });

  socket.on('disconnect', () => {
    departingID = socket.id;
  });

  socket.on('wipe', (freshBoard) => {
    io.emit('wipe', freshBoard);
  });

  socket.on('reload', () => {
    players = players.filter((p) => p.id !== departingID) // removes old players that refresh browser
  });

});
