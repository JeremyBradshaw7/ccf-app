import React from 'react';
import { View } from 'react-native';
import PrimaryNav from './screens/PrimaryNav';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage';
import rootReducer from './appstate';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create application state (store) with combined reducers, arg2 is any initial state, arg3 is for store ehnancers:
export const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk, logger));
export const persistor = persistStore(store);

export interface Props { }
export interface State { }

class App extends React.Component<Props, State> {

  constructor(props) {
    super(props);

  }

  render() {
    // wrap base element with Redux Provider
    return (
      <Provider store={store}>
        <PersistGate loading={<View />} persistor={persistor}>
          <PrimaryNav />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;