import styled from "styled-components";


export const ChatContainer = styled.div`
display: flex;
text-align: center;
flex-direction: column;
border-top: gray solid;
max-height: 45vh;
// border-bottom: gray solid;
`;
export const FeedContainer = styled.div`
text-align: left;
margin-left: 1px;
max-height: 100px;
overflow-y: auto;
list-style-type: none;
`;