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

const storeFactory = (initialState = theInitialState) =>
  applyMiddleware(thunk)(createStore)(
    combineReducers({ repairs, users, loggedOnUser, loginForm }),
    initialState);

export default storeFactory;
