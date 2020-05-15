import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Header({ isMobile }) {
  return (
    <Header.Container>
      <Link href="/">
        <Header.Logo src="/CCCLogo.png" isMobile={isMobile} alt="Clap City Cinema Logo" />
      </Link>
    </Header.Container>
  );
}

Header.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

Header.Container = styled.div`
  display: flex;
  padding-left: 25px;
  padding-top: 25px;
  height: 80px;
  align-items: center;
`;

Header.Logo = styled.img`
  position: relative;
  height: ${(p) => (p.isMobile ? 'auto' : '100%')};
  cursor: pointer;
`;

export default Header;
