// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { StoreProvider } from 'easy-peasy';
// import { store } from './Redux/store';
// // import Context from './Context';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <StoreProvider store={store}>
    {/* <Context /> */}
  </StoreProvider>
);