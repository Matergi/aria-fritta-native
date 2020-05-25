/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import {useEffect} from 'react';
import {connect} from 'react-redux';
import Router from 'router/Router.component';
import messaging from '@react-native-firebase/messaging';
import crashlytics from '@react-native-firebase/crashlytics';

const defaultHandler = global.ErrorUtils.getGlobalHandler();

global.ErrorUtils.setGlobalHandler((error, isFatal) => {
  crashlytics().log(JSON.stringify(error, Object.getOwnPropertyNames(error)));
  defaultHandler.apply(this, error, isFatal);
});

type Props = {
  screen: string,
};

const App = ({screen}: Props) => {
  const requestPermission = async () => {
    const settings = await messaging().requestPermission();

    if (settings) {
      console.log('Permission settings:', settings);
    }
  };

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        // token
      });

    messaging().onNotificationOpenedApp(remoteMessage => {
      // notification
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        // notification
      });

    return messaging().onTokenRefresh(token => {
      // update token
    });
  }, []);

  return Router(screen);
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  undefined,
  mapDispatchToProps,
)(App);
