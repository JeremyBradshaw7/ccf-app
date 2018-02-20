import React from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View, ActivityIndicator, Keyboard, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon, Item, Input } from 'native-base';
import { loginUser } from '../appstate/auth/actions';

export interface Props {
  auth: { loading: boolean, error: string };
  navigation: any;
  loginUser: typeof loginUser; // ensure type-safety in using this.props.loginUser
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
    Keyboard.dismiss();

    const errors: object = this.validateForm();
    const formValid: boolean = !Object.keys(errors).some(x => Object.keys(errors[x]).some(y => errors[x][y] !== ''));
    if (formValid) {
      const { email, password } = this.state;
      console.log('Log In ', email, password);
      this.props.loginUser(email, password);
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
    this.props.auth.error = ''; // anti-pattern to clear login error state on further edits
  }
  passwordChanged = (password: string) => {
    this.setState({ password });
    this.props.auth.error = ''; // anti-pattern to clear login error state on further edits
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
    const emailError: string = fieldError('email');
    const passwordError: string = fieldError('password');

    return (
      <View style={styles.container}>

        <Image style={styles.logo} source={require('../../assets/FullLogoTransparentSmall.png')} />
        <Text style={styles.heading}>Coach Competencies</Text>

        <Item regular error={!!emailError} style={styles.textitem}>
          <Icon type='FontAwesome' name='user' style={{color: 'lightsteelblue'}}/>
          <Input
            style={styles.textinput}
            placeholder='email'
            placeholderTextColor='lightgray'
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(email) => this.emailChanged(email)}
            onBlur={this.handleBlur('email')}
            value={this.state.email}
            // following 3 props for keyboard navigation, needs ref on input you are tabbing to - see:
            // https://stackoverflow.com/questions/32748718/react-native-how-to-select-the-next-textinput-after-pressing-the-next-keyboar
            blurOnSubmit={ false }
            onSubmitEditing={() => {
              this.refs['password']['wrappedInstance'].focus('password');
            }}
            returnKeyType={ 'next' }
          />
          {!!emailError && <Icon name='ios-close-circle' style={styles.cross}/>}
        </Item>
        <Text style={styles.errorMessage}>{emailError}</Text>

        <Item regular error={!!passwordError} style={styles.textitem}>
          <Icon name='ios-lock' style={{color: 'lightsteelblue'}} />
          <Input
            style={styles.textinput}
            placeholder='password'
            placeholderTextColor='lightgray'
            secureTextEntry={true}
            onChangeText={(password) => this.passwordChanged(password)}
            onBlur={this.handleBlur('password')}
            value={this.state.password}
            ref='password'
          />
          {!!passwordError && <Icon name='ios-close-circle' style={styles.cross}/>}
        </Item>
        <Text style={styles.errorMessage}>{passwordError}</Text>

        <TouchableHighlight style={styles.button}
          underlayColor='lightsteelblue'
          onPress={this.handleSubmit.bind(this)}
        >
          {this.props.auth.loading ?
            <ActivityIndicator color='white' /> : <Text style={styles.buttonText}>Log In</Text>
          }
        </TouchableHighlight>
        <Text style={styles.loginErrorMessage}>{this.props.auth.error ? 'Log In failed. Please check your credentials and try again.' : ''}</Text>
      </View>
    );
  }
}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  logo: {
    width: 300,
    height: 60,
    resizeMode: 'contain',
    marginTop: 60
  },
  heading: {
    fontSize: 24,
    marginBottom: 18,
    color: 'steelblue'
  },
  textitem: {
    width: 300,
    margin: 18,
    borderRadius: 8,
    position: 'relative',
    left: 8 // should not be necessary but seems to be
  },
  textinput: {
    fontSize: 18,
    height: 40
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    width: 300,
    marginTop: -15,
    height: 15,
    marginBottom: 0
  },
  cross: {
    color: 'red',
    fontSize: 20
  },
  loginErrorMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    width: 300,
    height: 50
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

const mapDispatchToProps = {
  loginUser
};

const mapStateToProps = state => {
  // app state changes we are subscribing to
  console.log('state fed to login as props:', state);
  return { auth: state.auth }; // passes required app state into props of this component, re-render on change
};

export default connect(mapStateToProps, mapDispatchToProps)(Login); // connect this screen up to redux store