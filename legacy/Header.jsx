import React, { useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import styled from 'styled-components'
import { useData } from '../Context';
import JoinGame from './JoinGame';


export default function Header() {
  // const { 
  // 	boardLayout,
  // 	boardArray,
  // 	player1,
  // 	player2,
  // 	players, 
  // 	user,
  // 	turn,
  //  } 
  const {
    emitClearBoard
  } = useData();

  const {
    players,
    gameStatus,
    // boardStatus,
    // headerStatus,
    // playerStatus,
    turn,
    user,
  } = useStoreState((state) => state.boardState);

  // const {} = useStoreActions((actions) => actions);

  const [msg, setmsg] = useState('');

  //* 
  const updateGameStatus = () => {
    const { player1, player2 } = players;
    if (player1 && player2) {
      return (turn === user ?
        `Its your turn...`
        : `Waiting on opponent...`);
    } else {
      return 'Waiting for Players to join';
    }
  };

  const updatePlayerList = () => {
    // console.log(players);
    const { player1, player2 } = players;
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

  const foundWinner = () => {
    if (gameStatus === 'player1' || gameStatus === 'player2') {
      return true;
    } else {
      return false;
    }
  };

  const getWinner = () => {
    if (gameStatus === 'player1' || gameStatus === 'player2') {
      return players[gameStatus].name;
    }
  };

  const boardIsFull = () => {
    if (gameStatus === 'full') {
      return true;
    } else {
      return false;
    }
  };

  const drawStatus = () => {
    let responses = ['WE HAVE A DRAWL', 'BOFF YALL LOST'];
    return responses[Math.floor(Math.random() * responses.length)]
  };

  const getScores = () => {
    return;
    const { player1, player2 } = players;
    if (player1 && player2) {
      return `X: ${player1.score} O: ${player2.score}`;
    }
  }

  //*/



  return (
    <HeaderContainer>

      <Title>TicTac.io</Title>

      <GameStatusContainer>

        <Plist>{updatePlayerList()}</Plist>

        {user ?
          <ScoreBoard
            hidden={!gameStatus} >
            {/* {getScores()} */}
          </ScoreBoard>
          :
          <JoinGame />
        }

        {gameStatus ? null : (!msg ?
          <Status>{updateGameStatus()}</Status>
          :
          <Status>{msg}</Status>)
        }

        {(gameStatus !== 'player1' && gameStatus !== 'player2') ? null
          :
          <div><BigStatus>{getWinner().toUpperCase()} WON!</BigStatus>
            <BtnSt onClick={(e) => { e.preventDefault(); wipeBoard() }}>Reset</BtnSt>
          </div>
        }

        {(gameStatus !== 'full') ? null
          :
          <div>
            <BigStatus>{drawStatus()}</BigStatus>
            <BtnSt onClick={emitClearBoard}>Reset</BtnSt>
          </div>
        }

      </GameStatusContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`

`;

const GameStatusContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`;


const ScoreBoard = styled.div`
display: flex;
  margin: 7px;
  justify-content: center;
  `;
const Plist = styled.h5`
  display: flex;
  justify-content: center;
  margin: 3px;
  `;
const Status = styled.h4`
  display: flex;
  justify-content: center;
  margin: 3px;
  `;
const BigStatus = styled.h2`
  display: flex;
  justify-content: center;
  margin: 0px;
  `;
const Title = styled.h1`
  display: flex;
  justify-content: center;
  margin: 0px;
  `;
const JoinBar = styled.form`
  display: flex;
  justify-content: center;
  margin: 0px;
  `;
const BtnSt = styled.button`
  // margin: 3px;
  `;
const InptSt = styled.input`
  // margin: 3px;
  `;