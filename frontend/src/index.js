import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST ?? window._env_.REACT_APP_BACKEND_HOST

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);