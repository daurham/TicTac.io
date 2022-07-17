import React, { useState, useMemo, useEffect, useContext, createContext } from 'react';
import App from './components/App';
import BoardLayout from './BoardLayout';
import { socket } from './Socket';

const contextData = createContext(/* defaultValue */);
export const useData = () => useContext(contextData);

export default function Context() {
	const [boardData, setboardData] = useState(BoardLayout);
	const [players, setPlayers] = useState([]);
	const [user, setUser] = useState();
	const [turn, setTurn] = useState();
	const [status, setStatus] = useState(); // fullBoard / winner state
	// const [socket, setSocket] = useState(); // import
	// const [nons, setNons] = useState();// function
	// const [playerValue, setPlayerValue] = useState('X'); // players
	// const [player1, setPlayer1] = useState(); // players
	// const [player2, setPlayer2] = useState();  // players
	// const [opponentValue, setOpponentValue] = useState(); // players
	// const [fullBoard, foundFullBoard] = useState(false);
	// const [winner, setWinner] = useState(false);




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
	};

	const updateBoardStatus = (stat) => {
		socket.emit('updateBoardStatus', stat);
	};

	const makeBoardArray = () => {
		const nonsArr = Object.keys(boardData);
		return nonsArr.map((x, index) => {
			if (x === `ninth${index + 1}`) {
				return { ninth: x, value: boardData[x] }
			}
		});
	};

	const updatePlayers = (playerData) => {
		// removing player by name
		if (playerData == null) {
			console.log('Got your ass');
		} else if (typeof playerData === 'string') { 
			setPlayers((oldPlayers) => {
				let updatedPlayers = {};
				for (let key in oldPlayers) {
					if (oldPlayers[key]) {
						if (oldPlayers[key].name !== playerData) {
							updatedPlayers[key] = oldPlayers[key];
						}
					}
				}
				return updatedPlayers;
			});
		} else { // updating player state
			setPlayers(() => {
				return playerData;
			});
		}
	};

	const handleClick = (updateData) => {
		if (status === 'player1' || status === 'player2') {
			return;
		}
		if (user) {
			if (turn === user) {
				if (status != 'player1' || status != 'player2') {
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

	const wipeBoard = (win = false) => {
		console.log(win);
		socket.emit('wipe');
		socket.emit('updateBoardStatus', win);
	};

	const value = useMemo(() => ({
		socket,
		boardData,
		setboardData,
		players,
		setPlayers,
		user,
		setUser,
		turn,
		setTurn,
		status,
		setStatus,
		updateBoardStatus,
		makeBoardArray,
		getPlayerValue,
		updatePlayers,
		submitPlayer,
		handleClick,
		updateBoard,
		wipeBoard,
		// nons,
		// playerValue,
		// player1,
		// setPlayer1,
		// player2,
		// setPlayer2,
		// setOpponentValue,
		// opponentValue,
		// winner,
		// isWinner,
		// foundWinner,
		// fullBoard,
		// foundFullBoard,
		// setWinner,
	}),
		[
			boardData,
			players,
			status,
			user,
			turn,
			// nons,
			// players,
			// playerValue,
			// player1,
			// player2,
			// isWinner,
			// winner,
			// fullBoard
		]);


	return !boardData ? null : (
		<>
			<contextData.Provider value={value}>
				<App />
			</contextData.Provider>
		</>
	);
};