/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import Store from '@store';
import { PersistGate } from 'redux-persist/integration/react';

import '@assets/css/globals.css';

function MyApp({ Component, pageProps }) {
  const { store, persistor } = Store();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
