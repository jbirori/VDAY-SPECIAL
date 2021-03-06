import * as actionTypes from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const sendMessage = (socketInstance, message) => (dispatch) => {
  socketInstance.emit('message', message);

  return dispatch({
    type: actionTypes.SEND_MESSAGE,
    message,
  });
};

export const receivedMessage = (message) => (dispatch) =>
  dispatch({
    type: actionTypes.RECEIVED_MESSAGE,
    message,
  });
