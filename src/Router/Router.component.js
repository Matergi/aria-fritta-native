// @flow
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import routerScreens from './config.router';

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
          options={screen.navigationOptions}
          sharedElementsConfig={screen.sharedElementsConfig}
        />
      ))}
    </ScreenStack.Navigator>
  );
};
