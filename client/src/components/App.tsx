import React, { useState, useCallback, useEffect } from 'react'
import { useStoreActions, useStoreState } from '../Redux'
import { useData } from '../Context';
import { AppContainer, GameContainer, ChatBtn } from './styles/AppStyles';
import Board from './Board';
import Feed from './Feed';
import Header from './Header';
import Footer from './Footer';


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
  const [openChatSymbol, setOpenChatSymbol] = useState('>')

  // State
  const { boardLayout } = state.board;
  const { players, player1, player2 } = state.players;
  const { turn, gameStatus, winner } = state.statuses;
  const { chatIsHidden, chatMessagesUnseen, feed } = state.chat;
  const { userSession } = state.user;
  const { user } = userSession;

  // Actions
  const { toggleChat } = actions.chat;

  const {
    removePlayer,
    updatePlayers,
  } = actions.players;

  const {
    updateTurn,
    updateTurnStatus,
    updateGameStatus,
    updateWinner,
  } = actions.statuses;

  const {
    updateBoard,
    clearBoard,
  } = actions.board;



  const checkUpdates = (stat?: string):void => {
    if (stat === 'newGame') {
      updateWinner(null);
    }
  };

  const checkGameStatus = () => {
    if (players) {
      let totalPlayerCount = Object.keys(players).length;
      if (totalPlayerCount === 2 && gameStatus !== 'inGame') {
        updateGameStatus('inGame');
      }
      if (totalPlayerCount <= 1 && gameStatus !== 'preGame') {
        updateGameStatus('preGame')
      }
    }
  };


  const moveFn = (data: any) => {
    console.log('move: ', data)
    updateBoard(data);
  };

  const getTurnFn = (name: string) => {
    console.log('getTurn Recieved ->', name);
    if (turn !== name) {
      updateTurn(name);
    }
  };

  const toggleTurnFn = (name: string) => {
    console.log('toggleTurn Recieved ->', name);
    updateTurnStatus(name === user)
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

  const addPlayerFn = useCallback((players: PlayersObj) => {
    // console.log('Adding player: ', players);
    updatePlayers(players);
    checkGameStatus();
    // console.log('Total PlayersCount: ', Object.keys(players).length)
    // if (Object.keys(players).length === 2) {
    //   updateGameStatus('inGame');
    // } else {
    //   updateGameStatus('preGame');
    // }
  }, [players]);

  // const announcerFn = (msg) => {
  //   setmsg(msg);
  //   setTimeout(function () {
  //     setmsg(updateGameStatus());
  //   }, 2000);
  // };

  const clearBoardFn = () => {
    // updateTurn(winner!);
    clearBoard();
    updateWinner(null);
    updateGameStatus('inGame');
  };

  // const updateBoardStatusFn = (stat) => {
  //   // console.log('status updater: ', stat);
  //   updateStatus(stat);
  // };

  const connectFn = useCallback(() => {
    socket.emit('getInitClients');
    socket.emit('getTurn');
  }, []);

  const getInitClientsFn = useCallback((currentPlayers: PlayersObj) => {
    console.log('Currr', currentPlayers)
    updatePlayers(currentPlayers);
    if (Object.keys(currentPlayers).length >= 1) {
      updateGameStatus('preGame');
    }
  }, [players]);

  const disconnectFn = () => {
  };

  const disconnectPlayerFn = (player: PlayerObj): void => {
    console.log('removing ', player);
    removePlayer(player);
    checkUpdates();
    clearBoard()
    updateTurnStatus('waiting');
    // if (players) {
    //   if (Object.keys(players).length < 2) {
    //   }
    //   if (gameStatus === 'inGame' && turn) {
    //     updateTurnStatus(turn === user);
    //   }
    // }
  };

  useEffect(() => {

    // console.log('LISTENING IN USEEFFECT');
    socket.on('move', moveFn);
    socket.on('getTurn', getTurnFn);
    socket.on('toggleTurn', toggleTurnFn);
    socket.on('addPlayer', addPlayerFn);
    // socket.on('addPlayer1', addPlayerFn);
    // socket.on('addPlayer2', addPlayerFn);
    // socket.on('announcer', announcerFn);
    socket.on('clear board', clearBoardFn);
    // socket.on('updateBoardStatus', updateBoardStatusFn);
    socket.on('getInitClients', getInitClientsFn);
    socket.on('connect', connectFn);
    socket.on('disconnect', disconnectFn);
    socket.on('disconnectPlayer', disconnectPlayerFn);
    // checkUpdates();
    // checkGameStatus();
    return () => {
      socket.off('move');
      socket.off('getTurn');
      socket.off('toggleTurn');
      socket.off('addPlayer');
      // socket.off('announcer');
      socket.off('clear board');
      // socket.off('updateBoardStatus');
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

  useEffect(() => {
    // Updates Msg Notifications on btn
    if (chatIsHidden && chatMessagesUnseen > 0) {
      setOpenChatSymbol('>*');
    } else {
      setOpenChatSymbol('>');
    }
  }, [feed, chatIsHidden]);


  return (
    <AppContainer>
      <Header />

      <GameContainer>

        <Board />

        <Feed hidden={chatIsHidden} />
        <ChatBtn
          onClick={() => toggleChat()}
        >
          {chatIsHidden ?
            openChatSymbol
            :
            "<"}
        </ChatBtn>


      </GameContainer>

        {/* <Footer /> */}

    </AppContainer>
  );
};

export default App;
