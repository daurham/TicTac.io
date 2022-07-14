import React, { useEffect, useState } from "react";
import { useData } from "../Context";

export default function Feed() {
  const { socket } = useData(); 
  const [input, setInput] = useState('');
  const [feed, setFeed] = useState([]);


  socket.on('message', (text) => {
    setFeed([...feed, text]);
  });


  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleClick = (event) => {
    socket.emit('message', input);
    setInput('');
  };



  // useEffect(() => {
  //   socket.on('connect', () => {
  //     // console.log(socket.id); // Here I have access to socket.id 
  //   });

  //   socket.on('disconnect', () => {
  //   });

  //   return () => { // cleanup
  //     socket.off('connect');
  //     socket.off('disconnect');
  //   };
  // }, []);
  

  return (
    <div>
      {/* <h1>Chat App</h1> */}
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={handleClick}>Post</button>
      <ul>
        {feed.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};
