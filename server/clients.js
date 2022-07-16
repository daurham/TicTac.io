class Clients {
  constructor() {

  }

  add(id, name = 'Audience', player = false) {
    let max = this.getMax();

    this.initializeTurn();

    if (player && this.find(player)) {
      if (this.find(player)) {
        if (this.find(player).player === player) {
          this.find(player).player = player;
          this.find(player).id = id;
          this.find(player).name = name;
        }
      }
    } else {
      this[++max] = { id, player, name };
    }
    console.log('players: ', player, 'name: ', name, 'id: ', id);
    console.log(this);
  }

  reassign(targetProp, id, name, player) {
    let target = this.find(targetProp);
    if (target) {
      target.id = id;
      target.name = name;
      target.player = player;
    } else {
      this.add(id, name, player);
    }
  }

  getName(targetProp) {
    let targetClient = this.find(targetProp);
    if (targetClient) {
      return targetClient.name;
    } else {
      return 'Audience';
    }
  }

  getMax() {
    let max = 0;
    if (Object.keys(this).length > 0) {
      for (let key in this) {
        max = (!max ? key : (Number(key) > Number(max) ? key : max));
      }
    }
    return max;
  }

  size() {
    return Object.keys(this).length;
  }

  remove(id) {
    delete this.find(id); // why doesnt it work?
  };

  getPlayers() {
    let players = {};
    if (this.find('player1')) {
      players.player1 = this.find('player1');
    }
    if (this.find('player2')) {
      players.player2 = this.find('player2');
    }
    return players;
  };

  find(propValue) {
    for (let key in this) {
      for (let innerKey in this[key]) {
        if (this[key][innerKey] === propValue) {
          // console.log('FOUND' + propValue, this[key]);
          return this[key];
        }
      }
    }
    return false;
  };

  toggleTurn() {
    let player1 = this.getName('player1');
    let player2 = this.getName('player2');
    this.turn = (this.turn === player1 ? player2 : player1);
    return this.turn;
  };

  initializeTurn() {
    if (this.find('player1')) {
      if (!this.turn) {
        this.turn = this.getName('player1');
      } else if (this.turn !== this.getName('player1') 
      && this.turn !== this.getName('player2')) {
        this.turn = this.getName('player1');
      }
    }
    // if (this.find('player1'))
  };
};
const clients = new Clients();

module.exports = clients;


/* 


const Clients = function () {};


Clients.prototype.add = function (id, name = 'Audience', player = false) {
  let max = this.getMax();

  this.initializeTurn();

  console.log(this);
  // console.log('players: ', player);
  // console.log(!!this.find(player));
  this.remove(id);

  if (player && this.find(player)) {
    if (this.find(player)) {
      if (this.find(player).player === player) {
        this.find(player).player = player;
        this.find(player).id = id;
        this.find(player).name = name;
      }
    }
  } else {
    this[++max] = { id, player, name };
  }
};

Clients.prototype.getMax = function () {
  let max = 0;
  if (Object.keys(this).length > 0) {
    for (let key in this) {
      max = (!max ? key : (Number(key) > Number(max) ? key : max));
    }
  }
  return max;
};

Clients.prototype.size = function () {
  return Object.keys(this).length;
};

Clients.prototype.remove = function (id) {
  let target = this.find(id);
  // delete this.find(id);
  delete target;
};

Clients.prototype.getPlayers = function () {
  let players = {};

  if (this.find('player1')) {
    players.player1 = this.find('player1');
  }
  if (this.find('player2')) {
    players.player2 = this.find('player2');
  }

  return players;
};


Clients.prototype.find = function (propValue) {
  for (let key in this) {
    for (let innerKey in this[key]) {
      if (this[key][innerKey] === propValue) {
        // console.log('FOUND' + propValue, this[key]);
        return this[key];
      }
    }
  }
  return null;
};

Clients.prototype.turn = undefined;

Clients.prototype.toggleTurn = function () {
  let player1 = this.find('player1').name;
  let player2 = this.find('player2').name;
  this.turn = (this.turn === player1 ? player2 : player1);
  return this.turn;
};

Clients.prototype.initializeTurn = function () {
  // Assigns a turn to a player if its undefined.
  if (this.find('player1')) {
    if (!this.turn) {
      this.turn = this.find('player1').name;
    }
  }
};

*/