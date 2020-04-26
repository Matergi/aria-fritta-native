// @flow

import type {Action} from 'reducers';
import type {State} from 'types';

export const EditRecoverPasswordInfo = (key: string, value: string): Action => {
  return {
    type: 'EditRecoverPasswordInfo',
    updateState: (state: State) => {
      const recoverPassword = {
        ...state.recoverPassword,
      };
      recoverPassword[key] = value;

      return {
        ...state,
        recoverPassword,
      };
    },
  };
};
