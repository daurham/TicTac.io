const io = require('./index').getIO();
const clients = require('../Clients');


io.on('connection', (socket) => {
  clients.add(socket.id);
  console.log(clients); // Testing

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
    // console.log('move: ', move)
    io.emit('announcer', `${currUser} made a move!`);
  });

  socket.on('wipe', (freshBoard) => {
    // console.log('wiping!');
    io.emit('wipe', freshBoard);
  });

  socket.on('getTurn', () => {
    let player1 = clients.getName('player1');
    let player2 = clients.getName('player2');
    if (clients.Turn !== player1 && clients.Turn !== player2) {
      clients.Turn = player1;
    }
    io.emit('getTurn', clients.Turn);
  });

  socket.on('toggleTurn', () => {
    console.log('It\'s ' + clients.toggleTurn() + '\'s turn');
    // console.log('emitting -> ', clients.Turn);
    // console.log('emitting -> ', clients.Turn);
    io.emit('toggleTurn', clients.Turn);
  });

  socket.on('updateBoardStatus', ({ stat, score }) => {
    // if (clients.find(stat)) clients.find(stat).score = score; // increments backend score
    // console.log('status? -> ', stat);
    io.emit('updateBoardStatus', stat);
  });

});
