import {action, Action, ActionOn, actionOn} from 'easy-peasy';


type Player = {
  id: string;
  player: 'player1' | 'player2';
  name: string;
  playerValue: string;
}

interface SessionObj {
  id: string | null;
  user: string | 'Audience' | null;
  player: 'player1' | 'player2' | false | null;
}

export interface UserModel {
  userSession: SessionObj,
  setUser: Action<SessionObj, Player>
}

const user: UserModel = {
  userSession: {
    id: null,
    user: null,
    player: null,
  },
  setUser: action((state, payload: Player) => {
    if (state.id === null) {
      state.id = payload.id;
      state.user = payload.name;
      state.player = payload.player;
    }
  }),
};

export default user;