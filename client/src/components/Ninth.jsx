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
    <>
      {(['2', 5, 8].indexOf(ninthNum) != -1) ?
    <NonaVerticalContainer>
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
    </NonaVerticalContainer>
    :
    <NonaHorizontalContainer>
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
    </NonaHorizontalContainer>
    }
      </>
  );
};

export default Ninth;

const PlayerValueStyle = styled.h1`
font weight: 900;
`;

const NonaVerticalContainer = styled.div`
display: flex;
justify-content: center;
border-left: solid gray;
// background-color: gray;
`;
const NonaHorizontalContainer = styled.div`
display: flex;
justify-content: center;
// border-bottom: solid gray;
border-right: solid gray;
border-top: solid gray;
// background-color: gray;
`;
const WaitButton = styled.button`
border: none;
cursor: pointer;
// background-color: gray;const
width: 100%;
`; 
const TurnButton = styled.button`
background-color: gray;
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