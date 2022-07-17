import React from "react";
import styled from "styled-components";
import { useData } from "../Context";

const Ninth = ({ ninthNum, value }) => {
  const {
    user,
    turn,
    getPlayerValue,
    handleClick,
  } = useData();

  const checkClick = (e) => {
    if (value === '') {
      handleClick({ [ninthNum]: getPlayerValue() });
    }
  }

  return (
    <NonaContainer>
      {user === turn
        ?
        <TurnButton onClick={checkClick}>
          <PlayerValueStyle>{value}</PlayerValueStyle>
        </TurnButton >
        :
        <WaitButton onClick={checkClick}>
          <PlayerValueStyle>{value}</PlayerValueStyle>
        </WaitButton >
      }
    </NonaContainer>
  );
};

export default Ninth;

const PlayerValueStyle = styled.h1`
font weight: 900;
`;

const NonaContainer = styled.div`
display: flex;
justify-content: center;
border: solid gray;
`;
const WaitButton = styled.button`
border: none;
cursor: pointer;
width: 100%;
`; 
const TurnButton = styled.button`
border: none;
cursor: pointer;
width: 100%;
&:hover,
&:focus {
  color: palevioletred;
}
&:active {
  color: red;
}
`;