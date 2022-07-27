import styled from "styled-components";


export const PlayerValueStyle = styled.h1`
font weight: 900;
`;

export const NonaVerticalContainer = styled.div`
display: flex;
justify-content: center;
border-left: solid gray;
border-right: solid gray;
`;
export const NonaHorizontalContainer = styled.div`
display: flex;
justify-content: center;
border-top: solid gray;
border-bottom: solid gray;
// border-right: solid gray;
`;
export const NonaCornerContainer = styled.div`
display: flex;
justify-content: center;
// border-top: solid gray;
// border-bottom: solid gray;
// border-right: solid gray;
`;
export const NonaCenterContainer = styled.div`
display: flex;
justify-content: center;
border-top: solid gray;
border-bottom: solid gray;
border-left: solid gray;
border-right: solid gray;
`;
export const WaitButton = styled.button`
background-color: unset;
border: none;
cursor: pointer;
width: 100%;
`;
export const TurnButton = styled.button`
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