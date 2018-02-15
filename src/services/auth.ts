// TODO: hook into real auth via Redux eventually, this is just to persist a login state in AsyncStorage

import { AsyncStorage } from 'react-native';

export const USER_KEY = 'auth-demo-key';

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, 'true');

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    console.log('isSignedIn?');
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          console.log('isSignedIn=yes');
          resolve(true);
        } else {
          console.log('isSignedIn=no');
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};