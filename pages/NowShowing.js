import React, { useEffect } from 'react';
import io from 'socket.io-client';
import Layout from '../components/Layout';

const socket = io('http://localhost:3000');

export default function NowShowing() {
  useEffect(() => {
    socket.on('message', data => {
      console.log(data);
      // socket.emit('my other event', { my: 'data' });
    });
  }, []);

  return <Layout>Now showing page</Layout>;
}
