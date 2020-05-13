import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withUserAgent } from 'next-useragent';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://clapcitycinema.herokuapp.com'
    : 'http://localhost:3000';

function Index(props) {
  const [ ticketHover, setTicketHover ] = useState(false);
  const [width, setWidth] = useState(null);
  const { isMobile } = props.ua;
  const { isLive } = props;
  const getWidth = () => window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWidth(getWidth())
    };
    resizeListener();
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  const renderMobile = isMobile || (width !== null && width < 450);
  const toggleTicketHover = () => setTicketHover(!ticketHover);
  return (
    <Layout isMobile={renderMobile} theme='dark'>
      <div className="home-page">
        <div className='overlay'></div>
        {!isLive && (
          <div className='body'>
          <img className="marquee" src="/marquee-title.png" alt="Lineup" />
            <img className="disabled" src="/red_ticket.png" alt="Admission Ticket" />
          </div>
        )}
        {isLive && (
          <div className='body'>
            <img className="marquee" src="/marquee-title.png" alt="Lineup" />
            <Link href="/now-showing">
              <img className="admit" src="/red_ticket.png" onMouseOver={toggleTicketHover} onMouseOut={toggleTicketHover} alt="Admission Ticket" />
            </Link>
          </div>
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
            margin-top: 25px;
          }

          .showing-content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
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
            justify-content: center;
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

          .disabled {
            opacity: .4;
            display: none;
          }

          .admit, .disabled {
            z-index: 2;
            width: 125px;
            transform: ${ticketHover ? 'rotate(14deg)' : null};
          }

          @media only screen and (max-width: 500px) {
            .marquee {
              margin-top: 50px;
              width: 100%;
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

export default withUserAgent(Index)
