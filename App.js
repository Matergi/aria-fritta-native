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
import ErrorUtils from 'ErrorUtils';
import {SourceMapResolver} from 'tools';
import {Platform} from 'react-native';

const defaultGlobalHandler = ErrorUtils.getGlobalHandler();

!__DEV__ &&
  global.ErrorUtils.setGlobalHandler(async (error, isFatal) => {
    try {
      crashlytics().log('pre resolve stacktracer');
      crashlytics().log(
        JSON.stringify(error, Object.getOwnPropertyNames(error)),
      );
      const stack = await SourceMapResolver.stackTrace(error);
      crashlytics().log('compiledStackTrace (obfuscated):');
      crashlytics().log(JSON.stringify(stack.compiledStackTrace));
      crashlytics().log(
        `command to resolve all stack tracer: node .sourcemap/resolver.${
          Platform.OS === 'ios' ? 'ios' : 'android'
        }.js '${JSON.stringify(stack.compiledStackTrace)}'`,
      );
      crashlytics().log('after resolve stacktracer');
      crashlytics().log('originalStackTrace (clear):');
      crashlytics().log(JSON.stringify(stack.originalStackTrace));
    } catch (errorProcess) {
      crashlytics().log(JSON.stringify(errorProcess));
    }
    defaultGlobalHandler(error, isFatal);
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
  requestPermission();

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
