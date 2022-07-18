import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useData } from "../Context";
import Board from "./Board";
import Feed from "./Feed";
// import BoardLayout from './../BoardLayout';

export default function App() {

  const {
    socket,
    boardData,
    players,
    user,
    turn,
    setTurn,
    status,
    setStatus,
    updatePlayers,
    updateBoard,
    submitPlayer,
    wipeBoard,
    updateBoardStatus,
    getPlayerValue,
    updateTurn,
    updateStatus,
  } = useData();

  const [input, setInput] = useState('Jini');
  const [hideChat, toggleChat] = useState(false);
  const [msg, setmsg] = useState();
  const [round, setRound] = useState([]);
  // const [gotWinner, setGotWinner] = useState(false);
  // let gotWinner;

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
    if (status === 'player1' || status === 'player2') {
      return true;
    } else {
      return false;
    }
  };

  const getWinner = () => {
    if (status === 'player1' || status === 'player2') {
      return players[status].name;
    }
  };

  const boardIsFull = () => {
    if (status === 'full') {
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



  const moveFn = (data) => {
    updateBoard(data);
  };

  const getTurnFn = (name) => {
    // console.log('getTurn Recieved ->', name);
    if (turn !== name) {
      updateTurn(name);
    }
  };

  const toggleTurnFn = (name) => {
    // console.log('toggleTurn Recieved ->', name);
    updateTurn(name);
  };

  const addPlayer1Fn = useCallback((players) => {
    const { player1 } = players;
    if (player1) {
      updatePlayers(players);
    }
  }, [players])

  const addPlayer2Fn = useCallback((players) => {
    const { player2 } = players;
    if (player2) {
      updatePlayers(players);
    }
  }, [players])

  // const announcerFn = (msg) => {
  //   setmsg(msg);
  //   setTimeout(function () {
  //     setmsg(updateGameStatus());
  //   }, 2000);
  // };

  const wipeFn = () => {
    updateBoard({
      ninth1: "",
      ninth2: "",
      ninth3: "",
      ninth4: "",
      ninth5: "",
      ninth6: "",
      ninth7: "",
      ninth8: "",
      ninth9: ""
    }, true);
  };

  const updateBoardStatusFn = (stat) => {
    // console.log('status updater: ', stat);
    updateStatus(stat);
  };

  const connectFn = useCallback(() => {
    socket.emit('getInitClients');
    socket.emit('getTurn');
  }, []);

  const getInitClientsFn = useCallback((players) => {
    updatePlayers(players);
  }, []);

  const disconnectFn = () => {
  };

  const disconnectPlayerFn = (playerName) => {
    updatePlayers(playerName);
  };

  useEffect(() => {

    socket.on('move', moveFn);

    socket.on('getTurn', getTurnFn);

    socket.on('toggleTurn', toggleTurnFn);

    socket.on('addPlayer1', addPlayer1Fn);

    socket.on('addPlayer2', addPlayer2Fn);

    // socket.on('announcer', announcerFn);

    socket.on('wipe', wipeFn);

    socket.on('updateBoardStatus', updateBoardStatusFn);

    socket.on('getInitClients', getInitClientsFn);

    socket.on('connect', connectFn);

    socket.on('disconnect', disconnectFn);

    socket.on('disconnectPlayer', disconnectPlayerFn);


    return () => {
      socket.off('move');
      socket.off('getTurn');
      socket.off('toggleTurn');
      socket.off('addPlayer1');
      socket.off('addPlayer2');
      // socket.off('announcer');
      socket.off('wipe');
      socket.off('updateBoardStatus');
      socket.off('connect');
      socket.off('getInitClients');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('disconnectPlayer');
    }
  }, [
    boardData,
    status,
    players,
    turn,
    user,
    hideChat,
  ]);

  // useEffect(() => {
  //   // if (foundWinner() && !gotWinner) {
  //     // gotWinner = getWinner();

  //     // setGotWinner(val => !val);
  //   // }
  //   console.log('uE Status change!- val: ', status);
  // }, [status, boardData]);

  // useEffect(() => console.log('useEffectrerenderingggBD, Chat: ',), [boardData, hideChat]); // TEST
  // useEffect(() => console.log('uE Status change!: ', status), [status]); // TEST
  // useEffect(() => console.log('uE listening HORD: ')); // TEST

  return (
    <AppContainer>
      {/* {console.log('rerender')/* TEST */}

      <Title>TicTac.io</Title>

      <GameStatusContainer>

        <Plist>{updatePlayerList()}</Plist>

        {user ?
          <ScoreBoard
            hidden={!status} >
            {/* {getScores()} */}
          </ScoreBoard>
          :
          <JoinBar>
            <InptSt
              onClick={(e) => setInput('Jake')}
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
          </JoinBar>
        }

        {status ? null : (!msg ?
          <Status>{updateGameStatus()}</Status>
          :
          <Status>{msg}</Status>)
        }

        {(status !== 'player1' && status !== 'player2') ? null
          :
          <div><BigStatus>{getWinner().toUpperCase()} WON!</BigStatus>
            <BtnSt onClick={(e) => { e.preventDefault(); wipeBoard() }}>Reset</BtnSt>
          </div>
        }

        {(status !== 'full') ? null
          :
          <div>
            <BigStatus>{drawStatus()}</BigStatus>
            <BtnSt onClick={wipeBoard}>Reset</BtnSt>
          </div>
        }

      </GameStatusContainer>

      <GameContainer>
        <Board />
        <Feed hidden={hideChat} />
        <ChatBtn onClick={() => toggleChat(show => !show)} >{!hideChat ? ">" : "<"}</ChatBtn>
      </GameContainer>

    </AppContainer>
  );
};

const AppContainer = styled.div`
justify-content: center;
align: center;
`;
const GameContainer = styled.div`
display: flex;
justify-content: center;
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
const ChatBtn = styled.button`
  // margin: 3px;
  `;
const InptSt = styled.input`
  // margin: 3px;
`;