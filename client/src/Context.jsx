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
	const [player1, setPlayer1] = useState('');
	const [player2, setPlayer2] = useState('');
	const [opponentValue, setOpponentValue] = useState();
	const [winner, foundWinner] = useState(false);
	const [fullBoard, foundFullBoard] = useState(false);


	if (!socket) {
		setSocket(openSocket('http://localhost:3000'));
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
		toggleturn();
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
      setPlayer1(playerData[0].name);
    }    
    if (!player2) {
      setPlayer2(playerData[1].name);
    }
	};


	const handleClick = (updateData) => {
		if (user) {
			if (turn === user) {
				socket.emit('move', updateData);
			}
		}
	};


	const submitPlayer = (playerName) => {
		socket.emit('addPlayer', playerName);
		setUser(playerName);
	};

	
	const toggleturn = () => {
		setTurn(() => {
			if (turn === player1) {
				return player2;
			}
			if (turn === player2) {
				return player1;
			}
		});
	};


	const wipeBoard = () => {
		for (let key in BoardLayout) {
			BoardLayout[key] = '';
		}
		socket.emit('wipe', BoardLayout);
	};


	useEffect(() => {
		makeNons();
	}, [boardData, winner]);


	const value = useMemo(() => ({
		socket,
		boardData,
		playerValue,
		nons,
		handleClick,
		updateBoard,
		updatePlayers,
		players,
		user,
		setUser,
		submitPlayer,
		setPlayerValue,
		toggleturn,
		turn,
		setTurn,
		player1,
		setPlayer1,
		player2,
		setPlayer2,
		setOpponentValue,
		opponentValue,
		winner,
		foundWinner,
		fullBoard,
		foundFullBoard,
		wipeBoard,
		setboardData
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