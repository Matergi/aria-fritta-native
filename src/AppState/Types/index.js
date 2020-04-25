// @flow strict

import type {ScreenName} from 'router';

export type RouterScreen = {
  id: ScreenName,
  title?: string,
};

export type State = {
  version: string,
  screen: RouterScreen,
  token?: string,
  loading?: string,
};
