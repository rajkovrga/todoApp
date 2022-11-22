import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import setupInterceptor from './api/axios/setupInterceptor';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
        <App />
  </Provider>
);


reportWebVitals();
