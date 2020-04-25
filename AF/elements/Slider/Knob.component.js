import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {not} from 'react-native-reanimated';
import {State} from 'react-native-gesture-handler';

const {eq, or} = Animated;

export const KNOB_WIDTH = 30;
export const KNOB_HEIGHT = 30;

type Props = {
  state: Animated.Node,
  children?: any,
};

const Knob = ({state, children}: Props) => {
  const opacityDuring = or(eq(state, State.ACTIVE), eq(state, State.BEGAN));
  const opacity = not(eq(state, State.ACTIVE), eq(state, State.BEGAN));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.knob, styles.knobChanging, {opacity: opacityDuring}]}
      />
      <Animated.View style={[styles.knob, styles.knobChanged, {opacity}]} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: KNOB_WIDTH,
    height: KNOB_HEIGHT,
  },
  knob: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: KNOB_WIDTH / 2,
  },
  knobChanging: {
    backgroundColor: 'green',
  },
  knobChanged: {
    backgroundColor: 'yellow',
  },
});

export default Knob;
