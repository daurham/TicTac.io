import React from 'react';
import {
  ModalContainer,
  ModalCloseButton,
  ModalContent,
  ModalOverlay
} from './styles/ModalStyles';

type Props = {
  children: React.ReactNode;
  show: boolean;
  closeCallback: React.MouseEventHandler;
};
const Modal = ({
  show,
  children,
  closeCallback,
}: Props) => {
  return (
    <ModalContainer
      style={{ display: show ? 'block' : 'none' }}
    >
      <ModalOverlay
        onClick={closeCallback}
      />
      <ModalContent>
        {children}
        <ModalCloseButton
          type="button"
          title="Close"
          onClick={closeCallback}
        >
          x
        </ModalCloseButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;

