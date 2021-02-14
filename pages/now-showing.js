import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Chat from '../components/Chat';
import TwitchStream from '../components/TwitchStream';

export default function NowShowing() {
  const vDate = new Date('February 14, 2021 02:00:00 GMT-05:00');
  useEffect(() => {
    if (vDate - Date.now() > 0) {
      window.location.href = '/';
    }
  });

  return (
    <Layout theme="dark" nowShowing>
      <NowShowing.Container>
        <NowShowing.Stream>
          <TwitchStream />
        </NowShowing.Stream>
      </NowShowing.Container>
    </Layout>
  );
}

NowShowing.propTypes = {
  isLive: PropTypes.bool,
};

NowShowing.defaultProps = {
  isLive: true,
};

NowShowing.Container = styled.div`
  display: flex;
  padding: 64px;
  height: 100%;
  max-height: 600px;

  @media (max-width: 768px) {
    align-items: center;
    box-sizing: border-box;
    padding: 32px;
    max-height: 1000px;
  }
`;

NowShowing.Stream = styled.div`
  height: 100%;
  width: 100%;
`;

NowShowing.Chat = styled.div`
  flex-grow: 1;
`;
