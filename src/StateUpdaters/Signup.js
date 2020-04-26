// @flow

import type {Action} from 'reducers';
import type {State} from 'types';

export const EditSignupInfo = (key: string, value: string): Action => {
  return {
    type: 'EditSignupInfo',
    updateState: (state: State) => {
      const signup = {
        ...state.signup,
      };
      signup[key] = value;

      return {
        ...state,
        signup,
      };
    },
  };
};
