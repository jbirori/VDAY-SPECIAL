import React from 'react';

const twitchUserName = 'linkywolfe';

function TwitchStream() {
  return (
    <iframe
      src={`https://player.twitch.tv/?channel=${twitchUserName}`}
      height="100%"
      width="100%"
      frameBorder="0"
      scrolling="no"
      allowFullScreen="true"
      title="Twitch stream"
    />
  );
}

export default TwitchStream;
