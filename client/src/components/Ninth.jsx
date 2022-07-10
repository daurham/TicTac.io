import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useData } from "../Context";

const Ninth = ({ ninthNum, value }) => {
  const {socket, boardData, playerValue, getData, handleClick} = useData();

  // handleClick({newData: {[ninthNum]: playerValue}}); 

  return (
    <NonaContainer>
      <Button onClick={() => handleClick({newData: {[ninthNum]: playerValue}})}>{value}</Button >
    </NonaContainer>
  );
};

export default Ninth;

 const NonaContainer = styled.div`
display: flex;
justify-content: center;
border: solid gray;
`;
const Button = styled.button`
border: none;
cursor: pointer;
width: 100%;
`;