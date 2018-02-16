import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { onSignOut } from '../services/auth';
import { Icon } from 'native-base';

export interface Props {
  navigation: any;
}
export interface State { }

export default class Logout extends React.Component<Props, State> {
  static navigationOptions = {
    drawerIcon: <Icon name='md-exit'/>
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    onSignOut().then(() => this.props.navigation.navigate('SignedOut'));
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