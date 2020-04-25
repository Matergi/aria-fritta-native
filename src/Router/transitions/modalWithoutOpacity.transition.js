// @flow

import Animated from 'react-native-reanimated';

const {cond, multiply, interpolate} = Animated;

const modal = ({
  index,
  current,
  next,
  layouts: {screen},
  insets,
  closing,
}: any) => {
  const translateY = interpolate(current.progress, {
    inputRange: [0, 1],
    outputRange: [multiply(screen.height, 0.3), 0],
  });

  return {
    cardStyle: {
      transform: [{translateY}],
      backgroundColor: 'transparent',
    },
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

const ModalTransition = {
  gesturesEnabled: false,
  transitionSpec: {
    open: spring,
    close: spring,
  },
  cardStyle: {
    backgroundColor: 'transparent',
  },
  cardStyleInterpolator: modal,
  gestureDirection: 'vertical',
};

export default ModalTransition;
