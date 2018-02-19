import React from 'react';
import PrimaryNav from './screens/PrimaryNav';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import reducers from './appstate';

export interface Props { }
export interface State { }

class App extends React.Component<Props, State> {

  constructor(props) {
    super(props);

  }

  render() {

    // create application state (store) with combined reducers, arg2 is any initial state, arg3 is for store ehnancers:
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

    // wrap base element with Redux Provider
    return (
      <Provider store={store}>
        <PrimaryNav />
      </Provider>
    );
  }
}

export default App;