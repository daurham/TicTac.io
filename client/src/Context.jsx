import React, { useState, useMemo, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client'
import App from './components/App';

const contextData = createContext(/* defaultValue */);
export const useData = () => useContext(contextData);

export default function Context() {
	const [boardData, setboardData] = useState();
	const [playerValue, setPlayerValue] = useState(1);
	const [nons, setNons] = useState();
	let socket;

	if (!socket) {
		socket = openSocket('http://localhost:3000');
		console.log(socket.id);
	}

	
  const handleClick = (updateData) => {
    axios.patch('/api', updateData)
      .then(() => getData())
      .catch(console.error);
  };

	const getData = () => {
		axios.get('/api').then(({ data }) => {
			let filteredData = {};
			for (let key in data[0]) {
				if (key.indexOf('ninth') > -1) {
					filteredData[key] = data[0][key];
				}
			}
			setboardData(filteredData);
		}).catch(console.error);
	}; 

	useEffect(() => {
		getData();
		if(socket.id) {
			console.log('socket id: ', socket.id)
			setPlayerValue(socket.id);
		}
	}, []);
	
	useEffect(() => {
		if (boardData) {
			const nonsArr = Object.keys(boardData);
			let n = nonsArr.map((x, index) => { if(x === `ninth${index + 1}`) {return {ninth: x, value: boardData[x]}} });
			setNons(n);
		}   
	}, [boardData]);

	const value = useMemo(() => ({
		socket, boardData, playerValue, nons, getData, handleClick
	}), [boardData, nons]);

	return !boardData || !nons ? null : (
		<>
			<contextData.Provider value={value}>
				<App />
			</contextData.Provider>
		</>
	);
};