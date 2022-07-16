module.exports = (players, socket) => {
  let curPlayer = players.filter((p) => p.id === socket.id);
  if (curPlayer.length > 0) {
    return curPlayer[0].name;
  } else {
    return 'Audience';
  }
};    