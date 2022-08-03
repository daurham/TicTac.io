import { action, Action, ActionOn, Actions } from "easy-peasy";
import { 
  BoardStatusType,
  TurnStatusType,
  HeaderStatusType,
  GameStatusType,
  PlayerStatusType,
  PlayerStatObj,
 } from '../../Types';




export interface StatusesModel {
  turn: string | null;
  winner: string | null;
  boardStatus: BoardStatusType;
  turnStatus: TurnStatusType;
  gameStatus: GameStatusType;
  headerStatus: HeaderStatusType;
  playerStatus: PlayerStatusType;
  updateTurn: Action<StatusesModel, string>;
  updateGameStatus: Action<StatusesModel, GameStatusType>;
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
    /* LOGIC */
  }),
  updateHeaderStatus: action((state, payload) => {}),
  updateWinner: action((state, payload) => {
    state.winner = payload;
  }),
};

export default statuses;