const express = require('express');
const path = require('path');
// const db = require('./db');
const ctlr = require('./controller');

const app = express();  
const PORT = process.env.USER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Listeners:
app.get('/api', ctlr.getData);
app.post('/api', ctlr.postData);
app.put('/api', ctlr.updateData);
app.delete('/api', ctlr.deleteData);

app.use(express.static(path.join(__dirname, '../client/dist')));

    const server = app.listen(PORT, () => console.log(`Listening to port ${PORT} -> http://localhost:${PORT}`));
    const io = require('socket.io')(server);
    io.on('connection', socket => {
      console.log('client connected'); // finished server socket setup. Now need to set up client socket
    })
  // db.connect('mongodb://localhost/ttt')
  // .then(() => {
  //   const server = app.listen(PORT, () => console.log(`Listening to port ${PORT} -> http://localhost:${PORT}`));
  //   const io = require('socket.io')(server);
  //   io.on('connection', socket => {
  //     console.log('client connected'); // finished server socket setup. Now need to set up client socket
  //   })
  // })
  // .catch(console.error);