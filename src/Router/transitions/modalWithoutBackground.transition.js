// @flow

const ModalTransition = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 350,
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 350,
      },
    },
  },
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
  cardStyleInterpolator: ({current, next, layouts}: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
        backgroundColor: 'transparent',
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};

export default ModalTransition;
