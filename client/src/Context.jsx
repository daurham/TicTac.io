import React, { useState, useMemo, useEffect, useContext, createContext } from 'react';
import openSocket from 'socket.io-client'
import App from './components/App';
import BoardLayout from './BoardLayout';

const contextData = createContext(/* defaultValue */);
export const useData = () => useContext(contextData);

export default function Context() {
	const [boardData, setboardData] = useState(BoardLayout);
	const [playerValue, setPlayerValue] = useState(1);
	const [players, setPlayers] = useState([]);
	const [socket, setSocket] = useState();
	const [nons, setNons] = useState();
	const [user, setUser] = useState();
	const [turn, setTurn] = useState('');
	const [player1, setPlayer1] = useState();
	const [player2, setPlayer2] = useState();
	const [opponentValue, setOpponentValue] = useState();
	const [isWinner, foundWinner] = useState(false);
	const [fullBoard, foundFullBoard] = useState(false);
	const [winner, setWinner] = useState(false);

	const url = 'localhost';

	if (!socket) {
		setSocket(openSocket(`http://${url}:3000`));
	}


	const updateBoard = (data) => {
		setboardData(prevBoard => {
			for (let newKey in data) {
				for (let oldKey in prevBoard) {
					if (oldKey === newKey) {
						prevBoard[oldKey] = data[newKey];
					}
				}
			}
			return prevBoard;
		});
		makeNons();
		// toggleturn();
	};


	const makeNons = () => {
		setNons(() => {
			const nonsArr = Object.keys(boardData);
			return nonsArr.map((x, index) => {
				if (x === `ninth${index + 1}`) {
					return { ninth: x, value: boardData[x] }
				}
			});
		});
	};


	const updatePlayers = (playerData) => {
		// console.log('player update data:', playerData);
		setPlayers(playerData);
		if (!player1) {
			setPlayer1(playerData.player1.name);
		}
		if (!player2 && playerData.player2) {
			setPlayer2(playerData.player2.name);
		}
	};


	const handleClick = (updateData) => {
		if (user) {
			if (turn === user) {
				if (!winner) {
					socket.emit('move', updateData);
					socket.emit('toggleTurn');
				}
			}
		}
	};

	const nameIsValid = (name) => {
		// handle audience name
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
			// Handle restricted inputs
			if (nameIsValid(playerName)) {
				if (!player1 || !players.player1) {
					socket.emit('addPlayer1', playerName);
				} else if (!player2 || !players.player2) {
					socket.emit('addPlayer2', playerName);
				}
				setUser(playerName);
				socket.emit('getTurn');
			} else {
				alert('Please use a different name')
			}
		};


		// const toggleturn = () => {
		// 	setTurn(() => {
		// 		if (turn === player1) {
		// 			return player2;
		// 		}
		// 		if (turn === player2) {
		// 			return player1;
		// 		}
		// 	});
		// };


		const wipeBoard = (win = false) => {
			// console.log(win);
			socket.emit('wipe');
			socket.emit('resetBoard', win);
		};


		useEffect(() => {
			makeNons();
		}, [boardData, winner, fullBoard]);


		const value = useMemo(() => ({
			socket,
			boardData,
			playerValue,
			nons,
			handleClick,
			updateBoard,
			updatePlayers,
			players,
			setPlayers,
			user,
			setUser,
			submitPlayer,
			setPlayerValue,
			turn,
			setTurn,
			player1,
			setPlayer1,
			player2,
			setPlayer2,
			setOpponentValue,
			opponentValue,
			winner,
			isWinner,
			foundWinner,
			fullBoard,
			foundFullBoard,
			wipeBoard,
			setboardData,
			setWinner,
		}),
			[
				boardData,
				nons,
				players,
				user,
				playerValue,
				turn,
				players,
				player1,
				player2,
				isWinner,
				winner,
				fullBoard
			]);


		return !boardData || !nons ? null : (
			<>
				<contextData.Provider value={value}>
					<App />
				</contextData.Provider>
			</>
		);
	};