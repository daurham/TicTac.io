import React, { useEffect, useCallback, useState } from 'react';
import { useData } from '../Context';
import { useStoreActions, useStoreState } from '../Redux';
import { ChatContainer, FeedContainer } from './styles/FeedStyles';

type Props = {
  hidden: Boolean;
};

interface ChatMsg {
  name: string;
  message: string;
};

const Feed = ({ hidden }: Props) => {
  const socket = useData();
  const [input, setInput] = useState('');
  const { feed } = useStoreState(state => state.chat);
  const { addToFeed, afterAddToFeed } = useStoreActions(action => action.chat);

  const populateMessages = useCallback((newMsg: ChatMsg) => {
    addToFeed(newMsg);
    afterAddToFeed();
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    socket.emit('message', input);
    setInput('');
  };

  useEffect(() => {
    socket.on('message', populateMessages);
    return () => {
      socket.off('message');
    }
  }, [feed])
  



  return hidden ? null : (
    <ChatContainer>
      <h4>Talk that shit😜</h4>

      <form>
        <input type="text" value={input} onChange={handleInput} />
        <button type="submit" onClick={handleClick}>Post</button>
        <FeedContainer style={{ "listStyleType": "none" }}>
          {feed.map((msg: ChatMsg, index) => (
            <li key={index}>{msg.name}: {msg.message}</li>
          ))}
        </FeedContainer>
      </form>

    </ChatContainer>
  );
};

export default Feed;