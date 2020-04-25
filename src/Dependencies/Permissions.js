// @flow

import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const PERMISSIONS_LOCATION_WHEN_IN_USE =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

export default {
  PERMISSIONS_LOCATION_WHEN_IN_USE,
  checkAndRequestIfNecessary: async (permissions: string) => {
    let result = await check(permissions);
    if (result === RESULTS.DENIED) {
      result = await request(permissions);
    }

    if (result === RESULTS.GRANTED) {
      return;
    }

    throw new Error('error into request permissions');
  },
};
