import React, { useCallback, useEffect } from 'react'
import { useStoreActions, useStoreState } from '../Redux'
import { useData } from '../Context';
import { AppContainer, GameContainer, ChatBtn } from './styles/AppStyles';
import Board from './Board';
import Feed from './Feed';
import Header from './Header';


type PlayerObj = {
  id: string;
  player: 'player1' | 'player2';
  name: string;
  playerValue: string;
}

interface PlayersObj {
  player1: PlayerObj | null;
  player2: PlayerObj | null;
}



const App: React.FC = () => {
  const socket = useData();
  const state = useStoreState(state => state);
  const actions = useStoreActions(actions => actions);
  console.log('state?', state);
  console.log('actions?', actions);
  console.log('socket?', socket);

  
/*
const {
    board,
    chat,
    statuses,
    players
    } = useStoreActions(actions => actions);
    console.log(board)
    console.log(chat)
    console.log(statuses)
    console.log(players)
  //*/
  /* 
  const boardLayout = state.board.boardLayout;
  const gameStatus = state.statuses.gameStatus;
  const players = state.players.players;
  const turn = state.statuses.turn;
  const user = state.user.userSession;
  const chatIsHidden = state.chat.chatIsHidden;
  //*/



  // const moveFn = (data) => {
  //   updateBoard(data);
  // };

  // const getTurnFn = (name) => {
  //   // console.log('getTurn Recieved ->', name);
  //   if (turn !== name) {
  //     // updateTurn(name);
  //   }
  // };

  // const toggleTurnFn = (name) => {
  //   // console.log('toggleTurn Recieved ->', name);
  //   updateTurn(name);
  // };

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

  // const addPlayerFn = useCallback<PlayersObj>((players) => {
    // updatePlayers(players);
    // console.log('Adding player: ', players) // FIX ME
  // }, [players])

  // const announcerFn = (msg) => {
  //   setmsg(msg);
  //   setTimeout(function () {
  //     setmsg(updateGameStatus());
  //   }, 2000);
  // };

  // const clearBoardFn = () => {
  //   clearBoard();
  // };

  // const updateBoardStatusFn = (stat) => {
  //   // console.log('status updater: ', stat);
  //   updateStatus(stat);
  // };

  const connectFn = useCallback(() => {
    socket.emit('getInitClients');
    socket.emit('getTurn');
  }, []);

  const getInitClientsFn = useCallback((players: PlayersObj) => {
    console.log('Initially loggin current players:  ', players)
    actions.players.updatePlayers(players);
    // if (updatePlayers) {
      // updatePlayers(players);
    // } else {
    // }
  }, []);

  const disconnectFn = () => {
  };

  const disconnectPlayerFn = (player: PlayerObj): void => {
    actions.players.removePlayer(player);
  };

  useEffect(() => {
    // socket.on('move', moveFn);
    // socket.on('getTurn', getTurnFn);
    // socket.on('toggleTurn', toggleTurnFn);
    // socket.on('addPlayer', addPlayerFn);
    // socket.on('addPlayer1', addPlayerFn);
    // socket.on('addPlayer2', addPlayerFn);
    // socket.on('announcer', announcerFn);
    // socket.on('clear board', clearBoardFn);
    // socket.on('updateBoardStatus', updateBoardStatusFn);
    socket.on('getInitClients', getInitClientsFn);
    socket.on('connect', connectFn);
    socket.on('disconnect', disconnectFn);
    socket.on('disconnectPlayer', disconnectPlayerFn);

    return () => {
      // socket.off('move');
      // socket.off('getTurn');
      // socket.off('toggleTurn');
      // socket.off('addPlayer');
      // socket.off('addPlayer1');
      // socket.off('addPlayer2');
      // socket.off('announcer');
      // socket.off('clear board');
      // socket.off('updateBoardStatus');
      socket.off('getInitClients');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('disconnectPlayer');
    }
  }, [
    // boardLayout,
    // gameStatus,
    // players,
    // turn,
    // user,
    // chatIsHidden,
  ]);



  return (
    <AppContainer>
    <Header />

    <GameContainer>
      <Board />
      <Feed hidden={state.chat.chatIsHidden} />
      <ChatBtn onClick={() => actions.chat.toggleChat()} >{!state.chat.chatIsHidden ? ">" : "<"}</ChatBtn>
    </GameContainer>

  </AppContainer>
  );
};

export default App;
