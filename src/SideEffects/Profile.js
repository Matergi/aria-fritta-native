// @flow

import {SetUser, SetInfoUser, LogoutForSideEffect} from 'StateUpdaters';
import {ChangeScreen} from 'SideEffects';
import router from 'router';

export const Login = (email: string, password: string) => {
  return async (dispatch: any, getState: any, manager: Object) => {
    // api
    dispatch(SetUser({info: {name: 'Name'}, token: 'token'}));
    dispatch(ChangeScreen(router.home, {}, true));
  };
};

export const InfoUser = () => {
  return async (dispatch: any, getState: any, manager: Object) => {
    // api
    dispatch(SetInfoUser({name: 'Name'}));
    return true;
  };
};

export const Signup = () => {
  return async (dispatch: any, getState: any, manager: Object) => {
    // api
    dispatch(SetUser({info: {name: 'Name'}, token: 'token'}));
    return true;
  };
};

export const ConfirmPhoneNumber = () => {
  return async (dispatch: any, getState: any, manager: Object) => {
    // api
    dispatch(ChangeScreen(router.home, {}, true));
  };
};

export const Logout = () => {
  return async (dispatch: any, getState: any, manager: Object) => {
    // api
    dispatch(LogoutForSideEffect());
    dispatch(ChangeScreen(router.login, {}, true));
  };
};
