import React, { useState, useMemo, useEffect, useContext, createContext } from 'react';
import App from './components/App';
import BoardLayout from './BoardLayout';
import { socket } from './Socket';

const contextData = createContext(/* defaultValue */);
export const useData = () => useContext(contextData);

export default function Context() {
  const [boardData, setboardData] = useState(BoardLayout);
  // const [boardData, setboardData] = useState({ BoardLayout });
  const [players, setPlayers] = useState([]);
  const [user, setUser] = useState();
  const [turn, setTurn] = useState();
  const [status, setStatus] = useState();


  const updateBoard = (newBoard, wipe) => {
    // console.log('updating board vals: ', Object.values(newBoard)); // TEST
    // console.log('updating board keys: ', Object.keys(newBoard)); // TEST
    if (wipe) {
      setboardData((oldBoard) => {
        let freshStart = {};
        for (let key in oldBoard) {
          freshStart[key] = "";
        };
        return freshStart;
      });
    } else {
      setboardData((oldBoard) => {
        for (let newKey in newBoard) {
          for (let oldKey in oldBoard) {
            if (oldKey !== newKey) {
              newBoard[oldKey] = oldBoard[oldKey];
              // console.log('newBoard[oldkey] ', oldKey, ' !== ', newKey, ' oldBoard[oldKey]');
              // console.log('newBoard[oldkey] = oldBoard[oldKey]')
              // oldBoard[newKey] = newBoard[newKey];
              // console.log('success?', newBoard[oldKey], ':', oldKey, 'from ->', oldBoard[oldKey]);
            }
          }
        }
        // console.log('newBoard: ', Object.values(newBoard));
        // console.log('newBoard: ', newBoard);
        return newBoard;
      });
    }
    // console.log('2', doubleUp); // TEST
    // console.log('updated..?', boardData); // TEST
    // await console.log('updatepls', makeBoardArray()); // TEST
  };

  const updateBoardStatus = (stat) => {
    let data = stat;
    if (typeof data === 'string') {
      data = {stat: data, score: 0};
    }
    socket.emit('updateBoardStatus', data);
  };

  const makeBoardArray = () => {
    // const nonsArr = Object.keys(boardData.BoardLayout);
    const nonsArr = Object.keys(boardData);
    // console.log('making an array from:', boardData);
    // console.log('maked an array:', nonsArr);
    let result = nonsArr.map((x, index) => {
      // let key =`ninth${index + 1}`;
      // let elem = { ninth: key, value: boardData[key] };
      let elem = { ninth: `ninth${index + 1}`, value: boardData[`ninth${index + 1}`] };
      // console.log('key', key, ' In board-> ', boardData[key], ' elem', elem, ' x', x, )
      // console.log('made: ', elem, 'hoping match', x);
      return elem;
      // console.log('Inserting: ', boardData[x]);
      // if (x === `ninth${index + 1}`) {
      //   console.log('made: ', `ninth${index + 1}`);
      //   console.log('at: ', x);
      //   // return { ninth: x, value: boardData.BoardLayout[x] }
      // }
    });
    // console.log(result);
    return result;
  };

  const updatePlayers = (playerData, score) => {
    // console.log('playerData', playerData);
    if (playerData) {
      if (score) {
        setPlayers(players => {
          const { score } = players[playerData];
          // score += 1;
          players[playerData].score = score + 1;
          // score++;
        return players;
        });
      } else if (typeof playerData === 'string') {
        setPlayers((oldPlayers) => {
          let updatedPlayers = {};
          for (let key in oldPlayers) {
            if (oldPlayers[key]) {
              if (oldPlayers[key].name !== playerData) {
                updatedPlayers[key] = oldPlayers[key];
              }
            }
          }
          return updatedPlayers;
        });
      } else { // updating player state
        setPlayers(() => {
          return playerData;
        });
      }
    }
  };

  const updateTurn = (name) => {
    // console.log(`updating turn from ${turn} to ${name}`);
    setTurn(() => name);
  };

  const updateStatus = (stat) => {
    // console.log(`updating turn from ${status} to ${stat}`);
    if (stat !== status) {
      setStatus(() => stat);
    }
  };

  const handleClick = (updateData) => {
    if (status === 'player1' || status === 'player2') {
      return;
    }
    if (user) {
      if (turn === user) {
        if (status != 'player1' || status != 'player2') {
          socket.emit('move', updateData);
          socket.emit('toggleTurn');
        }
      }
    }
  };

  const nameIsValid = (name) => {
    if (name.toLowerCase() === 'audience') {
      return false;
    }
    if (players.player1) {
      if (name.toLowerCase() === players.player1.name.toLowerCase()) {
        return false;
      }
    }
    if (players.player2) {
      if (name.toLowerCase() === players.player2.name.toLowerCase()) {
        return false;
      }
    }
    return true;
  };

  const submitPlayer = (playerName) => {
    playerName = String(playerName);
    if (nameIsValid(playerName)) {
      if (!players.player1) {
        socket.emit('addPlayer1', playerName);
      } else if (!players.player2) {
        socket.emit('addPlayer2', playerName);
      }
      setUser(playerName);
      socket.emit('getTurn');
    } else {
      alert('Please use a different name')
    }
  };

  const getPlayerValue = () => {
    if (user && players) {
      if (players.player1) {
        if (players.player1.name === user) {
          return players.player1.playerValue;
        }
      }
      if (players.player2) {
        if (players.player2.name === user) {
          return players.player2.playerValue;
        }
      }
    }
    return 'error';
  };

  const wipeBoard = (win = false) => {
    const { player1, player2 } = players;
    // players()
    // console.log(win);
    let score = 0;
    if (win === 'player1') score = player1.score;
    if (win === 'player2') score = players.score;
    socket.emit('wipe');
    updateBoardStatus({ stat: win, score });
  };

  const value = useMemo(() => ({
    socket,
    boardData,
    setboardData,
    players,
    setPlayers,
    user,
    setUser,
    turn,
    setTurn,
    status,
    setStatus,
    updateBoardStatus,
    makeBoardArray,
    getPlayerValue,
    updatePlayers,
    submitPlayer,
    handleClick,
    updateBoard,
    wipeBoard,
    updateTurn,
    updateStatus,
  }),
    [
      boardData,
      players,
      status,
      user,
      turn,
    ]);

  // useEffect(() => console.log('LocalUEf Board rereder:'), [boardData]); // TEST


  return !boardData ? null : (
    <>
      <contextData.Provider value={value}>
        <App />
      </contextData.Provider>
    </>
  );
};