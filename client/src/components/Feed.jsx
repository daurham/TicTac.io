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
  

  return (
    <div>
      {/* <h1>Chat App</h1> */}
      <input type="text" value={input} onChange={handleInput} />
      <button onClick={handleClick}>Post</button>
      <ul style={{"list-style-type": "none"}}>
        {feed.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};
