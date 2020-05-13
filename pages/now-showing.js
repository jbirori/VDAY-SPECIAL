import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import * as actions from '../state/actions';

const twitchUserName = 'linkywolfe';
const socketURL =
  process.env.NODE_ENV === 'production'
    ? 'https://clapcitycinema.herokuapp.com'
    : 'http://localhost:3000';
const socket = io(socketURL);

export default function NowShowing() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    socket.on('message', (data) => {
      console.log(data);
      // socket.emit('my other event', { my: 'data' });
    });
  }, []);

  const sendMessage = () => {
    const testMessage = Date.now().toString();
    dispatch(actions.sendMessage(testMessage));
  };

  return (
    <Layout theme="dark">
      <iframe
        src={`https://player.twitch.tv/?channel=${twitchUserName}&parent=${socketURL}`}
        height="80%"
        width="100%"
        frameBorder="0"
        scrolling="no"
        allowFullScreen="true"
        title="twitch stream"
      />
      <button type="button" aria-label="Test Button" onClick={sendMessage}>
        Send Test Message
      </button>
      <div>
        <h1>All Messages</h1>
        <ul>
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
