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
  // console.log(ninthNum);

  return (
    <>
      {(['2', '8'].indexOf(ninthNum.slice(-1)) != -1) ?
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
        null}
      {(['4', '6'].indexOf(ninthNum.slice(-1)) != -1) ?
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
        :
        null}
      {(['1', '3', '7', '9'].indexOf(ninthNum.slice(-1)) != -1) ?
        <NonaCornerContainer>
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
        </NonaCornerContainer>
        :
        null}
      {(['5'].indexOf(ninthNum.slice(-1)) != -1) ?
        <NonaCenterContainer>
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
        </NonaCenterContainer>
        :
        null}


      {/* <NonaCenterContainer>
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
      </NonaCenterContainer> */}
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
border-right: solid gray;
`;
const NonaHorizontalContainer = styled.div`
display: flex;
justify-content: center;
border-top: solid gray;
border-bottom: solid gray;
// border-right: solid gray;
`;
const NonaCornerContainer = styled.div`
display: flex;
justify-content: center;
// border-top: solid gray;
// border-bottom: solid gray;
// border-right: solid gray;
`;
const NonaCenterContainer = styled.div`
display: flex;
justify-content: center;
border-top: solid gray;
border-bottom: solid gray;
border-left: solid gray;
border-right: solid gray;
`;
const WaitButton = styled.button`
background-color: unset;
border: none;
cursor: pointer;
width: 100%;
`;
const TurnButton = styled.button`
background-color: unset;
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