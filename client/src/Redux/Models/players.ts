import { Action, action, actionOn, ActionOn, Thunk, thunk } from "easy-peasy";
import { Player, PlayersObj } from '../../Types'

export interface PlayersModel {
  player1: Player | null;
  player2: Player | null;
  players: PlayersObj | null;
  addPlayer: Action<PlayersModel, Player>;
  removePlayer: Action<PlayersModel, Player>;
  updatePlayers: Thunk<PlayersModel, PlayersObj>;
  onRemovePlayer: ActionOn<PlayersModel>;
  handlePlayerStatus?: Thunk<PlayersModel, PlayersObj>;
}

const players: PlayersModel = {
  player1: null,
  player2: null,
  players: null,
  addPlayer: action((state, payload: Player) => {
    if (state.players === null) {
      state.players = { player1: null, player2: null };
    }
    if (payload.player === 'player1') {
      state.players.player1 = payload;
      state.player1 = payload;
    }
    if (payload.player === 'player2') {
      state.players.player2 = payload;
      state.player2 = payload;
    }
  }),
  removePlayer: action((state, payload: Player) => {
    let id = payload.id;
    if (state.players !== null) {
      for (let currPlayer in state.players) {
        if (state.players[currPlayer as keyof PlayersObj] !== null) {
          if (state.players[currPlayer as keyof PlayersObj]!.id === id) {
            state.players[currPlayer as keyof PlayersObj] = null;
            state[currPlayer as keyof PlayersObj] = null;
          }
        }
      }
    }
  }),
  updatePlayers: thunk((actions, payload: PlayersObj) => {
    if (Object.keys(payload).length === 0) return;
    for (let currPlayer in payload) {
      actions.addPlayer(payload[currPlayer as keyof PlayersObj]!);
    }
  }),
  onRemovePlayer: actionOn(actions => actions.removePlayer,
    (state, target) => {
      console.log(target.payload, 'Player Removed, in players.ts')
    }),
};

export default players;