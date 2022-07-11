import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Ninth from './Ninth';
import { useData } from "../Context";
import checkForWins from "./utils";

const Board = () => {
  const {
    boardData,
    playerValue,
    nons,
    opponentValue,
    winner,
    foundWinner,
    player1,
    player2,
    fullBoard,
    foundFullBoard
  } = useData();


  useEffect(() => {
    let winnerFound = checkForWins(nons, playerValue, opponentValue);
    if (winnerFound) {
      if (winnerFound === playerValue) {
        foundWinner(true); 
      } else if (winnerFound === opponentValue) {
        foundWinner(true); 
      } else if (winnerFound === 'Full') {
        foundFullBoard(true);
      }
    }
  }, [boardData, nons]);


  return (
    <div>
      <BoardContainer>
        {nons.map((placement, index) => (
          <Ninth key={index} ninthNum={placement.ninth} value={placement.value} />
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