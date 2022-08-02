import { action, Action, ActionOn, actionOn } from 'easy-peasy';


type Player = {
  id: string;
  name: string;
  player: 'player1' | 'player2';
  playerValue:  'X' | 'O' ;
}

interface SessionObj {
  id: string | null;
  user: string | 'Audience' | null;
  player: 'player1' | 'player2' | false | null;
  playerValue: 'X' | 'O' | null;
}

export interface UserModel {
  userSession: SessionObj,
  setUser: Action<UserModel, SessionObj>,
  // getPlayerValue?: Action<UserModel>,
}

const user: UserModel = {
  userSession: {
    id: null,
    user: null,
    player: null,
    playerValue: null,
  },
  setUser: action((state, payload: SessionObj): void => {
    if (state.userSession.id === null) {
      state.userSession.id = payload.id;
      state.userSession.user = payload.user;
      state.userSession.player = payload.player;
      state.userSession.playerValue = payload.playerValue;
    }
  }),
};

export default user;