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
  max-width: 800px;
  min-width: 500px;
  width: 80%;
  height: 80%;
  min-height: 300px;
  position: absolute;
  border-radius: 5px;
  top: 50%;
  margin: 0 auto;
  left: 0;
  right: 0;
  background-color: white;
  transform: translateY(-53%);
  box-shadow: 2px 7px 10px rgba(0, 0, 0, 0.5);
`;

export default Chat;
