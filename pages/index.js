import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withUserAgent } from 'next-useragent';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';

function Index(props) {
  const vDate = new Date('February 14, 2021 19:00:00 GMT-05:00');
  const [ticketHover, setTicketHover] = useState(false);
  const [timeTo, setTimeTo] = useState(vDate - Date.now());

  const format2DNum = (num) => {
    return `${num < 10 ? '0' : ''}${Math.floor(num)}`
  }

  const getTimeToLabel = () => {
    let hours, minutes, seconds;
    hours = timeTo / 1000 / 60 / 60;
    minutes = (hours % 1) * 60;
    seconds = (minutes % 1) * 60;

    return `${format2DNum(hours)} : ${format2DNum(minutes)} : ${format2DNum(seconds)}`;
  }

  useEffect(() => {

    // set countdown interval
    const countdown = setInterval(() => {
      setTimeTo(_ => vDate - Date.now());;
    }, 1000);

    // clean up function
    return () => {
      // clear interval
      window.clearInterval(countdown);
    };
  }, []);

  const toggleTicketHover = () => setTicketHover(!ticketHover);
  return (
    <Layout theme="dark">
      <div className="home-page">
        <div className="overlay" />
          <div className="body">
            { timeTo > 0 && <div className="countdown">{ getTimeToLabel() }</div> }
            { timeTo <= 0 && (
              <Link href="/now-showing">
                <img
                  className="admit"
                  src="/red_ticket.png"
                  onMouseOver={toggleTicketHover}
                  onMouseOut={toggleTicketHover}
                  alt="Admission Ticket"
                />
              </Link>
            )}
          </div>
      </div>

      <style jsx global>
        {`
          html {
            font-family: 'Paytone One', serif;
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

          .countdown {
            color: #fff;
            font-size: 7.8125rem;
            transform: translateY(-50%);
          }

          @media (max-width: 768px) {
            .countdown {
              font-size: 15vw;
            }
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
            background: #1b1b1b;
            opacity: 0.75;
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
            z-index: -1;
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
            background-image: url('/jeffrey-birori-date.png');
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
            background-color: #1B1B1B;
          }

          .disabled {
            opacity: 0.4;
            display: none;
          }

          .admit,
          .disabled {
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

export default withUserAgent(Index);
