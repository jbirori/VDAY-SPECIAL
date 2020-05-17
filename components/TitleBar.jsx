import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function TitleBar({ onlineUserCount }) {
  return (
    <TitleBar.Container>
      <TitleBar.Title>Dial Up Instant Messenger</TitleBar.Title>
      <TitleBar.Online>
        <TitleBar.OnlineCircle />
        {onlineUserCount === 1 ? 'ONLY YOU' : `${onlineUserCount} PEOPLE ON`}
      </TitleBar.Online>
    </TitleBar.Container>
  );
}

TitleBar.propTypes = {
  onlineUserCount: PropTypes.number,
};

TitleBar.defaultProps = {
  onlineUserCount: 0,
};

TitleBar.Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #ffadc6;
  border-radius: 5px 5px 0px 0px;
  height: 30px;
  color: white;
  padding: 0 10px;
`;

TitleBar.Title = styled.div`
  font-family: 'ArialRoundedMTBold';
  font-size: 16px;
  text-transform: uppercase;
`;

TitleBar.Online = styled.div`
  display: flex;
  align-items: center;
  font-family: arial;
  font-size: 10px;
`;

TitleBar.OnlineCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
  background: #7ed321;
`;

export default TitleBar;
