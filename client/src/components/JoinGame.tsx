import React, { useState } from 'react'
import { socket } from '../Socket';
import { useStoreActions, useStoreState } from '../Redux';
import { InptSt, BtnSt, JoinGameContainer } from './styles/JoinGameStyles';
import { SessionObj, Props } from '../Types';


const JoinGame = (props: Props) => {
  const [nameInput, setNameInput] = useState('Jini');
  const [roomInput, setRoomInput] = useState();

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
      symbol: null,
      room: null,
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
        onClick={() => setNameInput('Jake')}
        onChange={(e) => setNameInput(e.target.value)}
        placeholder={'name'}
        value={nameInput}
        type="text"
      />
      <BtnSt
        onClick={(e) => { e.preventDefault(); submitPlayer(nameInput || 'Jini?') }}
        type="submit">
        Join
      </BtnSt>
    </JoinGameContainer>
  );
};

export default JoinGame;