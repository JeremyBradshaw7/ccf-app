import React from 'react';
import { Text } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';

// See https://medium.com/the-react-native-log/building-an-authentication-flow-with-react-navigation-fb5de2203b5c

/*************************
 * Signed Out routes
 *************************/

import Login from './screens/Login';
import Account from './screens/Account';

export const AuthStack = StackNavigator({
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

/*************************
 * Assessment Tabs
 *************************/

import Assessment from './screens/Assessment';

// Some Dummy Screens for other tabs
class Sample1 extends React.Component {
  render() {
    return <Text style={{ margin: 30 }}>Sample 1</Text>;
  }
}
class Sample2 extends React.Component {
  render() {
    return <Text style={{ margin: 30 }}>Sample 2</Text>;
  }
}
class Sample3 extends React.Component {
  render() {
    return <Text style={{ margin: 30 }}>Sample 3</Text>;
  }
}
class Sample4 extends React.Component {
  render() {
    return <Text style={{ margin: 30 }}>Sample 4</Text>;
  }
}

export const SelfAssessmentTabs = TabNavigator(
  {
    SelfAssessment: {
      screen: Assessment,
      navigationOptions: {
        title: 'Assessment'
      }
    },
    Sample1: {
      screen: Sample1,
      navigationOptions: {
        title: 'Targets'
      }
    },
    Sample2: {
      screen: Sample2,
      navigationOptions: {
        title: 'Comments'
      }
    },
    Sample3: {
      screen: Sample3,
      navigationOptions: {
        title: 'Summary'
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#222222'
      },
      activeTintColor: 'orange',
      inactiveTintColor: 'lightsteelblue',
      activeBackgroundColor: '#444444',
      upperCaseLabel: false,
      showIcon: true
    },
    tabBarPosition: 'bottom', // otherwise will be top on android
    animationEnabled: true,
    swipeEnabled: true
  }
);

export const CoachAssessmentTabs = TabNavigator(
  {
    CoachAssessment: {
      screen: Assessment,
      navigationOptions: {
        title: 'Coach Assessment'
      }
    },
    Sample1: {
      screen: Sample1,
      navigationOptions: {
        title: 'Targets'
      }
    },
    Sample2: {
      screen: Sample2,
      navigationOptions: {
        title: 'Comments'
      }
    },
    Sample3: {
      screen: Sample3,
      navigationOptions: {
        title: 'Summary'
      }
    },
    Sample4: {
      screen: Sample4,
      navigationOptions: {
        title: 'Sign-Off'
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#222222'
      },
      activeTintColor: 'orange',
      inactiveTintColor: 'lightsteelblue',
      activeBackgroundColor: '#444444',
      upperCaseLabel: false,
      showIcon: true
    },
    tabBarPosition: 'bottom', // otherwise will be top on android
    animationEnabled: true,
    swipeEnabled: true
  }
);

/*************************
 * Coaches Stack
 *************************/
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

export const CoachStack = StackNavigator(
  {
    CoachList: {
      screen: CoachList,
      navigationOptions: {
        title: 'Coach List'
      }
    },
    CoachAssessmentTabs: {
      screen: CoachAssessmentTabs,
      navigationOptions: {
        title: 'Coach Assessment'
      }
    }
  },
  {
    headerMode: 'none',
    transitionConfig: getSlideFromRightTransition
  }
);

/*************************
 * Main Menu
 *************************/

import CoachList from './screens/CoachList';
import Logout from './screens/Logout';

export const RootStack = DrawerNavigator({
  CoachStack: {
    screen: CoachStack,
    navigationOptions: {
      title: 'Coach Assessment'
    }
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
