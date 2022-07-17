import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useData } from "../Context";
import Board from "./Board";
import Feed from "./Feed";
// import BoardLayout from './../BoardLayout';

export default function App() {

  const {
    socket,
    boardData,
    // setboardData,
    players,
    // setPlayers,
    user,
    // setUser,
    turn,
    setTurn,
    status,
    setStatus,
    updatePlayers,
    updateBoard,
    submitPlayer,
    wipeBoard,
    updateBoardStatus,
    getPlayerValue,
    // nons,
    // setPlayerValue,
    // player1,
    // player2,
    // setPlayer1,
    // setPlayer2,
    // setOpponentValue,
    // opponentValue,
    // winner,
    // isWinner,
    // fullBoard,
    // foundFullBoard,
    // foundWinner,
  } = useData();

  const [input, setInput] = useState();
  const [msg, setmsg] = useState();
  const [round, setRound] = useState([]);

  const updateGameStatus = () => {
    const { player1, player2 } = players;
    if (player1 && player2) {
      return (turn === user ?
        `Its your turn...`
        : `Waiting on opponent...`);
    } else {
      return 'Waiting for Players to join';
    }
  };

  const updatePlayerList = () => {
    const { player1, player2 } = players;
    if (player1 && !player2) {
      return `Player1: ${player1.name} Player2: ...`;
    } else if (!player1 && player2) {
      return `Player1: ... Player2: ${player2.name}`;
    } else if (player1 && player2) {
      return `Player1: ${player1.name} Player2: ${player2.name}`;
    } else {
      return 'Player1: ... Player2: ...';
    }
  };

  const foundWinner = () => {
    if (status === 'player1' || status === 'player2') {
      return true;
    } else {
      return false;
    }
  };
  
  const getWinner = () => {
    if (status === 'player1' || status === 'player2') {
      return players[status].name;
    }
  };
  
  const boardIsFull = () => {
    if (status === 'full') {
      return true;
    } else {
      return false;
    }
  };
  
  const drawStatus = () => {
    let responses = ['WE HAVE A DRAWL', 'BOFF YALL LOST'];
    return responses[Math.floor(Math.random() * responses.length)]
  };




  const moveFn = (data) => {
    updateBoard(data);
  };

  const getTurnFn = (name) => {
    if (turn !== name) {
      setTurn(name);
    }
  };

  const toggleTurnFn = (name) => {
    setTurn(name);
  };

  const addPlayer1Fn = useCallback((players) => {
    const { player1 } = players;
    if (player1) {
      updatePlayers(players);
    }
  }, [players])

  const addPlayer2Fn = useCallback((players) => {
    const { player2 } = players;
    if (player2) {
      updatePlayers(players);
    }
  }, [players])

  // const announcerFn = (msg) => {
  //   setmsg(msg);
  //   setTimeout(function () {
  //     setmsg(updateGameStatus());
  //   }, 2000);
  // };

  const wipeFn = () => {
    updateBoard({
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
  };

  const updateBoardStatusFn = (stat) => {
    setStatus(stat);
  };

  const connectFn = useCallback(() => {
    socket.emit('getInitClients');
    socket.emit('getTurn');
  }, []);

  const getInitClientsFn = useCallback((players) => {
    updatePlayers(players);
  }, []);

  const disconnectFn = () => {
  };

  const disconnectPlayerFn = (playerName) => {
    updatePlayers(playerName);
  };

  useEffect(() => {

    socket.on('move', moveFn);

    socket.on('getTurn', getTurnFn);

    socket.on('toggleTurn', toggleTurnFn);

    socket.on('addPlayer1', addPlayer1Fn);

    socket.on('addPlayer2', addPlayer2Fn);

    // socket.on('announcer', announcerFn);

    socket.on('wipe', wipeFn);

    socket.on('updateBoardStatus', updateBoardStatusFn);

    socket.on('getInitClients', getInitClientsFn);

    socket.on('connect', connectFn);

    socket.on('disconnect', disconnectFn);

    socket.on('disconnectPlayer', disconnectPlayerFn);


    return () => {
      socket.off('move');
      socket.off('getTurn');
      socket.off('toggleTurn');
      socket.off('addPlayer1');
      socket.off('addPlayer2');
      // socket.off('announcer');
      socket.off('wipe');
      socket.off('updateBoardStatus');
      socket.off('connect');
      socket.off('getInitClients');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('disconnectPlayer');
    }
  }, [
    boardData,
    status,
    players,
    turn,
    user,
  ]);

  return (
    <AppContainer>

      <Title>TicTac.io</Title>

      <GameStatusContainer>
        <Plist>{updatePlayerList()}</Plist>
        {user ? <PVal hidden={foundWinner() || boardIsFull()} >Player: {getPlayerValue()}</PVal> : <div><InptSt onChange={(e) => setInput(e.target.value)} type="text" /><BtnSt onClick={() => submitPlayer(input)} type="submit">Sumbit</BtnSt></div>}
        {foundWinner() || boardIsFull() ? null : (!msg ? <Status>{updateGameStatus()}</Status> : <Status>{msg}</Status>)}
        {!foundWinner() ? null : <div><BigStatus>{getWinner().toUpperCase()} WON!</BigStatus><BtnSt onClick={() => wipeBoard(true)}>Reset</BtnSt></div>}
        {!boardIsFull() ? null : <div><BigStatus>{drawStatus()}</BigStatus><BtnSt onClick={wipeBoard}>Reset</BtnSt></div>}
      </GameStatusContainer>

      <GameContainer>
        <Board />
        <Feed />
      </GameContainer>

    </AppContainer>
  );
};

const AppContainer = styled.div``;
const GameContainer = styled.div``;
const GameStatusContainer = styled.div``;


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
const Title = styled.h1`
  margin: 0px;
  `;
const BtnSt = styled.button`
  // margin: 3px;
  `;
const InptSt = styled.input`
  // margin: 3px;
`;