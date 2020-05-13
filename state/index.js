import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

const initialState = {
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  chat: chatReducer,
});

export default rootReducer;
