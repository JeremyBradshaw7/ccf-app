import React from 'react';
import { createRootNavigator } from './Routes';
import { isSignedIn } from './services/auth';

export interface Props { }
export interface State {
  signedIn: any;
  checkedSignIn: boolean;
}

export default class App extends React.Component<Props, State> {

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

    const PrimaryNav = createRootNavigator(signedIn);
    return <PrimaryNav />;
  }
}