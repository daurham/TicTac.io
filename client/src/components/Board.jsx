import React, { useEffect } from "react";
import styled from "styled-components";
import Ninth from './Ninth';
import { useData } from "../Context";
import { checkBoardStatus } from "./utils";

const Board = () => {
  const {
    players,
    status,
    boardData,
    makeBoardArray,
    updateBoardStatus,
    updatePlayers,
  } = useData();

  const { player1, player2 } = players;
  let boardArray = makeBoardArray();


  useEffect(() => {
    if (player1 && player2) {
      let currBoardStatus = checkBoardStatus(boardArray, player1, player2);
      // console.log('currStat On Board', currBoardStatus);
      if (currBoardStatus) {

        if (currBoardStatus === 'player1') {
          updateBoardStatus('player1');
          // updatePlayers('player1', true);
        } else if (currBoardStatus === 'player2') {
          updateBoardStatus('player2');
          // updatePlayers('player2', true);
        } else if (currBoardStatus === 'full') {
          updateBoardStatus('full');
        }
      }
    }
  });

  // console.log('board render?', boardArray); // TEST

  return !boardArray || !boardData ? null : (
    <div>
      <BoardContainer>
        {boardArray.map((placement, index) => (
            <Ninth
              key={index}
              ninthNum={placement.ninth}
              value={placement.value}
            />
        ))}
      </BoardContainer>
    </div>
  );
};

const BoardContainer = styled.div`
  display: grid;
  grid-template-rows:15vh 15vh 15vh;
  grid-template-columns:15vh 15vh 15vh;
`;

export default Board;