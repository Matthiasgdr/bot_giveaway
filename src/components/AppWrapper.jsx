import React from 'react'
import styled from 'styled-components'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, split} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const Font = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Readex+Pro&display=swap');
`

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
    <Font>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </Font>
  );
};

export default AppWrapper;
