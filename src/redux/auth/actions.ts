import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL, AUTH_LOGOUT } from './actionTypes';
import Api from '../../services/api';

/**
 * Authentication Events
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

// But our login will be asynchronous, via the api service layer
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: AUTH_LOGIN, payload: email });
    console.log('call Api');
    Api.Login(email, password).then(response => {
      console.log('success!', response);
      const data = JSON.parse(response['_bodyInit']);
      console.log('data', data);
      const token = data['id'];
      console.log('token', token);
      if (data['status'] === 'success') {
        const user = data.user;
        // status:200
        // _bodyInit:
        // "{"status":"success","id":"a1954...3c852",
        // "user":{"id":1,"name":"Innoved Administration","role":"Global Administrator",
        // "privileges":["Access","Create","Style","Update"],"access":["foundation","youth","senior","expert"]}}"
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: {user: user, token: token, email: email }});
      } else {
        dispatch({ type: AUTH_LOGIN_FAIL, payload: data['status'] });
      }
    }).catch(err => {
      dispatch({ type: AUTH_LOGIN_FAIL, payload: err });
      console.log('FAIL!', err);
    });
  };
};

export const logoutUser = () => ({
  type: AUTH_LOGOUT
});
