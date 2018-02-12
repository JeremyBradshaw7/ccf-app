import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import React from 'react';

export interface Props { }
export interface State {
  email: string;
  password: string;
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
  },
  textinput: {
    margin: 12,
    fontSize: 18,
    backgroundColor: '#DDDDDD',
    width: 300,
    padding: 6
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'steelblue',
    padding: 10,
    margin: 12,
    width: 200,
    borderRadius: 6
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  error: {
    color: 'red'
  }
});

export default class Login extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  login() {
    console.log('login');
    console.log(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Coach Competencies</Text>
        <TextInput style={styles.textinput}
          placeholder='email'
          autoCapitalize='none'
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <TextInput style={styles.textinput}
          placeholder='password'
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <Text style={styles.error}>
        </Text>
        <TouchableHighlight style={styles.button}
          underlayColor='lightsteelblue'
          onPress={this.login.bind(this)}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
