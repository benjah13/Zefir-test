import React, { ReactNode } from 'react';
import Head from 'next/head';
import GraphqlProvider from './GraphqlProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  return (
    <GraphqlProvider>
      <ToastContainer />
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col bg-background w-full min-h-screen">{children}</div>
    </GraphqlProvider>
  );
};

export default Layout;
