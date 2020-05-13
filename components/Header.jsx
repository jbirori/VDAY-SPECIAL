import React from 'react';
import Link from 'next/link';

export default function Header(props) {
  return (
    <div className="header">
      <Link href="/">
        <img className="logo" src="/CCCLogo.png" alt="Clap City Cinema Logo" />
      </Link>
      <style jsx>
        {`
          .header {
            display: flex;
            padding-left: 25px;
            padding-top: 25px;
            height: 80px;
            align-items: center;
          }

          .logo {
            position: relative;
            height: ${props.isMobile ? 'auto' : '100%'};
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}
