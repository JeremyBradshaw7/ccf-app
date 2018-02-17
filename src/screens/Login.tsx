import React from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../appstate/auth/actions';

export interface Props {
  auth: { loading: boolean, error: string };
  navigation: any;
  loginUser: any;
}
export interface State {
  email: string;
  password: string;
  touched: object;
}

class Login extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      touched: {}
    };
  }

  handleSubmit() {
    this.setState({
      touched: { ...this.state.touched, submit: true }
    });

    const errors: object = this.validateForm();
    const formValid: boolean = !Object.keys(errors).some(x => Object.keys(errors[x]).some(y => errors[x][y] !== ''));
    if (formValid) {
      console.log('Log In');
      const { email, password } = this.state;
      this.props.loginUser({ email, password });
    }
  }

  validateForm() {
    return {
      email: {
        'required': this.state.email.length === 0 ? 'Email is required' : ''
        // 'format': /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) ? '' : 'Email format invalid'
      },
      password: {
        'required': this.state.password.length === 0 ? 'Password is required' : ''
        // 'min': this.state.password.length < 6 ? 'Minimum password length is 6' : '', // not for me to decide but useful for illustration
        // 'max': this.state.password.length > 15 ? 'Maximum password length is 15' : ''
      }
    };
  }

  handleBlur = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  }

  emailChanged = (email: string) => {
    this.setState({ email });
    this.props.auth.error = ''; // anti-pattern
  }
  passwordChanged = (password: string) => {
    this.setState({ password });
    this.props.auth.error = ''; // anti-pattern
  }

  render() {
    // console.log('rerender with props', this.props);
    const errors = this.validateForm();
    const fieldError = (field) => {
      if (this.state.touched[field] || this.state.touched['submit']) { // only show errors once touched or submitted
        const firstError = Object.keys(errors[field]).find(x => errors[field][x] !== '');
        if (typeof firstError === 'string') {
          return errors[field][firstError];
        }
      }
      return '';
    };

    return (
      <View style={styles.container}>

        <Text style={styles.heading}>Coach Competencies</Text>
        <TextInput
          style={[styles.textinput, fieldError('email') ? styles.error : '']}
          placeholder='email'
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={(email) => this.emailChanged(email)}
          onBlur={this.handleBlur('email')}
          value={this.state.email}
        />
        <Text style={styles.errorMessage}>{fieldError('email')}</Text>
        <TextInput
          style={[styles.textinput, fieldError('password') ? styles.error : '']}
          placeholder='password'
          secureTextEntry={true}
          onChangeText={(password) => this.passwordChanged(password)}
          onBlur={this.handleBlur('password')}
          value={this.state.password}
        />
        <Text style={styles.errorMessage}>{fieldError('password')}</Text>
        <TouchableHighlight style={styles.button}
          underlayColor='lightsteelblue'
          onPress={this.handleSubmit.bind(this)}
        >
          {this.props.auth.loading ?
            <ActivityIndicator color='white' /> : <Text style={styles.buttonText}>Log In</Text>
          }
        </TouchableHighlight>
        <Text style={styles.loginErrorMessage}>{this.props.auth.error ? 'Log In failed. Please check your credentials and try again.' : '\n'}</Text>
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
  loginErrorMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    width: 300
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    margin: 18,
    width: 200,
    height: 50,
    borderRadius: 6
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  }
});

const mapStateToProps = state => {
  // app state changes we are subscribing to
  console.log('state fed to login as props:', state);
  return { auth: state.auth }; // passes required app state into props of this component, re-render on change
};

export default connect(mapStateToProps, {
  // actions we want to call
  loginUser
})(Login); // connect this screen up to redux store