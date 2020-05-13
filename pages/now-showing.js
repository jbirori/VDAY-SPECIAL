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

  socket.on('message', (data) => {
    dispatch(actions.receivedMessage(data));
  });

  const sendMessage = () => {
    const testMessage = Date.now().toString();
    dispatch(actions.sendMessage(socket, testMessage));
  };

  return (
    <Layout theme="dark" nowShowing>
      <div className='nowShowing-body'>
        <iframe
          src={`https://player.twitch.tv/?channel=${twitchUserName}&parent=${socketURL}`}
          height="80%"
          width="100%"
          frameBorder="0"
          scrolling="no"
          allowFullScreen="true"
          title="Twitch stream"
        />
      </div>
      <style jsx>{`
        .nowShowing-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 15px;
          height: calc(100vh - 120px); 
        }

        iframe {
          width: 90%;
        }
      `}</style>
    </Layout>
  );
}
