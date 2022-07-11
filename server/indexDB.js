const express = require('express');
const path = require('path');
const { mongoose, Ninth } = require('./db');
const ctlr = require('./controller');

const app = express();  
const PORT = process.env.USER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Listeners:
app.get('/api', ctlr.getData);
app.post('/api', ctlr.postData);
app.patch('/api', ctlr.updateData);
app.delete('/api', ctlr.deleteData);

app.use(express.static(path.join(__dirname, '../client/dist')));
  mongoose.connect('mongodb://127.0.0.1/ttt')
  .then(() => {
    Ninth.deleteMany({}).then(() => {
      Ninth.create({
        ninth1: 0,
        ninth2: 0,
        ninth3: 0,
        ninth4: 0,
        ninth5: 0,
        ninth6: 0,
        ninth7: 0,
        ninth8: 0,
        ninth9: 0
      }).then(() => {
        console.log('Board Wiped')
        const server = app.listen(PORT, () => console.log(`Listening to port ${PORT} -> http://localhost:${PORT}`));
        const io = require('./socket').init(server);
        io.on('connection', socket => {
          console.log('client connected'); // finished server socket setup. Now need to set up client socket
          // console.log(server);
          // console.log(io);
          // io.send(server.id);
        });
      })
    })
  })
  .catch(console.error);