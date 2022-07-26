import React, { useState, useMemo, useEffect, useContext, createContext } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import App from './components/App';
import { socket } from './Socket';

type Socket = React.ReactNode | string | null;
type React.ProviderProps


const contextData = createContext(null);
export const useData = () => useContext(contextData);


type Props = {}



// const value:Socket = socket;
useMemo(() => ({socket}),
  [socket]);

const Context: React.FC<{}> = (props: Props) => {
  return (
    <div>
      Context
      <contextData.Provider value={socket}>
        <App />
      </contextData.Provider>
    </div>
  )
}

export default Context