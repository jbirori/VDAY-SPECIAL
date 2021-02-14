import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import RainHearts from './RainHearts';

const themeTypes = {
  LIGHT: 'light',
  DARK: 'dark',
};

class Layout extends PureComponent {
  render() {
    const { children, theme, nowShowing } = this.props;
    return (
      <div className="page">
        <Header nowShowing={nowShowing} />
        <RainHearts />
        <div className="body">{children}</div>
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
              background-color: ${theme === themeTypes.LIGHT ? '#fff' : '#1F1F1F'};
              overflow: hidden;
            }

            .page {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              flex: 1 1 auto;
              background: center ${nowShowing ? '#1b1b1b' : 'url("/jeffrey-birori-date.png")'};
              background-size: 250px;
            }

            .body {
              height: 100%;
              flex-grow: 1;
              z-index: 1;
            }

            .header {
              z-index: 2;
            }
          `}
        </style>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
};

Layout.defaultProps = {
  theme: 'light',
};

export default Layout;
