import React from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';

export default function Index() {
  return (
    <Layout>
      <div className="home-page">
        <Link href="/NowShowing">
          <img className="admit" src="/admit_one.png" alt="Admission Ticket" />
        </Link>
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
        `}
      </style>
    </Layout>
  );
}
