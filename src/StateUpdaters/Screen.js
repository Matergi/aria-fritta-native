// @flow

import type {Action} from 'reducers';
import type {RouterScreen, State} from 'types';

export const ChangeScreenForSideEffect = (screen: RouterScreen): Action => {
  return {
    type: 'changeScreen',
    updateState: (state: State) => {
      return {...state, screen};
    },
  };
};

export const StartLoading = (id: string): Action => {
  return {
    type: 'StartLoading',
    updateState: (state: State) => {
      return {...state, loading: id};
    },
  };
};

export const StopLoading = (): Action => {
  return {
    type: 'StopLoading',
    updateState: (state: State) => {
      return {...state, loading: undefined};
    },
  };
};
