// @flow

import {ChangeScreen, InfoUser} from 'SideEffects';
import {SetToken} from 'StateUpdaters';
import router from 'router';

export const RecoverPassword = () => {
  return async (dispatch: any, getState: any, manager: Object) => {
    // api
    return true;
  };
};

export const ConfirmPhoneNumberForRecoverPassword = () => {
  return async (dispatch: any, getState: any, manager: Object) => {
    // api
    return true;
  };
};

export const ResetPassword = () => {
  return async (dispatch: any, getState: any, manager: Object) => {
    // api
    dispatch(SetToken('token'));
    const infoUser = await dispatch(InfoUser());
    if (infoUser) {
      dispatch(ChangeScreen(router.home, {}, true));
      return true;
    }

    return undefined;
  };
};
