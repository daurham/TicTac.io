import React, { useState } from 'react'
import styled from 'styled-components';
import { useData } from '../Context';

export default function JoinGame() {
  const [input, setInput] = useState('Jini');
  const { submitPlayer } = useData();
  return (
    <JoinGameContainer>
      <InptSt
        onClick={(e) => setInput('Jake')}
        onChange={(e) => setInput(e.target.value)}
        placeholder={'name'}
        value={input}
        type="text"
      />
      <BtnSt
        onClick={(e) => { e.preventDefault(); submitPlayer(input || 'Jini?') }}
        type="submit">
        Join
      </BtnSt>
    </JoinGameContainer>
  )
}
const JoinGameContainer = styled.form`
  display: flex;
  justify-content: center;
  margin: 0px;
  `;
const BtnSt = styled.button`
  // margin: 3px;
  `;
const InptSt = styled.input`
  // margin: 3px;
  `;