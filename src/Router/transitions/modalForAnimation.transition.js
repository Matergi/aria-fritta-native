// @flow

import Animated from 'react-native-reanimated';

const {cond, interpolate} = Animated;

const modal = ({
  index,
  current,
  next,
  layouts: {screen},
  insets,
  closing,
}: any) => {
  const opacity = cond(
    closing,
    current.progress,
    interpolate(current.progress, {
      inputRange: [0, 0.5, 0.9, 1],
      outputRange: [0, 0, 0, 1],
    }),
  );

  return {
    cardStyle: {
      opacity,
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
    backgroundColor: '#fff',
  },
  cardStyleInterpolator: modal,
  gestureDirection: 'vertical',
};

export default ModalTransition;
