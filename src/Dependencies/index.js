// @flow

import Request from './Request';
import Permissions from './Permissions';
import Geolocation from '@react-native-community/geolocation';
import Navigation from './Navigation';
import Apollo from './Apollo';

import {google, graphql, http, stripe} from '../../env.js';

export default {
  Request,
  Permissions,
  Geolocation,
  Navigation,
  ApolloClient: Apollo(graphql),
  baseUrl: http.base_url,
  stripeConfig: stripe,
  googleConfig: google,
};
