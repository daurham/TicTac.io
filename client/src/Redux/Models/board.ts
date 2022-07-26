import { Action, action } from "easy-peasy";

interface Board {
  ninth1?: string;
  ninth2?: string;
  ninth3?: string;
  ninth4?: string;
  ninth5?: string;
  ninth6?: string;
  ninth7?: string;
  ninth8?: string;
  ninth9?: string;
}

interface BoardArrayElement {
  ninth: string;
  value: string;
}

interface BoardUpdate {
  [key: string]: string
}

type BoardKeys = 'ninth1' | 'ninth2' | 'ninth3' | 'ninth4' | 'ninth5' | 'ninth6' | 'ninth7' | 'ninth8' | 'ninth9';


export interface BoardModel {
  boardLayout: Board;
  updateBoard: Action<BoardModel, Board>;
  clearBoard: Action<BoardModel>;
  // boardArray: Action<BoardModel>;
}

const board: BoardModel = {
  boardLayout: {
    ninth1: '',
    ninth2: '',
    ninth3: '',
    ninth4: '',
    ninth5: '',
    ninth6: '',
    ninth7: '',
    ninth8: '',
    ninth9: ''
  },
  updateBoard: action((state, payload: Board) => {
    // let oldBoard = state.boardLayout;
    // let newBoardData = payload;
    for (let newKey in payload) {
      for (let oldKey in state.boardLayout) {
        if (oldKey !== newKey) {
          payload[oldKey as keyof Board] = state.boardLayout[oldKey as keyof Board];
        }
      }
    }
    state.boardLayout = payload;
  }),
  clearBoard: action((state, payload) => {
    // let oldBoard = state.boardLayout;
    let newBoard: Board = {};
    for (let key in state.boardLayout) {
      newBoard[key as keyof Board] = "";
    };
    state.boardLayout = newBoard;
  }),
  // boardArray: action((state, payload): BoardArrayElement[] => {
  //   const nonsArr = Object.keys(state.boardLayout);
  // 	let result = nonsArr.map((x, index: number) => {
  // 		let elem: BoardArrayElement = { ninth: `ninth${index + 1}`, value: state.boardLayout[`ninth${index + 1}`] };
  // 		return elem;
  // 	});
};

export default board;