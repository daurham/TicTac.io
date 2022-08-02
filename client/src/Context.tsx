import React, { useContext, createContext } from 'react';
import App from './components/App';
import { socket } from './Socket';


const contextData = createContext(socket);
export const useData = () => useContext(contextData);


const Context: React.FC = () => {
  return (
    <div>
      Context
      <contextData.Provider value={socket}>
        <App />
      </contextData.Provider>
    </div>
  );
};
export default Context