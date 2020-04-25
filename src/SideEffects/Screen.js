// @flow

import {ChangeScreenForSideEffect} from 'StateUpdaters';
import type {RouterScreen} from 'types';

export const ChangeScreen = (
  screen: RouterScreen,
  params?: any,
  reset?: boolean,
) => {
  return (dispatch: any, getState: any, manager: Object) => {
    if (reset) {
      manager.Navigation.reset(screen.id);
      dispatch(ChangeScreenForSideEffect(screen));
    } else {
      manager.Navigation.navigate(screen.id, params);
    }
  };
};

export const BackScreen = () => {
  return (dispatch: any, getState: any, manager: Object) => {
    manager.Navigation.pop();
  };
};
