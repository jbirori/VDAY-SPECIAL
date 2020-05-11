import React, { useEffect } from 'react';
import io from 'socket.io-client';
import Layout from '../components/Layout';

const twitchUserName = 'linkywolfe';
const socketURL =
  process.env.NODE_ENV === 'production'
    ? 'https://clapcitycinema.herokuapp.com'
    : 'http://localhost:3000';
const socket = io(socketURL);

export default function NowShowing() {
  useEffect(() => {
    socket.on('message', data => {
      console.log(data);
      // socket.emit('my other event', { my: 'data' });
    });
  }, []);

  return (
    <Layout theme='dark'>
      <iframe
        src={`https://player.twitch.tv/?channel=${twitchUserName}&parent=${socketURL}`}
        height="80%"
        width="100%"
        frameBorder="0"
        scrolling="no"
        allowFullScreen="true">
      </iframe>
    </Layout>
  );
}
