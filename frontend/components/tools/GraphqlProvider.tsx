import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import fetch from 'cross-fetch';

const GraphqlProvider: FunctionComponent = (props) => {
  const { children } = props;
  const uri = process.env.BACKEND_URL || '';

  const headers: { [key: string]: string } = {};

  const client = new ApolloClient({
    link: new HttpLink({
      uri,
      headers,
      fetch,
    }),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphqlProvider;
