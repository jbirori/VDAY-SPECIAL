import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://clapcitycinema.herokuapp.com'
    : 'http://localhost:3000';

export default function Index({ isLive }) {
  return (
    <div className="home-page">
      <div className="home-page-image" />
      <div className="home-page-filter" />
      <img className="logo" src="/CCCLogo.png" alt="Clap City Cinema Logo" />
      <div className="showing-content">
        <img className="marquee" src="/blue_marquee.png" alt="May 13th, 8pm" />
        {isLive && (
          <Link href="/now-showing">
            <img className="admit" src="/blue_admit_one.png" alt="Admission Ticket" />
          </Link>
        )}
      </div>

      <style jsx global>
        {`
          html {
            position: relative;
          }

          html,
          body,
          #__next {
            height: 100%;
            width: 100%;
            margin: 0px !important;
          }

          .home-page {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1 1 auto;
          }

          .logo {
            max-width: 50%;
            margin-top: 60px;
          }

          .showing-content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
          }

          .showing-content img {
            margin: 30px 0;
          }

          .marquee {
            max-width: 75%;
            max-height: 30vh;
          }

          .admit {
            cursor: pointer;
            max-width: 40%;
          }

          .home-page-image {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;

            background-image: url('/CCC-bkg.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }

          .home-page-filter {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
            opacity: 0.9;
            background-color: ${isLive ? '#1B1B1B' : '#FFFFFF'};
          }
        `}
      </style>
    </div>
  );
}

Index.getInitialProps = async () => {
  const res = await fetch(`${baseUrl}/api/twitch?reqType=isLive`).then(async (response) => {
    const reply = await response.json();
    return reply.response;
  });

  return { isLive: res };
};

Index.propTypes = {
  isLive: PropTypes.bool.isRequired,
};
