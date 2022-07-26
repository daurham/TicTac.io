import { action, Action, ActionOn, Actions } from "easy-peasy";
// import {PlayersModel} from 'players';


type boardStatusType = 'preGame' | 'inGame' | 'fullBoard' | 'hasWinner';
type headerStatusType = '' | '' | '' | null;
type turnStatusType = 'It\'s your turn' | 'Waiting on your opponent...' | null;
type gameStatusType = 'Draw' | 'hasWinner' | null;
type playerStatusType = 'Player1 ... Player2...' | string;

type PlayerStatObj = {
  action: 'remove' | 'add';
  player: 'player1' | 'player2';
  name: string;
}

export interface StatusesModel {
  turn: string | null;
  boardStatus: boardStatusType;
  turnStatus: turnStatusType;
  gameStatus: gameStatusType;
  headerStatus: headerStatusType;
  playerStatus: playerStatusType;
  updateTurn: Action<StatusesModel>;
  updateGameStatus: Action<StatusesModel>;
  updateTurnStatus: Action<StatusesModel>;
  updatePlayerStatus: Action<StatusesModel, PlayerStatObj>;
  updateHeaderStatus: Action<StatusesModel>;
};

const statuses: StatusesModel = {
  turn: null,
  boardStatus: 'preGame',
  turnStatus: null,
  gameStatus: null,
  headerStatus: null,
  playerStatus: 'Player1 ... Player2...',
  updateTurn: action((state, payload) => {}),
  updateGameStatus: action((state, payload) => {}),
  updateTurnStatus: action((state, payload) => {}),
  updatePlayerStatus: action((state, payload: PlayerStatObj) => {
    let updateName = '...'
    if (payload.action === 'remove') {
      // state.playerStatus = 
      /* LOGIC */
    }
  }),
  // updatePlayerStatus: action((state, payload) => {
  //   let updateName = '...'
  //   if (payload.action === 'remove') {
  //     state.playerStatus 
  //   }
  // }),
  updateHeaderStatus: action((state, payload) => {}),
  // updateTurn: action((state, payload) => {}),
  // updateGameStatus: action((state, payload) => {}),
  // updateTurnStatus: action((state, payload) => {}),
  // updateHeaderStatus: action((state, payload) => {}),
};

export default statuses;