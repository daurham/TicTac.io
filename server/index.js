const express = require('express');
const path = require('path');

let players = [];
let departingID;
// player1: undefined,
// player2: undefined

const app = express();
const PORT = process.env.USER_PORT || 3000;


app.use(express.static(path.join(__dirname, '../client/dist')));

const server = app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}`));

const io = require('./socket').init(server);
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

    io.emit('announcer', `Player ${curPlayer[0].name} Made a move!`);
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
