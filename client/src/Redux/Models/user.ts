import { action, Action} from 'easy-peasy';
import { SessionObj } from '../../Types';

export interface UserModel {
  userSession: SessionObj,
  setUser: Action<UserModel, SessionObj>,
}

const user: UserModel = {
  userSession: {
    id: null,
    user: null,
    player: null,
    playerValue: null,
    symbol: null,
    room: null,
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