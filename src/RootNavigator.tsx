import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

// See https://medium.com/the-react-native-log/building-an-authentication-flow-with-react-navigation-fb5de2203b5c

/**
 * Signed Out routes
 */
import Login from './screens/Login';
import Account from './screens/Account';

export const LoginStack = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
      title: 'Coach Competencies - Log In'
    }
  },
  Account: {
    screen: Account,
    navigationOptions: {
      title: 'Coach Competencies - Account Token'
    }
  }
  // forgottenPasswordScreen: { screen: ForgottenPasswordScreen }
});

/**
 * Signed In routes, controller via drawer navigator
 */
import CoachList from './screens/CoachList';
import SelfAssessment from './screens/SelfAssessment';
import Logout from './screens/Logout';
import { Icon } from 'native-base';

export const DrawerStack = DrawerNavigator({
  CoachList: {
    screen: CoachList,
    navigationOptions: {

    }
  },
  SelfAssessment: {
    screen: SelfAssessment,
    navigationOptions: {
    }
  },
  Logout: {
    screen: Logout
  }
});

/**
 * Root navigator, to switch between these two states
 */
export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: DrawerStack,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: LoginStack,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: 'none',
      mode: 'modal',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
};