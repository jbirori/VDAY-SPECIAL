import * as actionTypes from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const sendMessage = (message) => (dispatch) =>
  dispatch({
    type: actionTypes.SEND_MESSAGE,
    message,
  });
