import React from 'react';
import { createRootNavigator } from './Routes';
import { isSignedIn } from './services/auth';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux';

export interface Props { }
export interface State {
  signedIn: any;
  checkedSignIn: boolean;
}

class App extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => console.log('An error occurred', err));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this?)
    if (!checkedSignIn) {
      return null;
    }

    // create application state (store) with combined reducers, arg2 is any initial state, arg3 is for store ehnancers:
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const PrimaryNav = createRootNavigator(signedIn);

    // wrap base element with Redux Provider
    return (
      <Provider store={store}>
        <PrimaryNav />
      </Provider>
    );
  }
}

export default App;