import axios from "axios";
import React from "react";
import styled from "styled-components";

const Quadrant = ({ id }) => {
  const handleClick = () => {
    // post / send the quadrant and whether its player 1 or player 2
    console.log('Player clicked Quadrant ' + id);
  }
  return (
    <QuadContainer>
      <Button onClick={handleClick}>{id}</Button >
    </QuadContainer>
  );
};

export default Quadrant;

 const QuadContainer = styled.div`
display: flex;
justify-content: center;
border: solid gray;
`;
const Button = styled.button`
border: none;
cursor: pointer;
width: 100%;
`;