import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useData } from "../Context";

export default function Feed({ hidden }) {
  const { socket } = useData();
  const [input, setInput] = useState('');
  const [feed, setFeed] = useState([]);

  console.log('HIDDEN: ', hidden)

  socket.on('message', (text) => {
    setFeed([text, ...feed]);
  });


  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    socket.emit('message', input);
    setInput('');
  };


  return (
    <div>
      {
        hidden ?
          null
          :
          <ChatContainer>
            <h4>Talk that shit😜</h4>
            <form>
              <input type="text" value={input} onChange={handleInput} />
              <button type="submit" onClick={handleClick}>Post</button>
              <FeedContainer style={{ "listStyleType": "none" }}>
                {feed.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </FeedContainer>
            </form>
          </ChatContainer>
      }
    </div>
  );
};

const ChatContainer = styled.div`
display: flex;
text-align: center;
flex-direction: column;
border-top: gray solid;
max-height: 45vh;
// border-bottom: gray solid;
`;
const FeedContainer = styled.div`
text-align: left;
margin-left: 1px;
max-height: 100px;
overflow-y: auto;
list-style-type: none;
`;