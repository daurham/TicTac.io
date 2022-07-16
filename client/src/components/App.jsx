import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useData } from "../Context";
import Board from "./Board";
import Feed from "./Feed";
import BoardLayout from './../BoardLayout';

export default function App() {

  const {
    socket,
    boardData,
    nons,
    updateBoard,
    updatePlayers,
    players,
    setPlayers,
    user,
    submitPlayer,
    setUser,
    setPlayerValue,
    playerValue,
    turn,
    player1,
    player2,
    setPlayer1,
    setPlayer2,
    setOpponentValue,
    winner,
    isWinner,
    setTurn,
    fullBoard,
    foundFullBoard,
    foundWinner,
    wipeBoard,
    setboardData,
  } = useData();

  const [input, setInput] = useState();
  const [msg, setmsg] = useState();
  const [round, setRound] = useState([]);
  const [gameStatus, setGameStatus] = useState();
  const [playerList, setPlayerList] = useState();

  const updateGameStatus = () => {
    if (player1 && player2) {
      turn === user ?
        setGameStatus(`Its your turn...`) :
        setGameStatus(`Waiting on opponent...`);
    } else {
      setGameStatus('Waiting for Players to join');
    }
  };

  const updatePlayerList = () => {
    if (players.player1 && !players.player2) {
      setPlayerList(`Player1: ${player1} Player2: ...`);
    } else if (!players.player1 && players.player2) {
      setPlayerList(`Player1: ... Player2: ${player2}`);
    } else if (players.player1 && players.player2) {
      setPlayerList(`Player1: ${player1} Player2: ${player2}`);
    } else {
      setPlayerList('Player1: ... Player2: ...');
    }
  };


  const setupPlayer1 = (playersObj) => {
    setPlayer1(playersObj.player1.name);
    // if (players.player1) {
    // }
  }

  const setupPlayer2 = (playersObj) => {
    setPlayer1(playersObj.player2.name);
    // if (players.player2) {
    // }
  }

  socket.on('move', (data) => {
    updateBoard(data);
  });


  socket.on('getTurn', (name) => {
    if (turn !== name) {
      setTurn(name);
    }
  });

  socket.on('toggleTurn', (name) => {
    setTurn(name);
  });

  socket.on('addPlayer1', (players) => {
    // console.log(players);
    setPlayer1(players.player1.name);
    if (user === players.player1.name) {
      setPlayerValue('X');
      setOpponentValue('O');
    }
    // console.log('updating players: ', players)
    updatePlayers(players);
  });

  socket.on('addPlayer2', (players) => {
    setPlayer2(players.player2.name);
    if (user === players.player2.name) {
      console.log(user)
      setPlayerValue('O');
      setOpponentValue('X');
    }
    updatePlayers(players);
  });


  socket.on('announcer', (msg) => {
    // setmsg(msg);
    setTimeout(function () {
      // setmsg(gameStatus);
    }, 2000);
  });

  socket.on('wipe', () => {
    // let boardCopy = {};
    // for (let key in BoardLayout) {
    //   boardCopy[key] = '';
    // }
    // setboardData(boardCopy);
    setboardData({
      ninth1: "",
      ninth2: "",
      ninth3: "",
      ninth4: "",
      ninth5: "",
      ninth6: "",
      ninth7: "",
      ninth8: "",
      ninth9: ""
    });
  });

  // socket.on('round', () => {
  //   setRound([...round, 1]);
  // });

  socket.on('resetBoard', (win) => {
    if (win) {
      foundWinner(false);
    } else {
      // foundFullBoard(false);
    }
  });

  socket.on('connect', () => {
    socket.emit('getInitClients');
    socket.emit('getTurn');
  });

  socket.on('getInitClients', (players) => {
    setPlayers(players);

    if (players.player1 && !player1) {
      setupPlayer1(players);
    }
    if (players.player2 && !player2) {
      setupPlayer2(players);
    }
    updatePlayerList();
  });

  socket.on('disconnect', data => {
    // console.log('disconnect data:', data);
  });

  socket.on('disconnectPlayer', async playerName => {
    // console.log('disconnect Player:', playerName);
    await setPlayers(() => {
      let updatedPlayers = {};
      for (let key in players) {
        if (players[key]) {
          if (players[key].name !== playerName) {
            updatedPlayers[key] = players[key];
          }
        }
      }
      // console.log('UPDATED Username??: ', updatedPlayers);
      return updatedPlayers;
    });

    // console.log('UPDATED Username: ', players);
  });


  useEffect(() => {
    updateGameStatus();
    updatePlayerList();
  }, []);

  useEffect(() => {
    updatePlayerList();
    updateGameStatus();
  }, [players, turn, player1, player2]);

  return (
    <div>
      <span>
        <h1>TicTac.io</h1>
        <Plist>{playerList}</Plist>
        {user ? <PVal hidden={isWinner || fullBoard} >Player: {playerValue}</PVal> : <div><InptSt onChange={(e) => { console.log(); setInput(e.target.value) }} type="text" /><BtnSt onClick={() => submitPlayer(input)}>Sumbit</BtnSt></div>}
        {isWinner || fullBoard ? null : (!msg ? <Status>{gameStatus}</Status> : <Status>{msg}</Status>)}
        {!isWinner ? null : <div><BigStatus>{winner.toUpperCase()} WON!</BigStatus><button onClick={() => wipeBoard(true)}>Reset</button></div>}
        {!fullBoard ? null : <div><BigStatus>WE HAVE A DRAWWL!</BigStatus><button onClick={wipeBoard}>Reset</button></div>}
      </span>
      <Board />
      <Feed />
    </div>
  );
};


const PVal = styled.h6`
  margin: 7px;
  `;
const Plist = styled.h5`
  margin: 3px;
  `;
const Status = styled.h4`
  margin: 3px;
  `;
const BigStatus = styled.h2`
  margin: 0px;
  `;
const BtnSt = styled.button`
  // margin: 3px;
  `;
const InptSt = styled.input`
  // margin: 3px;
`;