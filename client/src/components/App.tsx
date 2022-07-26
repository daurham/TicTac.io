import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

const App: React.FC = () => {
  const state = useStoreState(state => state);
  const actions = useStoreActions(actions => actions);
  console.log('state?', state);
  console.log('actions?', actions);

  return (
    <div>
      TypeScript-OTW
    </div>
  );
};

export default App;