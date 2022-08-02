import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from '../Redux';
import Ninth from './Ninth';
import { BoardContainer } from './styles/BoardStyles';
import {checkBoardStatus} from './utils';

type Props = {};
type NinthTypes = any; //'ninth1' | 'ninth2' | 'ninth3' | 'ninth4' | 'ninth5' | 'ninth6' | 'ninth7' | 'ninth8' | 'ninth9';
type BoardArrElem = {
  ninth: NinthTypes;
  value: any; //'' | 'X' | 'O';
};
type BoardArray = BoardArrElem[];

const Board = (props: Props) => {

  const boardLayout = useStoreState((state) => state.board.boardLayout);
  const {
    player1,
    player2,
  } = useStoreState((state) => state.players);

  const {
    updateWinner,
    updateGameStatus,
    // updateBoardStatus,
  } = useStoreActions((actions) => actions.statuses);

  const makeBoardArray = (): BoardArray => {
    const nonsArr = Object.keys(boardLayout);
    let result = nonsArr.map((x, index) => {
      let elem: BoardArrElem = {
        ninth: `ninth${String(index + 1)}`,
        value: boardLayout[`ninth${index + 1}` as keyof typeof boardLayout]
      }; // MAY BE WRONG
      return elem;
    });
    return result;
  };

  useEffect(() => {
    if (player1 && player2) {
      let currBoardStatus = checkBoardStatus(makeBoardArray(), player1, player2);
      // console.log('currStat On Board', currBoardStatus);
      if (currBoardStatus) {

        if (currBoardStatus === 'player1') {
          updateWinner(player1.name);
          // updateBoardStatus('hasWinner');
          updateGameStatus('hasWinner');
        } else if (currBoardStatus === 'player2') {
          updateWinner(player2.name);
          // updateBoardStatus('hasWinner');
          updateGameStatus('hasWinner');
        } else if (currBoardStatus === 'full') {
          // updateBoardStatus('fullBoard');
          updateGameStatus('draw');
        }
      }
    }
  },[boardLayout]);

  return (
    <BoardContainer>

      {makeBoardArray().map((n, index) => (
        <Ninth
          key={index}
          ninthNum={n.ninth}
          value={n.value}
        />
      ))}

    </BoardContainer>
  );
};

export default Board;