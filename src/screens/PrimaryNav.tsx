// Primary navigator, depends on login state
import React from 'react';
import { connect } from 'react-redux';
import { AuthStack, RootStack } from '../Routes';

export interface Props {
  isLoggedIn: boolean;
}
export interface State { }

class PrimaryNav extends React.Component<Props, State> {
  render() {
    console.log('************************** re-render primary nav');
    if (this.props.isLoggedIn) {
      return <RootStack />;
    } else {
      return <AuthStack />;
    }

  }
}

const mapStateToProps = state => {
  // app state changes we are subscribing to
  console.log('state fed to PrimaryNav as props:', state);
  return { isLoggedIn: state.auth.isLoggedIn }; // passes required app state into props of this component - only when something in this return CHANGES
};

export default connect(mapStateToProps)(PrimaryNav); // connect this screen up to redux store
