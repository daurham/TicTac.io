import React from 'react'
import { useStoreState } from '../Redux'
import { Props } from '../Types';



const Test = (props: Props) => {
  const state = useStoreState(state => state);
  const {
    chatIsHidden,
    chatMessagesSeen,
    chatMessagesTotal,
    chatMessagesUnseen,
  } = state.chat; 
  const {
    player1,
    player2,
    players,
  } = state.players; 
  const {
    gameStatus,
    boardStatus,
    headerStatus,
    playerStatus,
    turn,
    turnStatus,
    winner,
  } = state.statuses; 


  return (
    <div>
            <li>
        Msg#: {chatMessagesTotal}
      </li>
      <li>
        MsgSeen#: {chatMessagesSeen}
      </li>
      <li>
        MsgUnseen#: {chatMessagesUnseen}
      </li>
      <li>
        turn: {turn}
      </li>
      <li>
        turn Status: {turnStatus}
      </li>
      <li>
        Players#: {players ? Object.keys(players).length : null}
      </li>
      <li>
        p1#: {player1 ? player1.name : null}
      </li>
      <li>
        p2#: {player2 ? player2.name : null}
      </li>
      <li>
        player Status: {playerStatus}
      </li>
      <li>
        Game Status: {gameStatus}
      </li>
      <li>
        header Status: {headerStatus}
      </li>
      <li>
        Winner: {winner}
      </li>
    </div>
  );
};

export default Test;