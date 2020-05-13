import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://clapcitycinema.herokuapp.com'
    : 'http://localhost:3000';

export default function Index({ isLive }) {
  const [ ticketHover, setTicketHover ] = useState(false);
  const toggleTicketHover = () => setTicketHover(!ticketHover);
  return (
    <Layout theme='dark'>
      <div className="home-page">
        <div className='overlay'></div>
        {!isLive && (
          <div className='body'>
          <img className="marquee" src="/marquee-title.png" alt="Lineup" />
            <img className="disabled" src="/admit_one.png" alt="Admission Ticket" />
          </div>
        )}
        {isLive && (
          <div className='body'>
            <img className="marquee" src="/marquee-title.png" alt="Lineup" />
            <Link href="/now-showing">
              <img className="admit" src="/admit_one.png" onMouseOver={toggleTicketHover} onMouseOut={toggleTicketHover} alt="Admission Ticket" />
            </Link>
          </div>
        )}
      </div>

      <style jsx>
        {`
          .home-page {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            max-height: 100vh;
          }

          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            background: ${ isLive ? '#1b1b1b' : '#ffffff' };
            opacity: .925;
            z-index: 1;
          }

          .home-page .body {
            display: flex;
            flex-direction: column;
            z-index: 1;
            width: 90%;
            align-items: center;
            position: relative;
          }

          .marquee {
            margin-bottom: 35px;
          }

          .bkg {
            position: absolute;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            z-index: -1
          }

          .admit {
            cursor: pointer;
          }

          .disabled {
            opacity: 0.3;
          }

          .admit, .disabled {
            z-index: 2;
            width: 125px;
            transform: ${ticketHover ? 'rotate(14deg)' : null};
          }

          @media only screen and (max-width: 500px) {
            .marquee {
              width: 90%;
            }
          }
        `}
      </style>
    </Layout>
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
