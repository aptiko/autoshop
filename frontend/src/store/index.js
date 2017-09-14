import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { repairs, users, loggedOnUser } from './reducers';

const theInitialState = {
  repairs: [],
  users: [],
  loggedOnUser: {
    id: 0,
    username: '',
    role: '',
  },
};

const storeFactory = (initialState = theInitialState) =>
  applyMiddleware(thunk)(createStore)(
    combineReducers({ repairs, users, loggedOnUser }),
    initialState);

export default storeFactory;
