// @flow

import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {ChangeScreen, InfoUser} from 'SideEffects';
import {SetToken} from 'StateUpdaters';
import router from 'router';

export const LoginWithFacebook = (
  permissions: Array<string> = ['email', 'public_profile'],
) => {
  return async (dispatch: any, getState: any, manager: Object) => {
    const result = await LoginManager.logInWithPermissions(permissions);
    if (!result.isCancelled) {
      const data = await AccessToken.getCurrentAccessToken();

      dispatch(SetToken('token'));
      const infoUser = await dispatch(InfoUser());
      if (infoUser) {
        dispatch(ChangeScreen(router.home, {}, true));
        return data.accessToken;
      }
    }

    return undefined;
  };
};
