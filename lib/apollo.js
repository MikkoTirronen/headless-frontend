import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `https://wordpress.mikkotirronen.com/graphql`,
  cache: new InMemoryCache(),
});
