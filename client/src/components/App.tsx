import React, { useState, useCallback, useEffect } from 'react'
import { useStoreActions, useStoreState } from '../Redux'
import { socket } from '../Socket'
import { AppContainer, GameContainer, ChatBtn, ChatBtnNotify } from './styles/AppStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnchor, faAnchorCircleExclamation, faAnchorCircleCheck, faAnchorCircleXmark, faAnchorLock } from '@fortawesome/free-solid-svg-icons'
import Board from './Board';
import Feed from './Feed';
import Header from './Header';
import Footer from './Footer';
import OverlayAnnouncment from './OverlayAnnouncment';
import { PlayersObj, Player } from '../Types'



const App: React.FC = () => {
  const state = useStoreState(state => state);
  const actions = useStoreActions(actions => actions);
  const [openChatSymbol, setOpenChatSymbol] = useState<any>()

  // State
  const { boardLayout } = state.board;
  const { players, player1, player2 } = state.players;
  const { turn, gameStatus, winner } = state.statuses;
  const { userSession } = state.user;
  const { user } = userSession;
  const {
    chatIsHidden,
    chatMessagesUnseen,
    feed
  } = state.chat;

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



  const checkUpdates = (stat?: string): void => {
    if (stat === 'newGame') {
      updateWinner(null);
    }
  };

  const checkGameStatus = ():void => {
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

  const moveFn = (data: any):void => {
    // console.log('move: ', data)
    updateBoard(data);
  };

  const getTurnFn = (name: string):void => {
    // console.log('getTurn Recieved ->', name);
    if (turn !== name) {
      updateTurn(name);
    }
  };

  const toggleTurnFn = (name: string):void => {
    // console.log('toggleTurn Recieved ->', name);
    updateTurnStatus(name === user)
    updateTurn(name);
  };


  const addPlayerFn = useCallback((players: PlayersObj) => {
    // console.log('Adding player: ', players);
    updatePlayers(players);
    checkGameStatus();
  }, [players]);


  const clearBoardFn = () => {
    clearBoard();
    updateWinner(null);
    updateGameStatus('inGame');
  };


  const connectFn = useCallback(() => {
    socket.emit('getInitClients');
    socket.emit('getTurn');
  }, []);


  const getInitClientsFn = useCallback((currentPlayers: PlayersObj) => {
    // console.log('Currr', currentPlayers)
    updatePlayers(currentPlayers);
    if (Object.keys(currentPlayers).length >= 1) {
      updateGameStatus('preGame');
    }
  }, [players]);


  const disconnectFn = () => {
  };


  const disconnectPlayerFn = (player: Player): void => {
    // console.log('removing ', player);
    removePlayer(player);
    checkUpdates();
    clearBoard()
    updateTurnStatus('waiting');
  };

  useEffect(() => {

    socket.on('move', moveFn);
    socket.on('getTurn', getTurnFn);
    socket.on('toggleTurn', toggleTurnFn);
    socket.on('addPlayer', addPlayerFn);
    socket.on('clear board', clearBoardFn);
    socket.on('getInitClients', getInitClientsFn);
    socket.on('connect', connectFn);
    socket.on('disconnect', disconnectFn);
    socket.on('disconnectPlayer', disconnectPlayerFn);
    return () => {
      socket.off('move');
      socket.off('getTurn');
      socket.off('toggleTurn');
      socket.off('addPlayer');
      socket.off('clear board');
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
    if (chatIsHidden && chatMessagesUnseen > 0) {
      setOpenChatSymbol(faAnchorCircleExclamation);
    } else {
      setOpenChatSymbol(faAnchor);
    }
  }, [feed, chatIsHidden]);


  return (
    <AppContainer>
      <OverlayAnnouncment>

        <Header />

        <GameContainer>

          <Board />

          <Feed hidden={chatIsHidden} />

          {(chatIsHidden && chatMessagesUnseen > 0)
            ?
            <ChatBtnNotify
              onClick={() => toggleChat()}
            >
              <FontAwesomeIcon icon={openChatSymbol} />
            </ChatBtnNotify>
            :
            <ChatBtn
              onClick={() => toggleChat()}
            >
              <FontAwesomeIcon icon={faAnchor} />
            </ChatBtn>
          }


        </GameContainer>

        <Footer />

      </OverlayAnnouncment>

    </AppContainer>
  );
};

export default App;
