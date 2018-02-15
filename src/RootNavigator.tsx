import React from 'react';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';

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

export const SelfAssessmentTabs = TabNavigator({
  SelfAssessment1: {
    screen: SelfAssessment,
    navigationOptions: {
      title: 'SA1'
    }
  },
  SelfAssessment2: {
    screen: SelfAssessment,
    navigationOptions: {
      title: 'SA2'
    }
  },
  SelfAssessment3: {
    screen: SelfAssessment,
    navigationOptions: {
      title: 'SA3'
    }
  },
  SelfAssessment4: {
    screen: SelfAssessment,
    navigationOptions: {
      title: 'SA4'
    }
  },
  CoachList: {
    screen: CoachList
  }
});

export const DrawerStack = DrawerNavigator({
  CoachList: {
    screen: CoachList
  },
  SelfAssessment: {
    screen: SelfAssessmentTabs,
    navigationOptions: {
      title: 'Self-Assessment'
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