import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Chat from '../components/Chat';

const twitchUserName = 'linkywolfe';

export default function NowShowing(props) {
  const { isLive } = props;

  useEffect(() => {
    if (!isLive) {
      // window.location.href = '/';
    }
  });

  return isLive ? (
    <Layout theme="dark" nowShowing>
      <div className="nowShowing-body">
        <iframe
          src={`https://player.twitch.tv/?channel=${twitchUserName}`}
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
  ) : (
    <Chat />
  );
}

NowShowing.getInitialProps = async () => {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://clapcitycinema.herokuapp.com'
      : 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/twitch?reqType=isLive`).then(async (response) => {
    const reply = await response.json();
    return reply.response;
  });

  return { isLive: res };
};
