import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import reducer from './reducers';
import initialState from './initialState';

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initStore = (state = initialState) => {
  return createStore(reducer, state, composeEnhancers(applyMiddleware(thunk)));
};

export default createWrapper(initStore, { debug: process.env.NODE_ENV !== 'production' });
