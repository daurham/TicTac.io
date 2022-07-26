import React, { useEffect, useState, useCallback } from "react";
// import { useStoreActions, useStoreState } from "easy-peasy";
import Board from "../Board";
import { useData } from "../Context";
import styled from "styled-components";
import Feed from "../Feed";
import Header from "../Header";
// import BoardLayout from './../BoardLayout';

export default function App() {

  const {
    socket,
  } = useData();

  const {
    boardLayout,
    players,
    user,
    turn,
    chatIsHidden,
    gameStatus,
    // setTurn,
    // status,
    // setStatus,
    // updateBoard,
    // submitPlayer,
    // wipeBoard,
    // updateBoardStatus,
    // getPlayerValue,
    // updateTurn,
    // updateStatus,
  } = useStoreState(state => state.boardState);

  
  const {
    removePlayer,
    addPlayer,
    // updatePlayers,
    clearBoard,
    updateBoard,
    updateTurn,
    toggleChat,
  } = useStoreActions((actions) => actions);
  const updatePlayers = useStoreActions((actions) => actions.updatePlayers);
  
  // if (!updatePlayers) {
  //   return;
  // }
  
  const actions = useStoreActions((actions) => actions);
  // console.log('updatePlayers: ', updatePlayers)
  // console.log('Actions: ', actions)

  // const [hideChat, toggleChat] = useState(false);
  // const [msg, setmsg] = useState();
  // const [round, setRound] = useState([]);
  // const [gotWinner, setGotWinner] = useState(false);
  // let gotWinner;




  const moveFn = (data) => {
    updateBoard(data);
  };

  const getTurnFn = (name) => {
    // console.log('getTurn Recieved ->', name);
    if (turn !== name) {
      // updateTurn(name);
    }
  };

  const toggleTurnFn = (name) => {
    // console.log('toggleTurn Recieved ->', name);
    updateTurn(name);
  };

  // const addPlayer1Fn = useCallback((players) => {
  //   const { player1 } = players;
  //   if (player1) {
  //     updatePlayers(players);
  //   }
  // }, [players])

  // const addPlayer2Fn = useCallback((players) => {
  //   const { player2 } = players;
  //   if (player2) {
  //     updatePlayers(players);
  //   }
  // }, [players])

  const addPlayerFn = useCallback((players) => {
    // updatePlayers(players);
    // console.log('Adding player: ', players) // FIX ME
  }, [players])

  // const announcerFn = (msg) => {
  //   setmsg(msg);
  //   setTimeout(function () {
  //     setmsg(updateGameStatus());
  //   }, 2000);
  // };

  const clearBoardFn = () => {
    clearBoard();
  };

  const updateBoardStatusFn = (stat) => {
    // console.log('status updater: ', stat);
    updateStatus(stat);
  };

  const connectFn = useCallback(() => {
    socket.emit('getInitClients');
    socket.emit('getTurn');
  }, []);

  const getInitClientsFn = useCallback((players) => {
    console.log('Initially loggin current players:  ', players)

    // if (updatePlayers) {
      // updatePlayers(players);
    // } else {
    // }
  }, []);

  const disconnectFn = () => {
  };

  const disconnectPlayerFn = (playerID) => {
    removePlayer(playerID);
  };

  useEffect(() => {
    socket.on('move', moveFn);
    socket.on('getTurn', getTurnFn);
    socket.on('toggleTurn', toggleTurnFn);
    socket.on('addPlayer', addPlayerFn);
    // socket.on('addPlayer1', addPlayerFn);
    // socket.on('addPlayer2', addPlayerFn);
    // socket.on('announcer', announcerFn);
    socket.on('clear board', clearBoardFn);
    socket.on('updateBoardStatus', updateBoardStatusFn);
    socket.on('getInitClients', getInitClientsFn);
    socket.on('connect', connectFn);
    socket.on('disconnect', disconnectFn);
    socket.on('disconnectPlayer', disconnectPlayerFn);

    return () => {
      socket.off('move');
      socket.off('getTurn');
      socket.off('toggleTurn');
      socket.off('addPlayer');
      // socket.off('addPlayer1');
      // socket.off('addPlayer2');
      // socket.off('announcer');
      socket.off('clear board');
      socket.off('updateBoardStatus');
      socket.off('connect');
      socket.off('getInitClients');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('disconnectPlayer');
    }
  }, [
    boardLayout,
    gameStatus,
    players,
    turn,
    user,
    chatIsHidden,
  ]);

  // useEffect(() => {
  //   // if (foundWinner() && !gotWinner) {
  //     // gotWinner = getWinner();

  //     // setGotWinner(val => !val);
  //   // }
  //   console.log('uE Status change!- val: ', status);
  // }, [status, boardLayout]);

  // useEffect(() => console.log('useEffectrerenderingggBD, Chat: ',), [boardLayout, hideChat]); // TEST
  // useEffect(() => console.log('uE Status change!: ', status), [status]); // TEST
  // useEffect(() => console.log('uE listening HORD: ')); // TEST

  return (
    <AppContainer>
      {/* {console.log('rerender')/* TEST */}
      <Header />

      <GameContainer>
        <Board />
        <Feed hidden={chatIsHidden} />
        <ChatBtn onClick={() => toggleChat()} >{!chatIsHidden ? ">" : "<"}</ChatBtn>
      </GameContainer>

    </AppContainer>
  );
};

const AppContainer = styled.div`
  justify-content: center;
  align: center;
`;
const GameContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ChatBtn = styled.button`
  // margin: 3px;
`;