import { action, Action, ActionOn, Actions } from "easy-peasy";
// import {PlayersModel} from 'players';


type boardStatusType = 'preGame' | 'inGame' | 'draw' | 'hasWinner' | null;
type headerStatusType = '' | '' | '' | null;
type turnStatusType = 'It\'s your turn' | 'Waiting on your opponent...' | 'Waiting for Players to join...';
type gameStatusType = 'preGame' | 'inGame' | 'draw' | 'hasWinner' | null;
type playerStatusType = 'Player1 ... Player2...' | string;

type PlayerStatObj = {
  action: 'remove' | 'add';
  player: 'player1' | 'player2';
  name: string;
}

export interface StatusesModel {
  turn: string | null;
  winner: string | null;
  boardStatus: boardStatusType;
  turnStatus: turnStatusType;
  gameStatus: gameStatusType;
  headerStatus: headerStatusType;
  playerStatus: playerStatusType;
  updateTurn: Action<StatusesModel, string>;
  updateGameStatus: Action<StatusesModel, gameStatusType>;
  updateTurnStatus: Action<StatusesModel, boolean | string>;
  updatePlayerStatus: Action<StatusesModel, PlayerStatObj>;
  updateBoardStatus: Action<StatusesModel, PlayerStatObj>;
  updateHeaderStatus: Action<StatusesModel>;
  updateWinner: Action<StatusesModel, string | null>;
};

const statuses: StatusesModel = {
  turn: null,
  winner: null,
  boardStatus: 'preGame',
  turnStatus: 'Waiting for Players to join...',
  gameStatus: 'preGame',
  headerStatus: null,
  playerStatus: 'Player1 ... Player2...',
  updateTurn: action((state, payload) => {
    state.turn = payload;
  }),
  updateGameStatus: action((state, payload) => {
    state.gameStatus = payload;
  }),
  updateTurnStatus: action((state, payload: boolean | string) => {
    if (payload === 'waiting') {
      state.turnStatus = 'Waiting for Players to join...'
    }
    if (payload === true) {
      state.turnStatus = 'It\'s your turn';
    } else {
      state.turnStatus = 'Waiting on your opponent...';
    }
  }),
  updatePlayerStatus: action((state, payload: PlayerStatObj) => {
    let updateName = '...'
    if (payload.action === 'remove') {
      // state.playerStatus = 
      /* LOGIC */
    }
  }),
  updateBoardStatus: action((state, payload) => {
    // let updateName = '...'
    // if (payload.action === 'remove') {
    //   state.boardStatus 
    // } 
  }),
  updateHeaderStatus: action((state, payload) => {}),
  updateWinner: action((state, payload) => {
    state.winner = payload;
  }),
};

export default statuses;