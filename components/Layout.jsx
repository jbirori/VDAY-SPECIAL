import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

const themeTypes = {
  LIGHT: 'light',
  DARK: 'dark',
};

class Layout extends PureComponent {
  render() {
    const { children, theme } = this.props;
    return (
      <div className="page">
        <Header />
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
            }

            .page {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              flex: 1 1 auto;
            }

            .body {
              flex-grow: 1;
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
