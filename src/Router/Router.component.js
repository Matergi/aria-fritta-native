// @flow
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import routerScreens from './config.router';
import {fromRight} from './transitions';
import {Platform} from 'react-native';

const SYSTEM_ANIMATION = undefined;

const DEFAULT_ANIMATION_ANDROID = fromRight;
const DEFAULT_ANIMATION_IOS = SYSTEM_ANIMATION;

export default (defaultScreen: string) => {
  const ScreenStack = createSharedElementStackNavigator();
  return (
    <ScreenStack.Navigator
      initialRouteName={defaultScreen}
      headerMode="none"
      gestureEnabled={false}>
      {routerScreens.map(screen => (
        <ScreenStack.Screen
          key={screen.router.id}
          name={screen.router.id}
          component={screen.ui}
          options={
            screen.navigationOptions
              ? screen.navigationOptions
              : Platform.OS === 'android'
              ? DEFAULT_ANIMATION_ANDROID
              : DEFAULT_ANIMATION_IOS
          }
          sharedElementsConfig={screen.sharedElementsConfig}
        />
      ))}
    </ScreenStack.Navigator>
  );
};

export const durationTransition = 200;
