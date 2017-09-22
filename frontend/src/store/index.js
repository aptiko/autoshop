import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  repairs, users, loggedOnUser, loginForm,
  loadingUsers, loadingRepairs, errorMessage,
}
  from './reducers';
import reallyInitialState from '../../data/initialState.json';

const saver = store => next => (action) => {
  const result = next(action);
  localStorage.loggedOnUser = JSON.stringify(store.getState().loggedOnUser);
  return result;
};

const initializeState = (defaultInitialState) => {
  /* Return appropriate initial state; this is the argument passed to it,
   * unless the local storage has a logged on user, in which case the logged
   * on user is replaced in the argument.
   */
  const json = localStorage.getItem('loggedOnUser');
  const u = json ? JSON.parse(json) : false;
  return {
    ...defaultInitialState,
    loggedOnUser: u || defaultInitialState.loggedOnUser,
  };
};

const storeFactory = (defaultInitialState = reallyInitialState) =>
  applyMiddleware(thunk, saver)(createStore)(
    combineReducers({
      repairs,
      users,
      loggedOnUser,
      loginForm,
      loadingUsers,
      loadingRepairs,
      errorMessage,
    }),
    initializeState(defaultInitialState),
  );

export default storeFactory;
