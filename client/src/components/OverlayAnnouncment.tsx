import React, { useEffect, useState } from 'react';
import { useStoreState } from '../Redux';
import { socket } from '../Socket';
import { OverlayContainer, OverlayMsg } from './styles/OverlayAnnouncementStyle';

type Props = {
  children: React.ReactNode;
}

const OverlayAnnouncment = ({ children }: Props) => {
  const winner = useStoreState(state => state.statuses.winner);

  const hideOverlay = () => {
    socket.emit('clear board');
  };

  return !winner ?
    <>
      {'hidden'}
      {children}
    </>
    :
    <OverlayContainer
      onClick={hideOverlay}
    >
      <OverlayMsg>
        {`${winner} WON!!`}
      </OverlayMsg>
      {children}
    </OverlayContainer>
}

export default OverlayAnnouncment

