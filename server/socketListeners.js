const io = require('./Socket').getIO();
const clients = require('./Clients');

const MODE = require('dotenv').config().parsed.NODE_ENV;
console.log(MODE)


io.on('connection', (socket) => {
  clients.add(socket.id);
  console.log('List of', clients);

  socket.on('connect', () => { });

  socket.on('disconnecting', () => { });

  socket.on('disconnect', () => {
    let currUser = clients.getName(socket.id);
    console.log(`${currUser} has disconnected`);
    io.emit('disconnectPlayer', currUser);
    clients.remove(socket.id);
    clients.remove(currUser);
  });

  socket.on('getInitClients', () => {
    io.emit('getInitClients', clients.getPlayers());
  });

  socket.on('addPlayer1', (name) => {
    console.log(name, ' joined as player1');
    clients.add(socket.id, name, 'player1');
    io.emit('addPlayer1', clients.getPlayers());
  });

  socket.on('addPlayer2', (name) => {
    console.log(name, ' joined as player2');
    clients.add(socket.id, name, 'player2');
    io.emit('addPlayer2', clients.getPlayers());
  });

  socket.on('message', (message) => {
    let currUser = clients.getName(socket.id);
    io.emit('message', `${currUser}: ${message}`);
  });

  socket.on('move', (move) => {
    io.emit('move', move);
    let currUser = clients.getName(socket.id);
    io.emit('announcer', `${currUser} made a move!`);
  });

  socket.on('wipe', (freshBoard) => {
    io.emit('wipe', freshBoard);
  });

  socket.on('getTurn', () => {
    let player1 = clients.getName('player1');
    let player2 = clients.getName('player2');
    if (clients.turn !== player1 && clients.turn !== player2) {
      clients.turn = player1;
    }
    io.emit('getTurn', clients.turn);
  });

  socket.on('toggleTurn', () => {
    console.log('It\'s ' + clients.toggleTurn() + '\'s turn');
    io.emit('toggleTurn', clients.turn);
  });

  socket.on('updateBoardStatus', (stat) => {
    io.emit('updateBoardStatus', stat);
  });

});
