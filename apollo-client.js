import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STEPZEN_API_URL,
  headers: {
    Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
  },
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export default client;
