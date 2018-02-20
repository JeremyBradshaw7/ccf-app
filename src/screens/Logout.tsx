import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { logoutUser } from '../appstate/auth/actions';

export interface Props {
  navigation: any;
  logoutUser: typeof logoutUser;
}
export interface State { }

class Logout extends React.Component<Props, State> {
  static navigationOptions = {
    drawerIcon: <Icon name='md-exit'/>
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // sign out via appstate
    this.props.logoutUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Logging out...</Text>
      </View>
    );
  }
}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke'
  },
  heading: {
    fontSize: 24,
    margin: 12,
    color: 'steelblue'
  }
});

const mapStateToProps = state => {
  // app state changes we are subscribing to
  console.log('state fed to login as props:', state);
  return { auth: state.auth }; // passes required app state into props of this component
};

export default connect(mapStateToProps, {
  // actions we want to call
  logoutUser
})(Logout); // connect this screen up to redux store
