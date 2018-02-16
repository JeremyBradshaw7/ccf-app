// export our redux reducers

import { combineReducers } from 'redux';
import AuthReducer from './auth/reducers';

// each reducer relates to a single piece of data
// so libraries might be an array of libraries, a selection reducer mught just be the selected library id (could combine)
export default combineReducers({
  // libraries: LibraryReducer,  // array of library data
  auth: AuthReducer // could be {email: 'xxx', token: 'yyy', isLoggedIn: true}
});

// console.log(store.getState());
// { auth: [] }