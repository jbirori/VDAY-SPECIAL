import fetch from 'isomorphic-unfetch';

const CLAPCITY_USER = 'linkywolfe';
const TWITCH_STREAMS_API = 'https://api.twitch.tv/helix/streams';
const { TWITCH_CLIENT_ID } = process.env;

export const isLive = () => {
  try {
    return fetch(`${TWITCH_STREAMS_API}?user_login=${CLAPCITY_USER}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Client-ID': TWITCH_CLIENT_ID,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log('There was an error fetching the streams', data);
          return false;
        }
        return data.data.length > 0;
      });
  } catch (err) {
    console.log('There was an error fetching the streams', err);
    return false;
  }
};

export default async (req, res) => {
  const { reqType } = req.query;
  let response;

  if (reqType === 'isLive') {
    response = await isLive();
  }

  res.status(200).json({ response });
};
