import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useData } from "../Context";
import Board from "./Board";
import Feed from "./Feed";

export default function App() {

  const {
    socket,
    boardData,
    nons,
    updateBoard,
    updatePlayers,
    players,
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
  // const [gameStatus, setGameStatus] = useState();

  const updateGameStatus = () => {
    console.log('players', player1, player2)
    if (player1 && player2) {
      turn === user ? 
      setGameStatus(`Its your turn...`) : 
      setGameStatus(`Waiting on opponent...`);
    } else {
      setGameStatus('Waiting for Players to join');
    }
  };

  const updatePlayerList = () => {
    if (players.length === 1) {
      setPlayerList(`Player1: ${player1} Player2: ...`);
    } else if (players.length === 2) {
      setPlayerList(`Player1: ${player1} Player2: ${player2}`);
    } else {
      console.log('PLAYERS:', players);
      setPlayerList('Player1: ... Player2: ...');
    }
  };


  socket.on('move', (data) => {
    updateBoard(data);
  });


  socket.on('addPlayer', (data) => {

      setPlayer1(data[0].name);
      setTurn(data[0].name);

    if (data.length === 2) {
      setPlayer2(data[1].name);
    }

    if (user) {
      if (data[0].name === user) {
        setPlayerValue('X');
        setOpponentValue('O');
      } else {
        setPlayerValue('O');
        setOpponentValue('X');
      }
    }
    console.log('shouldnt see this much', data)
    updatePlayers(data);
  });


  socket.on('announcer', (msg) => {
    setmsg(msg);
    setTimeout(function () {
      setmsg(gameStatus);
    }, 2000);
  });


  socket.on('wipe', async (freshBoard) => {
    await setboardData(freshBoard);
    await foundFullBoard(false);
    await foundWinner(false);
    await setRound([...round, 1]);
    // await setTurn(player1);
  });


  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('reload');
    });

    socket.on('disconnect', () => {
    });

    return () => { // cleanup
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);


  useEffect(() => {console.log('winner:', winner, 'round', round)}, [round]);
  useEffect(() => {
    updateGameStatus();
    updatePlayerList();
    console.log('Checking App');
  }, []);

  return (
    <div>
      <span>
        <h1>TicTac.io</h1>
        <Plist>{playerList}</Plist>
        {user ? <PVal>Player: {playerValue}</PVal> : <div><InptSt onChange={(e) => { console.log(); setInput(e.target.value) }} type="text" /><BtnSt onClick={() => submitPlayer(input)}>Sumbit</BtnSt></div>}
        {winner || fullBoard ? null : (!msg ? <Status>{gameStatus}</Status> : <Status>{msg}</Status>)}
        <div hidden={!winner}><h1>WE HAVE A WINNER!</h1><button onClick={() => wipeBoard()}>Reset</button></div>
        {/* {!winner ? null : <div hidden={!winner}><h1>WE HAVE A WINNER!</h1><button onClick={() => wipeBoard()}>Reset</button></div>} */}
        <div hidden={!fullBoard}><h1>WE HAVE A DRAWWL!</h1><button onClick={() => wipeBoard()}>Reset</button></div>
        {/* {!fullBoard ? null : <div hidden={!fullBoard}><h1>WE HAVE A DRAWWL!</h1><button onClick={() => wipeBoard()}>Reset</button></div>} */}
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
const BtnSt = styled.button`
  // margin: 3px;
  `;
const InptSt = styled.input`
  // margin: 3px;
`;