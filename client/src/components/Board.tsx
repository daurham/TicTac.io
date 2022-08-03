import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../Redux';
import Ninth from './Ninth';
import { BoardContainer } from './styles/BoardStyles';
import { checkBoardStatus } from './utils';
import { NinthTypes, BoardArrElem } from '../Types'
import Spinner from './Spinner';

type Props = {};


const Board = (props: Props) => {

  const {
    boardLayout,
    boardArray,
  } = useStoreState((state) => state.board);
  const {
    player1,
    player2,
  } = useStoreState((state) => state.players);
  const {
    updateWinner,
    updateGameStatus,
  } = useStoreActions((actions) => actions.statuses);



  useEffect(() => {
    if (player1 && player2) {
      let currBoardStatus = checkBoardStatus(boardArray, player1, player2);

      if (currBoardStatus) {

        if (currBoardStatus === 'player1') {
          updateWinner(player1.name);
          updateGameStatus('hasWinner');
        } else if (currBoardStatus === 'player2') {
          updateWinner(player2.name);
          updateGameStatus('hasWinner');
        } else if (currBoardStatus === 'full') {
          updateGameStatus('draw');
        }
      }
    }
  }, [boardLayout]);


  return boardArray.length === 0 ? <Spinner /> : (
    <BoardContainer>

      {boardArray.map((n, index) => (
        <Ninth
          key={index}
          ninthNum={n.ninth}
          value={n.value}
          symbol={n.symbol}
        />
      ))}

    </BoardContainer>
  );
};

export default Board;