import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `https://mycmsbackend.live.strattic.io/graphql`,
  cache: new InMemoryCache(),
});
