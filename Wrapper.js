// @flow

import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import Dependencies from 'dependencies';
import LaunchNavigator from 'react-native-launch-navigator';
if (Platform.OS === 'android') {
  LaunchNavigator.setGoogleApiKey(Dependencies.googleConfig.places_api_key);
}
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import reducers from 'reducers';
import createSagaMiddleware from 'redux-saga';
import SagaEffects from 'SagaEffects';

import {ThemeComponent} from 'themes';

import {SourceMapResolver} from 'tools';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loading'],
  //whitelist: []
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(thunk.withExtraArgument(Dependencies), sagaMiddleware),
);

let enablePersistence = true;

const store = createStore(
  enablePersistence ? persistedReducer : reducers,
  enhancer,
);

sagaMiddleware.run(SagaEffects);

let persistor;

export default () => {
  const [loaded, setLoad] = useState(false);
  if (!persistor) {
    persistor = persistStore(store, undefined, async () => {
      try {
        await SourceMapResolver.createSourceMapper();
      } catch (e) {
        console.error(e);
      }
      setLoad(true);
    });
  }

  if (!loaded && enablePersistence) {
    return <View />;
  }

  const customScreen = undefined; // 'Test';

  return (
    <NavigationContainer ref={Dependencies.Navigation.navigationRef}>
      <Provider store={store}>
        {enablePersistence ? (
          <PersistGate loading={null} persistor={persistor}>
            <ThemeComponent>
              <App
                screen={
                  customScreen ? customScreen : store.getState().screen.id
                }
              />
            </ThemeComponent>
          </PersistGate>
        ) : (
          <ThemeComponent>
            <App
              screen={customScreen ? customScreen : store.getState().screen.id}
            />
          </ThemeComponent>
        )}
      </Provider>
    </NavigationContainer>
  );
};
