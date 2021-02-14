import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Header({ nowShowing }) {
  return (
    <Header.Container nowShowing={nowShowing} >
      <Link href="/">
        <Header.Logo src="/jeffrey-birori-logo.png" alt="Jeff + Lexi Valentines Special Logo" />
      </Link>
    </Header.Container>
  );
}

Header.propTypes = {
  nowShowing: PropTypes.bool,
};

Header.Container = styled.div`
  display: flex;
  padding-left: 64px;
  padding-right: 64px;
  padding-top: ${(p) => (p.nowShowing ? '64px' : '115px')};
  height: ${(p) => (p.nowShowing ? '80px' : '175px')};
  justify-content: ${(p) => (p.nowShowing ? 'flex-start' : 'center')};
  align-items: center;

  @media (max-width: 768px) {
    height: ${(p) => (p.nowShowing ? '60px' : '80px')};
    padding-top: 32px;
    justify-content: center;
  }
`;

Header.Logo = styled.img`
  position: relative;
  height: 100%;
  cursor: pointer;
  z-index: 3;

  @media (max-width: 768px) {
    height: auto;
    max-height: 100%;
    max-width: 95%;
  }
`;

export default Header;
