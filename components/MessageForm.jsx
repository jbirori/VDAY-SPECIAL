import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as actions from '../state/actions';

function MessageForm({ socket }) {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');

  const resetInputText = () => setInputText('');

  const onMessageChange = (e) => {
    setInputText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.sendMessage(socket, inputText));
    resetInputText();
  };

  return (
    <MessageForm.Container>
      <form onSubmit={onSubmit}>
        <MessageForm.Input onChange={onMessageChange} value={inputText} autoComplete="off" />
      </form>
    </MessageForm.Container>
  );
}

MessageForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  socket: PropTypes.any.isRequired,
};

MessageForm.Container = styled.div`
  width: 100%;
  padding: 0px 10px;
  margin-top: 10px;
  height: 50px;
  bottom: 0px;
  flex: none;
`;

MessageForm.Input = styled.input`
  border-radius: 5px;
  border: 1px #979797;
  border-style: solid;
  border-width: 1px;
  display: block;
  margin: 0;
  appearance: none;
  box-shadow: none;
  border-radius: none;
  width: 100%;
  padding-left: 5px;

  &:focus,
  textarea:focus {
    outline: none;
  }
`;

export default MessageForm;
