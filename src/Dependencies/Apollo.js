import {ApolloClient} from 'apollo-client';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createUploadLink} from 'apollo-upload-client';

type Config = {
  url: String,
  addTypename: boolean,
  token: string,
  params: Object,
};

const httpLink = (config: Config) =>
  createUploadLink({
    uri: config.url,
    cachePolicy: 'offline-critical',
  });

const authLink = (config: Config) =>
  setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        Authorization: config.token ? `Bearer ${config.token}` : '',
        ...config.params,
      },
    };
  });

const client = (config: Config) => {
  const apolloClient = new ApolloClient({
    link: authLink(config).concat(httpLink(config)),
    cache: new InMemoryCache({addTypename: config.addTypename}),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  });
  return apolloClient;
};

export default client;

/*
Example:

workingDirectory: SideEffects/

import gql from "graphql-tag";

export const LoginCustomer = () => {
  return async (dispatch: any, getState: function, manager: Object) => {
    const data = {
      username: "username",
      password: "password",
    };
    const LOGIN = `
        mutation {
          loginCustomer(
            username: "${data.username}"
            password: "${data.password}"
          ) {
            token
            firstName
            lastName
            phone
          }
      }
    `;

    const result = await manager.ApolloClient.mutate({
      mutation: gql(LOGIN)
    });
    return result.data.loginCustomer;
  };
};
*/
