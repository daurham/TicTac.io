import React, { useState, useMemo, useEffect, useContext, createContext } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import App from '../App';
import { socket } from '../../Socket';

const contextData = createContext(/* defaultValue */);
export const useData = () => useContext(contextData);

export default function Context() {

	// const { 
	// 	boardLayout,
	// 	boardArray,
	// 	player1,
	// 	player2,
	// 	players, 
	// 	user,
	// 	turn,
	//  } = useStoreState((state) => state.boardState);
	const boardState = useStoreState((state) => state.boardState);
	
	console.log('STATE: ', boardState);

	if (!boardState) {
		return null;
	}
	// const boardLayout = useStoreState((state) => state.boardState.boardLayout);
	// const players = useStoreState((state) => state.boardState.players);
	// const user = useStoreState((state) => state.boardState.user);
	// const gameStatus = useStoreState((state) => state.boardState.gameStatus);


	const {boardLayout, players, user, turn, gameStatus} = boardState;
	const {setUser} = useStoreActions((actions) => actions);




	const emitUpdateBoardStatus = (stat) => {
		let data = stat;
		if (typeof data === 'string') {
			data = { stat: data, score: 0 };
		}
		socket.emit('updateBoardStatus', data);
	};

	const makeBoardArray = () => {
		const nonsArr = Object.keys(boardLayout);
		let result = nonsArr.map((x, index) => {
			let elem = { ninth: `ninth${index + 1}`, value: boardLayout[`ninth${index + 1}`] };
			return elem;
		});
		return result;
	};

	// const updatePlayers = (playerData, score) => {
	// console.log('playerData', playerData);
	// if (playerData) {
	//   if (score) {
	//     setPlayers(players => {
	//       const { score } = players[playerData];
	//       // score += 1;
	//       players[playerData].score = score + 1;
	//       // score++;
	//     return players;
	//     });
	//   } else if (typeof playerData === 'string') {
	//     setPlayers((oldPlayers) => {
	//       let updatedPlayers = {};
	//       for (let key in oldPlayers) {
	//         if (oldPlayers[key]) {
	//           if (oldPlayers[key].name !== playerData) {
	//             updatedPlayers[key] = oldPlayers[key];
	//           }
	//         }
	//       }
	//       return updatedPlayers;
	//     });
	//   } else { // updating player state
	//     setPlayers(() => {
	//       return playerData;
	//     });
	//   }
	// }
	// };

	// const updateTurn = (name) => {
	// console.log(`updating turn from ${turn} to ${name}`);
	// setTurn(() => name);
	// toggleTurn
	// };

	// const updateStatus = (stat) => {
		// console.log(`updating turn from ${status} to ${stat}`);
		// if (stat !== gameStatus) {
		// updateGameStatus(stat);
		// setStatus(() => stat);
		// }
	// };

	const handleClick = (updateData) => {
		if (gameStatus === 'player1' || gameStatus === 'player2') {
			return;
		}
		if (user) {
			if (turn === user) {
				if (gameStatus != 'player1' || gameStatus != 'player2') {
					socket.emit('move', updateData);
					socket.emit('toggleTurn');
				}
			}
		}
	};

	const nameIsValid = (name) => {
		if (name.toLowerCase() === 'audience') {
			return false;
		}
		if (players.player1) {
			if (name.toLowerCase() === players.player1.name.toLowerCase()) {
				return false;
			}
		}
		if (players.player2) {
			if (name.toLowerCase() === players.player2.name.toLowerCase()) {
				return false;
			}
		}
		return true;
	};

	const submitPlayer = (playerName) => {
		playerName = String(playerName);
		if (nameIsValid(playerName)) {
			if (!players.player1) {
				socket.emit('addPlayer1', playerName);
			} else if (!players.player2) {
				socket.emit('addPlayer2', playerName);
			}
			setUser(playerName);
			socket.emit('getTurn');
		} else {
			alert('Please use a different name')
		}
	};

	const getPlayerValue = () => {
		if (user && players) {
			if (players.player1) {
				if (players.player1.name === user) {
					return players.player1.playerValue;
				}
			}
			if (players.player2) {
				if (players.player2.name === user) {
					return players.player2.playerValue;
				}
			}
		}
		return 'error';
	};

	const emitClearBoard = () => {
		// const { player1, player2 } = players;
		// players()
		// console.log(win);
		// let score = 0;
		// if (win === 'player1') score = player1.score;
		// if (win === 'player2') score = player2.score;
		socket.emit('clear board');
		// updateBoardStatus({ stat: win, score });
		updateBoardStatus('');
	};

	const value = useMemo(() => ({
		socket,
		// updateBoardStatus,
		makeBoardArray,
		getPlayerValue,
		// updatePlayers,
		submitPlayer,
		handleClick,
		// updateBoard,
		emitClearBoard,
		// updateTurn,
		// updateStatus,
	}),
		[
			// boardLayout,
			// players,
			// user,
			// turn,
		]);

	// useEffect(() => console.log('LocalUEf Board rereder:'), [boardData]); // TEST


	return !boardLayout ? null : (
		<>
			<contextData.Provider value={value}>
				<App />
			</contextData.Provider>
		</>
	);
};