import { Action, action, thunkOn, ThunkOn} from "easy-peasy";
import { Board, BoardArrElem, BoardArray } from "../../Types";
import players from "./players";


export interface BoardModel {
  boardLayout: Board;
  boardArray: BoardArray;
  updateBoard: Action<BoardModel, Board>;
  clearBoard: Action<BoardModel>;
  makeBoardArray: Action<BoardModel>;
  updateBoardArray: ThunkOn<BoardModel>;
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
  boardArray: [
    {
      ninth: 'ninth1',
      value: '',
      symbol: null,
    },
    {
      ninth: 'ninth2',
      value: '',
      symbol: null,
    },
    {
      ninth: 'ninth3',
      value: '',
      symbol: null,
    },
    {
      ninth: 'ninth4',
      value: '',
      symbol: null,
    },
    {
      ninth: 'ninth5',
      value: '',
      symbol: null,
    },
    {
      ninth: 'ninth6',
      value: '',
      symbol: null,
    },
    {
      ninth: 'ninth7',
      value: '',
      symbol: null,
    },
    {
      ninth: 'ninth8',
      value: '',
      symbol: null,
    },
    {
      ninth: 'ninth9',
      value: '',
      symbol: null,
    },
  ],
  updateBoard: action((state, payload: Board) => {
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
    let newBoard: Board = {};
    for (let key in state.boardLayout) {
      newBoard[key as keyof Board] = "";
    };
    state.boardLayout = newBoard;
  }),
  makeBoardArray: action((state, payload): void => {
    const nonsArr = Object.keys(state.boardLayout);
    let result = nonsArr.map((x, index) => {
      let pVal = state.boardLayout[`ninth${index + 1}` as keyof typeof state.boardLayout];
      let elem: BoardArrElem = {
        ninth: `ninth${String(index + 1)}`,
        value: state.boardLayout[`ninth${index + 1}` as keyof typeof state.boardLayout],
        symbol: pVal === 'X' ? players.player1?.symbol : players.player2?.symbol,
      };
      return elem;
    });
    state.boardArray = result;
  }),
  updateBoardArray: thunkOn(
      (actions, storeActions) => [ 
      actions.clearBoard, 
      actions.updateBoard, 
    ],
    (actions, target) => {
      const [clearBoard, updateBoard] = target.resolvedTargets;
      const update = () => {
        actions.makeBoardArray();
      }
      switch (target.type) {
        case clearBoard: update();
        case updateBoard: update();
      }
    }),
};

export default board;

