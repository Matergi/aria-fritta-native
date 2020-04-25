// @flow

import {LoginManager, AccessToken} from 'react-native-fbsdk';

export const LoginWithFacebook = (
  permissions: Array<string> = ['email', 'public_profile'],
) => {
  return async (dispatch: any, getState: any, manager: Object) => {
    const result = await LoginManager.logInWithPermissions(permissions);
    if (!result.isCancelled) {
      const data = await AccessToken.getCurrentAccessToken();
      return data.accessToken;
    }

    return undefined;
  };
};
