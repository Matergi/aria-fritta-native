// @flow

import {Dimensions, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getBottomSpace} from 'react-native-iphone-x-helper';

const heightStatusBar = getStatusBarHeight();

const heightNavigationBar = 50;

const topText =
  getStatusBarHeight() + (Dimensions.get('window').height / 100) * 5;

const bottomSpace = Platform.OS === 'ios' ? getBottomSpace() : 20;

const topSpace = heightStatusBar + (Dimensions.get('window').height / 100) * 2;

const heightConfirmButton = 60 + (bottomSpace === 0 ? 20 : bottomSpace);

export default {
  heightStatusBar,
  heightNavigationBar,
  topText,
  bottomSpace,
  topSpace,
  heightConfirmButton,
};
