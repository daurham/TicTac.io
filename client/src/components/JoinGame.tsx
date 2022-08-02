import React, { useState } from 'react'
import { useData } from '../Context';
import { useStoreActions, useStoreState } from '../Redux';
import { InptSt, BtnSt, JoinGameContainer } from './styles/JoinGameStyles';

type Props = {};

interface SessionObj {
  id: string | null;
  user: string | 'Audience' | null;
  player: 'player1' | 'player2' | false | null;
  playerValue: 'X' | 'O' | null;
};

const JoinGame = (props: Props) => {
  const socket = useData();
  const [input, setInput] = useState('Jini');
  const { players, player1, player2 } = useStoreState(state => state.players);
  const user = useStoreState(state => state.user.userSession.user);
  const setUser = useStoreActions(actions => actions.user.setUser);

  const nameIsValid = (name: string): boolean => {
    if (name.toLowerCase() === 'audience') {
      return false;
    }
    if (player1) {
      if (name.toLowerCase() === player1.name.toLowerCase()) {
        return false;
      }
    }
    if (player2) {
      if (name.toLowerCase() === player2.name.toLowerCase()) {
        return false;
      }
    }
    return true;
  };

  const submitPlayer = (user: string): void => {
    let player = null;
    let playerValue = null;
    let sessionObj: SessionObj = {
      id: socket.id,
      user,
      player,
      playerValue,
    };
    user = String(user);
    if (nameIsValid(user)) {
      if (!player1) {
        sessionObj.player = 'player1';
        sessionObj.playerValue = 'X';
        socket.emit('addPlayer1', user);
      } else if (!player2) {
        sessionObj.player = 'player2';
        sessionObj.playerValue = 'O';
        socket.emit('addPlayer2', user);
      }
      setUser(sessionObj);
      socket.emit('getTurn');
    } else {
      alert('Please use a different name')
    }
  };

  return user ? null : (
    <JoinGameContainer>
      <InptSt
        onClick={() => setInput('Jake')}
        onChange={(e) => setInput(e.target.value)}
        placeholder={'name'}
        value={input}
        type="text"
      />
      <BtnSt
        onClick={(e) => { e.preventDefault(); submitPlayer(input || 'Jini?') }}
        type="submit">
        Join
      </BtnSt>
    </JoinGameContainer>
  );
};

export default JoinGame;