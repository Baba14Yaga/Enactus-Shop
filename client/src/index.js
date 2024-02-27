import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux"
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import Loading from './pages/Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <PersistGate loading ={<Loading/>} persistor={persistor}>
  <React.StrictMode>
            <App />
 </React.StrictMode>
  </PersistGate>
</Provider>
);


