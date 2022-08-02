import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { StoreProvider } from 'easy-peasy';
import store from './Redux';
// import Context from './Context';

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'

// library.add(fas)

const app = document.getElementById('app')!;
const root = ReactDOM.createRoot(app);

type Props = StoreProvider["props"] & { children: React.ReactNode }

const StoreProviderCasted = StoreProvider as unknown as React.ComponentType<Props>

root.render(
  <StoreProviderCasted store={store}>
    <App />
  </StoreProviderCasted>
)
