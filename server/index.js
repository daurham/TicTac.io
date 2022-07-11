const express = require('express');
const path = require('path');

let players = [];
let departingID;


const app = express();
const PORT = process.env.USER_PORT || 3000;


app.use(express.static(path.join(__dirname, '../client/dist')));

const server = app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`));

const io = require('socket.io')(server, {
  cors: {
    origin: '*'
    // origin: ["http://localhost:3000", "https://admin.socket.io", "http://18.215.43.205/", "http://54.84.135.252:3000", "http://18.215.43.205:3000"],
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
    players = players.filter((p) => p.id !== departingID) // removed players that refresh
  });

});
