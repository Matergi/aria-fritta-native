// @flow

import type {State} from 'types';
import state from './State';

export type Action = {
  type: string,
  updateState: (state: State) => State,
};

const reducer = (currentState: State = state, action: Action): State => {
  if (action.updateState === null || typeof action.updateState !== 'function') {
    return currentState;
  }

  return action.updateState(currentState);
};

export default reducer;
