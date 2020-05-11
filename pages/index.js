import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://clapcitycinema.herokuapp.com'
    : 'http://localhost:3000';

export default function Index({ isLive }) {
  return (
    <Layout>
      <div className="home-page">
        {!isLive && <img className="disabled" src="/admit_one.png" alt="Admission Ticket" />}
        {isLive && (
          <Link href="/now-showing">
            <img className="admit" src="/admit_one.png" alt="Admission Ticket" />
          </Link>
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
          }

          .admit {
            cursor: pointer;
          }

          .disabled {
            opacity: 0.3;
          }
        `}
      </style>
    </Layout>
  );
}

Index.getInitialProps = async ctx => {
  const res = await fetch(`${baseUrl}/api/twitch?reqType=isLive`).then(async response => {
    const reply = await response.json();
    return reply.response;
  });

  return { isLive: res };
}
