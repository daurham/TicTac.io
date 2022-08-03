import React from 'react';
import { useStoreState } from '../Redux';
import { useData } from '../Context';
import {
  PlayerValueStyle,
  NonaVerticalContainer,
  NonaHorizontalContainer,
  NonaCornerContainer,
  NonaCenterContainer,
  WaitButton,
  TurnButton,
} from './styles/NinthStyles';

type Props = {
  ninthNum: string;
  value: string;
  symbol: any;
};

interface NinthUpdateData {
  [key: string]: '' | 'X' | 'O';
};

const Ninth = ({ ninthNum, value, symbol }: Props) => {
  const socket = useData();
  const user = useStoreState(state => state.user.userSession.user);
  const turn = useStoreState(state => state.statuses.turn);
  const gameStatus = useStoreState(state => state.statuses.gameStatus);
  const playerValue = useStoreState(state => state.user.userSession.playerValue);
  const ninthVal = ninthNum.slice(-1);

  const handleClick = (updateData: NinthUpdateData) => {
    if (user) {
      if (turn === user
        && gameStatus === 'inGame'
      ) {
        socket.emit('move', updateData);
        socket.emit('toggleTurn');
      }
    }
  };


  const checkClick = (): void => {
    if (value === '') {
      handleClick({ [ninthNum]: playerValue! });
    }
  };


  return (
    <div>
      {(['2', '8'].includes(ninthVal)) ?
        <NonaVerticalContainer>
          {user === turn
            ?
            <TurnButton onClick={checkClick}>
              <PlayerValueStyle className={ninthNum}>{symbol ? symbol : value}</PlayerValueStyle>
            </TurnButton >
            :
            <WaitButton onClick={checkClick}>
              <PlayerValueStyle className={ninthNum}>{symbol ? symbol : value}</PlayerValueStyle>
            </WaitButton >
          }
        </NonaVerticalContainer>
        :
        null}
      {(['4', '6'].includes(ninthVal)) ?
        <NonaHorizontalContainer>
          {user === turn
            ?
            <TurnButton onClick={checkClick}>
              <PlayerValueStyle className={ninthNum}>{symbol ? symbol : value}</PlayerValueStyle>
            </TurnButton >
            :
            <WaitButton onClick={checkClick}>
              <PlayerValueStyle className={ninthNum}>{symbol ? symbol : value}</PlayerValueStyle>
            </WaitButton >
          }
        </NonaHorizontalContainer>
        :
        null}
      {(['1', '3', '7', '9'].includes(ninthVal)) ?
        <NonaCornerContainer>
          {user === turn
            ?
            <TurnButton onClick={checkClick}>
              <PlayerValueStyle className={ninthNum}>{symbol ? symbol : value}</PlayerValueStyle>
            </TurnButton >
            :
            <WaitButton onClick={checkClick}>
              <PlayerValueStyle className={ninthNum}>{symbol ? symbol : value}</PlayerValueStyle>
            </WaitButton >
          }
        </NonaCornerContainer>
        :
        null}
      {(['5'].includes(ninthVal)) ?
        <NonaCenterContainer>
          {user === turn
            ?
            <TurnButton onClick={checkClick}>
              <PlayerValueStyle className={ninthNum}>{symbol ? symbol : value}</PlayerValueStyle>
            </TurnButton >
            :
            <WaitButton onClick={checkClick}>
              <PlayerValueStyle className={ninthNum}>{symbol ? symbol : value}</PlayerValueStyle>
            </WaitButton >
          }
        </NonaCenterContainer>
        :
        null}
    </div>
  );
};

export default Ninth;