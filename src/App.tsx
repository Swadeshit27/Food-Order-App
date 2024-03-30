/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { persistedStore, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MainRouting from './route/MainRouting';


function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <MainRouting />
      </PersistGate>
    </Provider>
  );
}

export default App;
