import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { repairs, users, loggedOnUser, loginForm, loadingUsers }
  from './reducers';
import theInitialState from '../../data/initialState.json';

const saver = store => next => (action) => {
  const result = next(action);
  localStorage['redux-store'] = JSON.stringify(store.getState());
  return result;
};

const storeFactory = (initialState = theInitialState) =>
  applyMiddleware(thunk, saver)(createStore)(
    combineReducers({ repairs, users, loggedOnUser, loginForm, loadingUsers }),
    (localStorage.getItem('redux-store')) ?
      JSON.parse(localStorage.getItem('redux-store')) : initialState);

export default storeFactory;
