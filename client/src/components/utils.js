const checkMatrix = (matrix, arrOfWins, playerV, opponentV) => {
  let hasAWin = false;

  let f = matrix.flat().filter(e => e.value !== '');
  if (f.length === 9) {
    hasAWin = 'Full';
  }

  arrOfWins.map((arr) => {
    let a = arr.filter(e => e.value === playerV);
    if (a.length === 3) {
      hasAWin = playerV;
    }    
    let o = arr.filter(e => e.value === opponentV);
    if (o.length === 3) {
      hasAWin = opponentV;
    }
  });
  return hasAWin;
};

export default function (nons, playerValue, opponentValue) {
  const matrix = [[...nons.slice(0, 3)], [...nons.slice(3, 6)], [...nons.slice(6, 9)]];
  let top = matrix[0];
  let mid = matrix[1];
  let bot = matrix[2];
  let leftCol = [top[0], mid[0], bot[0]];
  let midCol = [top[1], mid[1], bot[1]];
  let rightCol = [top[2], mid[2], bot[2]];
  let leftDiag = [top[0], mid[1], bot[2]];
  let rightDiag = [top[2], mid[1], bot[0]];
  let wins = [top, mid, bot, leftCol, midCol, rightCol, leftDiag, rightDiag];
  let hasAWin = checkMatrix(matrix, wins, playerValue, opponentValue);
  return hasAWin;
};
