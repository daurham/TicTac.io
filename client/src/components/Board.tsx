import React from 'react';
import { useStoreState } from '../Redux';
import Ninth from './Ninth';
import { BoardContainer } from './styles/BoardStyles';

type Props = {}
type NinthTypes = any; //'ninth1' | 'ninth2' | 'ninth3' | 'ninth4' | 'ninth5' | 'ninth6' | 'ninth7' | 'ninth8' | 'ninth9';
type BoardArrElem = {
  ninth: NinthTypes;
  value: any; //'' | 'X' | 'O';
}
type BoardArray = BoardArrElem[];

const Board = (props: Props) => {

  const boardLayout = useStoreState((state) => state.board.boardLayout);

  const makeBoardArray = ():BoardArray => {
		const nonsArr = Object.keys(boardLayout);
		let result = nonsArr.map((x, index) => {
			let elem: BoardArrElem = { ninth: `ninth${String(index + 1)}`, value: boardLayout[`ninth${index + 1}` as keyof typeof boardLayout] }; // MAY BE WRONG
			return elem;
		});
		return result;
	};
  
  return (
    <BoardContainer>
      Board
      {makeBoardArray().map((n, index) => (
        <Ninth 
          key={index}
          ninthNum={n.ninth}
          value={n.value}
        />
      ))}
    </BoardContainer>
  )
}

export default Board