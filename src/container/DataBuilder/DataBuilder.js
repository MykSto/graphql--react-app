import React from 'react';
import Aux from 'hoc/Auxiliary';
import Login from 'component/UI/Form/Login/Login';
import Button from 'component/UI/Button/Button';

import Data from 'component/Data/Data';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const accessToken = localStorage.getItem('token');


const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


const DataBuilder = () => {
  const accessTokenHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <ApolloProvider client={client}>
      <Aux>
        {accessToken
          ? (
            <Aux>
              <Button clicked={accessTokenHandler} btnType="Danger">Logout</Button>
              <Data />
            </Aux>
          )
          : <Login />}
      </Aux>
    </ApolloProvider>
  );
};

export default DataBuilder;
