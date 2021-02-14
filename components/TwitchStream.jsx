import React from 'react';

const twitchUserName = 'j_biscotti';
const parent = process.env.NODE_ENV === 'production'
    ? 'www.lexis-vday.com'
    : 'localhost';

function TwitchStream() {
  return (
    <iframe
      src={`https://player.twitch.tv/?channel=${twitchUserName}&parent=${parent}`}
      height="100%"
      width="100%"
      frameBorder="0"
      scrolling="no"
      allowFullScreen
      title="Twitch stream"
    />
  );
}

export default TwitchStream;
