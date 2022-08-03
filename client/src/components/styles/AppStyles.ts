import styled from "styled-components";

export const AppContainer = styled.div`
justify-content: center;
align: center;
font-family: monospace;
`;
export const GameContainer = styled.div`
display: flex;
justify-content: center;
`;
export const ChatBtn = styled.button`
&:hover,
&:focus {
  // color: palevioletred;
  cursor: pointer;
}
&:active {
  color: red;
}
// margin: 3px;
`;

export const ChatBtnNotify = styled.button`
color: palevioletred;
&:hover,
&:focus {
  color: palevioletred;
  cursor: pointer;
}
&:active {
  color: red;
}
// margin: 3px;
`;

export const WinnerOverlay = styled.div`
position: absolute;
top: 50%;
left: 50%;
font-size: 50px;
color: white;
transform: translate(-50%,-50%);
-ms-transform: translate(-50%,-50%);
`;