import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, split} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';


const AppWrapper = ({ children }) => {

  const wsLink = new WebSocketLink({
      uri: 'wss://api.streamblitz.com/graphql',
      options: {
        reconnect: true
      }
    });

  const httpLink = new HttpLink({
    uri: 'https://api.streamblitz.com/graphql'
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.streamblitz.com/graphql",
    link: splitLink,
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export default AppWrapper;
