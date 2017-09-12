import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { repairs, users } from './reducers';

const theInitialState = {
  repairs: [],
  users: [],
};

const storeFactory = (initialState = theInitialState) =>
  applyMiddleware(thunk)(createStore)(
    combineReducers({ repairs, users }),
    initialState);

export default storeFactory;
