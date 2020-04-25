/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */

import {useEffect} from 'react';
import {onReciveNotification, requestPermission, onRefreshToken} from 'fcm';
import {connect} from 'react-redux';
import Router from 'router/Router.component';

type Props = {
  screen: string,
};

const App = (props: Props) => {
  onRefreshToken(token => {});
  requestPermission();
  onReciveNotification(data => {});
  useEffect(() => {}, []);

  return Router(props.screen);
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  undefined,
  mapDispatchToProps,
)(App);
