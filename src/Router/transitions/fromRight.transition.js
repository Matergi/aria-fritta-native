// @flow

import Animated from 'react-native-reanimated';

import {I18nManager} from 'react-native';

const {multiply, interpolate} = Animated;

const forHorizontalIOS = ({current, next, layouts: {screen}}: any) => {
  const translateFocused = interpolate(current.progress, {
    inputRange: [0, 1],
    outputRange: [I18nManager.isRTL ? -screen.width : screen.width, 0],
  });
  const translateUnfocused = next
    ? interpolate(next.progress, {
        inputRange: [0, 1],
        outputRange: [
          0,
          multiply(I18nManager.isRTL ? -screen.width : screen.width, -0.3),
        ],
      })
    : 0;

  const overlayOpacity = interpolate(current.progress, {
    inputRange: [0, 1],
    outputRange: [0, 0.07],
  });

  const shadowOpacity = interpolate(current.progress, {
    inputRange: [0, 1],
    outputRange: [0, 0.3],
  });

  return {
    cardStyle: {
      transform: [
        // Translation for the animation of the current card
        {translateX: translateFocused},
        // Translation for the animation of the card on top of this
        {translateX: translateUnfocused},
      ],
    },
    overlayStyle: {opacity: overlayOpacity},
    shadowStyle: {shadowOpacity},
  };
};

const spring = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const FromRightTransition = {
  gesturesEnabled: false,
  cardOverlayEnabled: true,
  transitionSpec: {
    open: spring,
    close: spring,
  },
  cardStyle: {
    backgroundColor: 'transparent',
  },
  cardStyleInterpolator: forHorizontalIOS,
  gestureDirection: 'horizontal',
  gestureVelocityImpact: 0,
};

export default FromRightTransition;
