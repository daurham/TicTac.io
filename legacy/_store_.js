// import axios from "axios";
// import { action, createStore, thunk } from "easy-peasy";
// import boardLayout from "../BoardLayout";

// const boardState = {
//   // boardLayout,
//   boardArray: [],
//   player1: null,
//   player2: null,
//   players: {
//     player1: null,
//     player2: null,
//   },
//   userSession: {
//     isLoggedIn: false,
//     user: null,
//   },
//   // turn: '',
//   // gameStatus: '',
//   // boardStatus: '',
//   // headerStatus: '',
//   // chatIsHidden: true,
//   // chatMessages: 0,
//   // chatMessagesSeen: 0,
//   // unreadMessages: 0,
//   scoreBoard: {p1Score: 0, p2Score: 0},
//   leaderBoard: {},
// }

// export const store = createStore({
//   boardState,
//   clearBoard: action((state, payload) => {
//     let oldBoard = state.boardState.boardLayout;
//     let newBoard = {};
//     for (let key in oldBoard) {
//       newBoard[key] = "";
//     };
//     state.boardState.boardLayout = newBoard;
//   }),
//   setUser: action((state, payload) => {
//     let user = state.boardState.user;
//     console.log('uaser:', payload)
//     if (!user) {
//       state.boardState.user = payload;
//       // user = payload;
//     }
//   }),
//   addPlayer: action((state, payload) => {
//     if(payload.player === 'player1'
//         &&
//       state.boardState.players.player1 === null) {
//       state.boardState.players.player1 = payload;
//     }
//     if(payload.player === 'player2'
//         &&    
//       state.boardState.players.player2 === null) {
//       state.boardState.players.player2 = payload;
//     }
//   }),
//   // handleAddingPlayer: thunk((actions, payload) => {
//   //   if(state.boardState.player === 'player1') {
//   //     payload.player = payload; 
//   //   } else if(state.boardState.player === 'player2') {
//   //     actions.addPlayer
//   //   }
//   // }),
//   removePlayer: action((state, payload) => {
//     let id = payload;
//     // let state.boardState.players = state.boardState.players;
//     console.log(state.boardState.players);
//     if (Object.keys(state.boardState.players).length === 0) return;
//     for (let currPlayer in state.boardState.players) {
//       if (state.boardState.players[currPlayer].id === id) {
//         state.boardState.players[currPlayer] = null;
//       }
//     }
//   }),
//   updatePlayers: thunk((actions, payload) => {
//     console.log('payload: ', payload)
//     if (Object.keys(payload).length === 0) return;
//     let playersObj = payload;
//     for (let currPlayer in playersObj) {
//       actions.addPlayer(playersObj[currPlayer]);
//     }
//   }),
//   updatePlayer: thunk((actions, payload) => {
//     let playersObj = payload;
//     for (let currPlayer in playersObj) {
//       actions.addPlayer(playersObj[currPlayer]);
//     }
//   }),
//   updateBoard: action((state, payload) => {
//     let oldBoard = state.boardState.boardLayout;
//     let newBoardData = payload;
//     for (let newKey in newBoardData) {
//       for (let oldKey in oldBoard) {
//         if (oldKey !== newKey) {
//           newBoardData[oldKey] = oldBoard[oldKey];
//         }
//       }
//     }
//     state.boardState.boardArray = newBoardData;
//   }),
//   updateBoardArray: action((state, payload) => {

//   }),
//   updateGameStatus: action((state, payload) => {
//     state.boardState.gameStatus = payload
//   }),
//   updateBoardStatus: action((state, payload) => {
//     state.boardState.boardStatus = payload
//   }),
//   updateHeaderStatus: action((state, payload) => {
//     state.boardState.headerStatus = payload
//   }),
//   updateTurn: action((state, payload) => {
//     state.boardState.turn = payload
//   }),
//   toggleChat: action((state, payload) => {
//     state.boardState.chatIsHidden = !state.boardState.chatIsHidden
//   }),
//   checkForNewChatMessages: action((state, payload) => {
//     if (state.boardState.chatMessagesSeen < state.boardState.chatMessages) {
//       state.boardState.unreadMessages = state.boardState.chatMessages - state.boardState.chatMessagesSeen;
//       return true;
//     }
//     return false;
//   }),
//   incrementPlayer1Score: action((state, payload) => {
//     state.boardState.scoreBoard.p1Score += 1;
//   }),
//   incrementPlayer2Score: action((state, payload) => {
//     state.boardState.scoreBoard.p2Score += 1
//   }),
//   updateLeaderBoard: action((state, payload) => {
//     state.boardState.leaderBoard = payload
//   }),
//   getLeaderBoardData: thunk(async (actions, payload) => {
//     try {
//       const { data } = await axios.get('/leaderboard');
//       actions.updateLeaderBoard(data);
//     } catch (err) {
//       console.error(err);
//     };
//   }),
// });

// // export { }