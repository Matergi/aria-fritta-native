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
      return {...state, loading: [...state.loading, id]};
    },
  };
};

export const StopLoading = (id: string): Action => {
  return {
    type: 'StopLoading',
    updateState: (state: State) => {
      return {
        ...state,
        loading: state.loading.filter(loadingId => loadingId !== id),
      };
    },
  };
};
