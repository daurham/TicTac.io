import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Ninth from './Ninth';
import { useData } from "../Context";

const Board = () => {
  const {boardData, playerValue, nons} = useData();
  const [win, foundWin] = useState(false);
  console.log(nons)

  const checkForWins = (nons, playerValue) => {
    const matrix = [[...nons.slice(0, 3)], [...nons.slice(3, 6)], [...nons.slice(6, 9)]];
    // console.log('nons:', nons);
    console.log(matrix);
    let top = matrix[0];
    let mid = matrix[1];
    let bot = matrix[2];
    let leftCol = [top[0], mid[0], bot[0]];
    let midCol = [top[1], mid[1], bot[1]];
    let rightCol = [top[2], mid[2], bot[2]];
    let leftDiag = [top[0], mid[1], bot[2]];
    let rightDiag = [top[2], mid[1], bot[0]];
    let wins = [top, mid, bot, leftCol, midCol, rightCol, leftDiag, rightDiag];
    let hasAWin = checkMatrix(wins, playerValue);
    return hasAWin;
    // if (matrix[0])

    // for(let i = 0; i < matrix[0].length; i++) {
    //   for(let j = 0; j < matrix[1].length; j++) {
    //     for(let y = 0; y < matrix[2].length; y++) {
    //       let top = matrix[0][i].value;
    //       let mid = matrix[1][j].value;
    //       let bot = matrix[2][y].value;
    //       // console.log(top === playerValue && mid === playerValue && bot === playerValue);
    //       if(top === playerValue && mid === playerValue && bot === playerValue) console.log('Found A Winner!!');
    //     }
    //   }
    // }
  };
  
  const checkMatrix = (arrOfWins, playerV) => {
    let hasAWin = false;
    arrOfWins.map((arr) => {
      let a = arr.filter(e => e.value === playerV);
      if (a.length === 3) {
        hasAWin = true;
      }
    });
    return hasAWin;
  };

  
  useEffect(() => {
    let w = checkForWins(nons, playerValue);
    if (w) {
      console.log('board render')
      foundWin(true);
    }
    // console.log('board render')
    
  }, [boardData, nons]);
  
  useEffect(() => {
  }, [win]);
    
  return (
    <div>
      {!win ? null : <h1>WE HAVE A WINNER!</h1>}
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
  grid-template-rows:25vh 25vh 25vh;
  grid-template-columns:25vh 25vh 25vh;
`;

export default Board;