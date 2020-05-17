import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import TitleBar from './TitleBar';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import * as actions from '../state/actions';

const socketURL =
  process.env.NODE_ENV === 'production'
    ? 'https://clapcitycinema.herokuapp.com'
    : 'http://localhost:3000';
const socket = io(socketURL);

function Chat() {
  const dispatch = useDispatch();
  socket.on('message', (data) => {
    dispatch(actions.receivedMessage(data));
  });

  return (
    <Chat.Container>
      <TitleBar />
      <MessageList />
      <MessageForm socket={socket} />
    </Chat.Container>
  );
}

Chat.Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: white;
  box-shadow: 2px 7px 10px rgba(0, 0, 0, 0.5);
  height: 100%;
`;

export default Chat;
