class Clients {
  constructor() {
    this.Turn = null;
    this.List = {};
  };

  add(id, name = 'Audience', player = false) {
    let max = this.getMax();
    if (this.find(id) || (player && this.find(player))) {
      this.remove(id);
      this.remove(player);
    }

    this.List[max] = { id, player, name };
    if (player === 'player1') this.find(player).playerValue = 'X'
    if (player === 'player2') this.find(player).playerValue = 'O'
    if (player) this.find(player).score = 0;
    this.initializeTurn();
  }

  getName(targetProp) {
    let targetClient = this.find(targetProp);
    if (targetClient) {
      return targetClient.name;
    } else {
      return null;
    }
  }

  getMax() {
    let max = 0;
    while (this.List[max]) {
      max++;
    }
    return max;
  }

  size() {
    return Object.keys(this.List).length;
  }

  remove(targetProp) {
    this.find(targetProp, true);
  }

  getPlayers() {
    let players = {};
    if (this.find('player1')) {
      players.player1 = this.find('player1');
    }
    if (this.find('player2')) {
      players.player2 = this.find('player2');
    }
    return players;
  }

  find(targetPropValue, remove) {
    let list = this.List;
    for (let n in list) {
      for (let propKey in list[n]) {
        if (list[n][propKey] === targetPropValue) {
          if (remove) {
            delete list[n];
            return;
          } else {
            return list[n];
          }
        }
      }
    }
    return false;
  }

  toggleTurn() {
    let player1 = this.getName('player1');
    let player2 = this.getName('player2');
    let turn = this.Turn;
    // console.log('1', turn);
    this.Turn = (turn === player1 ? player2 : player1);
    // console.log('2', turn);
    // console.log('changed? :', turn === this.Turn);
    return turn;
  }

  initializeTurn() {
    let player1 = this.find('player1');
    let player2 = this.find('player2');
    let p1name = this.getName('player1');
    let p2name = this.getName('player2');
    let turn = this.Turn;
    if (player1) {
      if (!turn) {
        this.Turn = p1name;
      } else if (turn !== p1name && turn !== p2name) {
        this.Turn = p1name;
      }
    } else if (player2) {
      if (!turn) {
        this.Turn = p2name;
      } else if (turn !== p1name && turn !== p2name) {
        this.Turn = p2name;
      }
    } else {
      this.Turn = null;
    }
  }
};


String.prototype.cut = function () { return `"${this.slice(0, 2)}.."` };

const clientList = new Clients();

module.exports = clientList;
