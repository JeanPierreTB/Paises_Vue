import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'; 
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
  uri: 'https://countries.trevorblades.com/  ',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(), 
});

export default client;
