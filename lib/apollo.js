import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `http://13.50.72.223/graphql`,
  cache: new InMemoryCache(),
});
