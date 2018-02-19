// Authorisation reducers
// Keep stuff to do with authentication at application state level

import { AuthActionTypeKeys, IAuthActionTypes } from './actions';

// what data do we need to persist in our application state to do with authentication?
const INITIAL_STATE = {
  email: '',          // email authenticated with
  isLoggedIn: false,  // whether logged in
  token: '',          // token if logged in
  loading: false,     // if authenticating (do we really need this at app level?)
  error: '',          // error on failure
  user: {}            // whatever is returned by authentication
};

// what actions from our dumb front end do we want to react to?
// dont include every email, password text change unless we want to use redux-form for form validation (may do later, but it's not advised
// We are firing these events back to the forms subscribed to this reducer(?)
export default (state = INITIAL_STATE, action: IAuthActionTypes) => {
  switch (action.type) {
    case AuthActionTypeKeys.AUTH_LOGIN: // on log in submitted
      return {
        ...state,
        email: action.email,
        isLoggedIn: false,
        loading: true,
        error: '',
        token: ''
      };
    case AuthActionTypeKeys.AUTH_LOGIN_SUCCESS: // on completing log in
      return {
        ...state,
        email: action.email, isLoggedIn: true, loading: false,
        error: '',
        token: action.token,
        user: action.user
      };
    case AuthActionTypeKeys.AUTH_LOGIN_FAIL: // on failing to log in
      return {
        ...state,
        email: action.email,
        isLoggedIn: false,
        loading: false,
        error: action.error,
        token: ''
      };
    case AuthActionTypeKeys.AUTH_LOGOUT: // on logging out, revert to initial state
      return { ...state, ...INITIAL_STATE};
    default:
      return state;
  }
};