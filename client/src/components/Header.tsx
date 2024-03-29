import React, { useEffect, useState } from 'react';
import JoinGame from './JoinGame';
import { useStoreActions, useStoreState } from '../Redux';
import {
  HeaderContainer,
  GameStatusContainer,
  ScoreBoard,
  Plist,
  Status,
  BigStatus,
  Title,
  JoinBar,
  BtnSt,
  InptSt,
} from './styles/HeaderStyles';
import { socket } from '../Socket';
import { Props } from '../Types';



const Header = (props: Props) => {
  const user = useStoreState(state => state.user.userSession.user);
  const {
    turn,
    winner,
    gameStatus,
    turnStatus,
  } = useStoreState(state => state.statuses);
  const {
    player1,
    player2,
    players
  } = useStoreState(state => state.players);
  const {
    updateTurnStatus
  } = useStoreActions(actions => actions.statuses);

  const updatePlayerList = (): string => {
    if (player1 && !player2) {
      return `Player1: ${player1.name} Player2: ...`;
    } else if (!player1 && player2) {
      return `Player1: ... Player2: ${player2.name}`;
    } else if (player1 && player2) {
      return `Player1: ${player1.name} Player2: ${player2.name}`;
    } else {
      return 'Player1: ... Player2: ...';
    }
  };

  const drawStatus = (): string => {
    let responses = ['WE HAVE A DRAWL', 'BOFF YALL LOST'];
    return responses[Math.floor(Math.random() * responses.length)]
  };

  const emitClearBoard = (): void => {
    socket.emit('clear board');
  };

  useEffect(() => {
    if (players) {
      if (!(player1 && player2)) {
        updateTurnStatus('waiting');
      } else if (gameStatus === 'inGame' && turn) {
        updateTurnStatus(turn === user);
      }
    }
  }, [gameStatus, players]);


  return (
    <HeaderContainer>
      <Title>TicTac.io</Title>

      <GameStatusContainer>

        <Plist>{updatePlayerList()}</Plist>
        {
          (gameStatus === 'preGame' || gameStatus === 'inGame')
            ?
            <Plist>{turnStatus}</Plist>
            : null}

        {
          user
            ?
            <ScoreBoard
              hidden={!gameStatus} >
            </ScoreBoard>
            :
            <JoinGame />
        }

        {
          (gameStatus !== 'hasWinner')
            ? null
            :
            <div>
              <BigStatus>{winner!.toUpperCase()} WON!</BigStatus>
              <BtnSt
                onClick={(e) => {
                  e.preventDefault();
                  emitClearBoard();
                }}>
                Reset
              </BtnSt>
            </div>
        }

        {
          (gameStatus !== 'draw')
            ? null
            :
            <div>
              <BigStatus>{drawStatus()}</BigStatus>
              <BtnSt onClick={emitClearBoard}>Reset</BtnSt>
            </div>
        }

      </GameStatusContainer>

    </HeaderContainer>
  );
};

export default Header;