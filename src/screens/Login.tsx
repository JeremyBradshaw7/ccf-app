import React from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';

export interface Props { }
export interface State {
  email: string;
  password: string;
  touched: object;
}

export default class Login extends React.Component<Props, State> {

  private formValid: boolean = false;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      touched: {}
    };
  }

  handleSubmit() {
    console.log('handleSubmit');
    this.setState({
      touched: { ...this.state.touched, submit: true }
    });
    console.log(this.state);
    if (this.formValid) {
      console.log('login');
    }
  }

  validateForm() {
    return {
      email: this.state.email.length === 0,
      password: this.state.password.length === 0
    };
  }

  handleBlur = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  }

  render() {
    const errors = this.validateForm();
    this.formValid = !Object.keys(errors).some(x => errors[x]);
    const fieldError = (field, afterTouch = true, afterSubmit = true) => {
      const btn = 'submit';
      return errors[field] && ((!afterTouch || this.state.touched[field]) || (!afterSubmit || this.state.touched[btn]));
    };

    console.log('render', errors);
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Coach Competencies</Text>
        <TextInput
          style={[styles.textinput, fieldError('email') ? styles.error : '']}
          placeholder='email'
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={(email) => this.setState({email})}
          onBlur={this.handleBlur('email')}
          value={this.state.email}
        />
        {fieldError('email') && <Text style={styles.errorMessage}>Email must be entered</Text>}
        <TextInput
          style={[styles.textinput, fieldError('password') ? styles.error : '']}
          placeholder='password'
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
          onBlur={this.handleBlur('password')}
          value={this.state.password}
        />
        {fieldError('password') && <Text style={styles.errorMessage}>Password must be entered</Text>}
        <TouchableHighlight style={styles.button}
          underlayColor='lightsteelblue'
          onPress={this.handleSubmit.bind(this)}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>
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
  },
  textinput: {
    margin: 18,
    fontSize: 18,
    backgroundColor: '#DDDDDD',
    width: 300,
    padding: 6,
    borderWidth: 1,
    borderColor: 'steelblue',
    borderRadius: 4
  },
  error: {
    borderColor: 'red'
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    width: 300,
    marginTop: -16,
    height: 16,
    marginBottom: 0
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'steelblue',
    padding: 10,
    margin: 18,
    width: 200,
    borderRadius: 6
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
});