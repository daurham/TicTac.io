import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useData } from "../Context";

const Ninth = ({ ninthNum, value }) => {
  const {socket, boardData, playerValue, getData, handleClick} = useData();

  const checkClick = (e) => {
    if (value === '') {
      handleClick({[ninthNum]: playerValue});
    }
  }

  return (
    <NonaContainer>
      <Button onClick={checkClick}><h1>{value}</h1></Button >
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