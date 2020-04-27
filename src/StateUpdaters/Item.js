/* eslint-disable no-bitwise */
// @flow

import type {Action} from 'reducers';
import type {State} from 'types';

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const AddItem = (name: string): Action => {
  return {
    type: 'AddItem',
    updateState: (state: State) => {
      return {...state, items: [...state.items, {key: uuidv4(), name}]};
    },
  };
};

export const DeleteItem = (key: string): Action => {
  return {
    type: 'DeleteItem',
    updateState: (state: State) => {
      return {...state, items: state.items.filter(item => item.key !== key)};
    },
  };
};

export const DeleteAllItem = (): Action => {
  return {
    type: 'DeleteAllItem',
    updateState: (state: State) => {
      return {...state, items: []};
    },
  };
};
