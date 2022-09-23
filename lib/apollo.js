import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `https://13.50.16.196/graphql`,
  cache: new InMemoryCache(),
});
