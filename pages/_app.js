/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import wrapper from '../state/store';

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      },
    };
  };

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
