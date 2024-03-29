import React from 'react';
import ReactDOM from 'react-dom';
import ThemeContext from 'api/theme';
import App from './App';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        foreground: '#000000',
        background: '#eeeeee',
      }}
    >
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
