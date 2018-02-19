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

export enum ActionKey {
  AUTH_LOGIN = 'AUTH_LOGIN', // starting login
  AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS', // login succeeded
  AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL', // login failed
  AUTH_LOGOUT = 'AUTH_LOGOUT' // logged out
}

// But our login will be asynchronous, via the api service layer
export const loginUser = (email: string, password: string) => {
  return dispatch => {
    dispatch({ type: ActionKey.AUTH_LOGIN, payload: email });
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
          // status:200
          // _bodyInit:
          // "{"status":"success","id":"a1954...3c852",
          // "user":{"id":1,"name":"Innoved Administration","role":"Global Administrator",
          // "privileges":["Access","Create","Style","Update"],"access":["foundation","youth","senior","expert"]}}"
          dispatch({
            type: ActionKey.AUTH_LOGIN_SUCCESS,
            payload: { user: user, token: token, email: email }
          });
        } else {
          dispatch({
            type: ActionKey.AUTH_LOGIN_FAIL,
            payload: { email: email, error: data['error'] }
          });
        }
      })
      .catch(err => {
        dispatch({
          type: ActionKey.AUTH_LOGIN_FAIL,
          payload: { email: email, error: err }
        });
        console.log('FAIL!', err);
      });
  };
};

export const logoutUser = () => ({
  type: ActionKey.AUTH_LOGOUT
});
