import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export interface Props {
  navigation: any;
}
export interface State { }

export default class Account extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Account Token'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Account Token</Text>
        <TextInput />
        <Button
          title='Next'
          onPress={() => this.props.navigation.navigate('Login')}
        />
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