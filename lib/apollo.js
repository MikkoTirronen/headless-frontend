import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `https://localhost:8888/graphql`,
  cache: new InMemoryCache(),
});
