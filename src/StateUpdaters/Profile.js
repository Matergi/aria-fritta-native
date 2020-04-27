// @flow

import type {Action} from 'reducers';
import type {User, State, InfoUser} from 'types';

export const SetUser = (user: User): Action => {
  return {
    type: 'SetUser',
    updateState: (state: State) => {
      return {...state, user};
    },
  };
};

export const SetInfoUser = (info: InfoUser): Action => {
  return {
    type: 'SetInfoUser',
    updateState: (state: State) => {
      return {...state, user: {...state.user, info}};
    },
  };
};

export const SetToken = (token: string): Action => {
  return {
    type: 'SetToken',
    updateState: (state: State) => {
      return {...state, user: {...state.user, token}};
    },
  };
};

export const LogoutForSideEffect = (): Action => {
  return {
    type: 'LogoutForSideEffect',
    updateState: (state: State) => {
      return {...state, user: undefined, items: []};
    },
  };
};
