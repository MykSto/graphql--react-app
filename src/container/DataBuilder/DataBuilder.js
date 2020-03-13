import React from 'react';
import Aux from 'hoc/Auxiliary';
import Login from 'component/UI/Form/Login/Login';
import Button from 'component/UI/Button/Button';
import Data from 'component/Data/Data';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const accessToken = localStorage.getItem('token');

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
        {accessToken ? <Button clicked={accessTokenHandler} btnType="Danger">Logout</Button> : <Login />}
        <Data />
      </Aux>
    </ApolloProvider>
  );
};

export default DataBuilder;
