import {BoardArrElem, NinthTypes, Player} from '../Types'


const checkMatrix = (matrix: any[], possibleWins: any[], player1: Player, player2: Player) => {
  let boardStatus = null;

  let flatPossibleWinsMatrix = matrix.flat().filter(e => e.value !== '');
  if (flatPossibleWinsMatrix.length === 9) {
    boardStatus = 'full';
  }

  possibleWins.map((arr: BoardArrElem[]) => {
    let player1Plays = arr.filter(e => e.value === player1.playerValue);
    if (player1Plays.length === 3) {
      boardStatus = 'player1';
    }
    let player2Plays = arr.filter(e => e.value === player2.playerValue);
    if (player2Plays.length === 3) {
      boardStatus = 'player2';
    }
  });
  return boardStatus;
};


export const checkBoardStatus = (boardArray: BoardArrElem[], player1: Player, player2: Player) => {
  const matrix = [[...boardArray.slice(0, 3)], [...boardArray.slice(3, 6)], [...boardArray.slice(6, 9)]];
  let top = matrix[0];
  let mid = matrix[1];
  let bot = matrix[2];
  let leftCol = [top[0], mid[0], bot[0]];
  let midCol = [top[1], mid[1], bot[1]];
  let rightCol = [top[2], mid[2], bot[2]];
  let leftDiag = [top[0], mid[1], bot[2]];
  let rightDiag = [top[2], mid[1], bot[0]];
  let possibleWins = [top, mid, bot, leftCol, midCol, rightCol, leftDiag, rightDiag];
  let boardStatus = checkMatrix(matrix, possibleWins, player1, player2);
  return boardStatus;
};
