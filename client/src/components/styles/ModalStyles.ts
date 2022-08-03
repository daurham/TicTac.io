import styled from "styled-components";

export const ModalContainer = styled.div`
position: fixed;
left: 0;
top: 0;
width: 100%;
height: 100%;
z-index: 990;
`;
export const ModalOverlay = styled.div`
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
z-index: 995;
background: rgba(0,0,0,0.85);
`;
export const ModalContent = styled.div`
z-index: 999;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
max-height: 90%;
overflow: auto;
background: #fff;
box-sizing: border-box;
padding: 20px;
box-shadow: 0 1px 5px rgba(0,0,0,0.7);
border-radius: 4px;
width: 520px;
font-size: 28px;
font-weight: 200;
margin: 20px 0 40px;
text-align: center;
padding: 20px;
`;
export const ModalCloseButton = styled.button`
position: absolute;
right: 10px;
top: 10px;
cursor: pointer;
font-size: 18px;
opacity: 0.5;
background: none;
border: none;
transition: opacity 0.2s ease;
&:hover {
  opacity: 0.9;
}
`;