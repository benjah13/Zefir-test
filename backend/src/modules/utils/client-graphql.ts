import ApolloClient, { InMemoryCache } from 'apollo-boost';
import fetch from 'node-fetch';

export function buildClient(TCP_PORT: number): ApolloClient<InMemoryCache> {
  return new ApolloClient({
    uri: `http://localhost:${TCP_PORT}/graphql`,
    fetch: fetch as any,
    cache: new InMemoryCache({ addTypename: false }),
  });
}
