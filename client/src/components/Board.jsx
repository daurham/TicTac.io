import React from "react";
import styled from "styled-components";
import Quadrant from './Quadrant';

const Board = () => {

  return (
    <BoardContainer>
      {[1,2,3,4,5,6,7,8,9].map((id, index) => (
        <Quadrant key={index} id={id} />
      ))}
    </BoardContainer>
  );
};

const BoardContainer = styled.div`
  display: grid; 
  grid-template-rows:30vw 30vw 30vw;
  grid-template-columns:30vw 30vw 30vw;
`;

export default Board;