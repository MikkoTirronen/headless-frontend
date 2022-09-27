import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `https://${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  cache: new InMemoryCache(),
});
