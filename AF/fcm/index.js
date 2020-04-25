import {
  NativeModules,
  NativeEventEmitter,
  Platform,
  DeviceEventEmitter,
} from 'react-native';

// import HuaweiProtectedApps from 'react-native-huawei-protected-apps';

const Queue = new NativeEventEmitter(NativeModules.Queue);
const FCM = NativeModules.BridgeFcm;

export const onRefreshToken = callback => {
  if (Platform.OS === 'ios') {
    Queue.addListener('onRefreshToken', token => {
      callback && callback(token);
    });
  } else {
    DeviceEventEmitter.addListener('onRefreshToken', token => {
      callback && callback(token);
    });
  }
};

export const onReciveNotification = callback => {
  if (Platform.OS === 'ios') {
    Queue.addListener('onReciveNotification', data => {
      callback && callback(JSON.parse(data));
    });
  } else {
    DeviceEventEmitter.addListener('onReciveNotification', data => {
      callback && callback(JSON.parse(data));
    });
  }
};

export const requestPermission = () => {
  FCM.requestPermission();
  FCM.enable();
};
