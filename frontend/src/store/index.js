import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { repairs, users, loggedOnUser, loginForm } from './reducers';

const theInitialState = {
  repairs: [],
  users: [],
  loggedOnUser: {
    id: 0,
    username: '',
    role: '',
  },
  loginForm: {
    username: '',
    password: '',
    error: false,
  },
};

const saver = store => next => (action) => {
  const result = next(action);
  localStorage['redux-store'] = JSON.stringify(store.getState());
  return result;
};

const storeFactory = (initialState = theInitialState) =>
  applyMiddleware(thunk, saver)(createStore)(
    combineReducers({ repairs, users, loggedOnUser, loginForm }),
    (localStorage['redux-store']) ?
      JSON.parse(localStorage['redux-store']) : initialState);

export default storeFactory;
