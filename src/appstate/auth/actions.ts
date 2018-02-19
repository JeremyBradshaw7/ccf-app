import Api from '../../services/api';

/**
 * Authentication Actions
 * - or "action creators" in redux terminology.
 *
 * Default action creators:
 * - are functions
 * - must return an ACTION (an object with a 'type' property)
 *
 * Asynchronous action creators *via redux-thunk):
 * - are functions
 * - must return a FUNCTION (which will be called with 'dispatch' (or is there now a different way?))
 */

// This would be a standard non-asynch action creator:
// export const login = (email: string, password: string) => ({
//   type: AUTH_LOGIN,
//   payload: {
//     email,
//     password
//   }
// });

// Used as reference: https://spin.atomicobject.com/2017/07/24/redux-action-pattern-typescript/

// enumeration of all of the action type keys we wish to dispatch on in our application
export enum AuthActionTypeKeys {
  AUTH_LOGIN = 'AUTH_LOGIN', // starting login
  AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS', // login succeeded
  AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL', // login failed
  AUTH_LOGOUT = 'AUTH_LOGOUT', // logged out
  OTHER_ACTION = '__any_other_action_type__'
}

// define types for our specific actions. I think of these more as 'events'
// these add type safety to our reducers, it knows which action properties are available per type
export interface ILoginAction {
  type: AuthActionTypeKeys.AUTH_LOGIN;
  email: string;
}
export interface ILoginSuccessAction {
  type: AuthActionTypeKeys.AUTH_LOGIN_SUCCESS;
  user: string;
  token: string;
  email: string;
}
export interface ILoginFailAction {
  type: AuthActionTypeKeys.AUTH_LOGIN_FAIL;
  email: string;
  error: string;
}
export interface ILogoutAction {
  type: AuthActionTypeKeys.AUTH_LOGOUT;
}
// define an OtherAction type (which we never dispatch) that lives in our ActionTypes, so TypeScript will warn us if it’s not handled.
export interface IOtherAction {
  type: AuthActionTypeKeys.OTHER_ACTION;
}
// create a type representing all our auth actions
export type IAuthActionTypes =
    | ILoginSuccessAction
    | ILoginAction
    | ILoginFailAction
    | ILogoutAction
    | IOtherAction;

// Now our action CREATORS, I think of these more as 'actions'
// Our login will be asynchronous, via the api service layer
export const loginUser = (email: string, password: string) => {
  return dispatch => {
    dispatch({ type: AuthActionTypeKeys.AUTH_LOGIN, payload: email });
    console.log('call Api', email, password);
    Api.Login(email, password)
      .then(response => {
        console.log('ok', response);
        const data = JSON.parse(response['_bodyInit']);
        console.log('data', data);
        const token = data['id'];
        console.log('token', token);
        if (data['status'] === 'success') {
          const user = data.user;
          dispatch({
            type: AuthActionTypeKeys.AUTH_LOGIN_SUCCESS,
            payload: { user: user, token: token, email: email }
          });
        } else {
          dispatch({
            type: AuthActionTypeKeys.AUTH_LOGIN_FAIL,
            payload: { email: email, error: data['error'] }
          });
        }
      })
      .catch(err => {
        dispatch({
          type: AuthActionTypeKeys.AUTH_LOGIN_FAIL,
          payload: { email: email, error: err }
        });
        console.log('FAIL!', err);
      });
  };
};

export const logoutUser = () => ({
  type: AuthActionTypeKeys.AUTH_LOGOUT
});
