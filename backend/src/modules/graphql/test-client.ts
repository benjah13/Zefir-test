import ApolloClient, { InMemoryCache, PresetConfig } from 'apollo-boost';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

type TestClientConfig = {
  tcpPort?: number;
  overrideConfig?: PresetConfig;
};

export function buildTestClient(config?: TestClientConfig): ApolloClient<InMemoryCache> {
  const tcpPort = config?.tcpPort || 4242;
  return new ApolloClient({
    uri: `http://localhost:${tcpPort}/graphql`,
    fetch: fetch as any,
    cache: new InMemoryCache({ addTypename: false }),
    ...config?.overrideConfig,
  });
}

export function buildStaffTestClient(config?: TestClientConfig): ApolloClient<InMemoryCache> {
  const staffId = '6cc4c401-ffb1-4fb0-a94d-fc767204252b';
  const token = jwt.sign({ uid: staffId, type: 1 }, 'superSecret');

  return buildTestClient({
    overrideConfig: { headers: { Authorization: `Bearer ${token}` } },
    ...config?.overrideConfig,
  });
}
