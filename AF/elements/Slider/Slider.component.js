// @flow

import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {onGestureEvent, ReText} from 'react-native-redash';
import Knob, {KNOB_WIDTH} from './Knob.component';

const {
  Value,
  cond,
  eq,
  multiply,
  sub,
  useCode,
  call,
  round,
  add,
  set,
  concat,
  divide,
  block,
  onChange,
  max,
  min,
  interpolate,
} = Animated;

type Props = {
  style?: any,
  width: number,
  onChange: number => void,
  min: number,
  max: number,
  value: number,
  color?: string,
};

const Slider = (props: Props) => {
  const state = useMemo(() => new Value(State.UNDETERMINED), []);
  const translationX = useMemo(() => new Value(0), []);

  const withPercentualeDefault =
    (props.width / (props.max - props.min)) * (props.value - props.min);

  const gestureHandler = onGestureEvent({
    state,
    translationX,
  });

  const translateX = min(
    max(add(translationX, withPercentualeDefault), 0),
    props.width,
  );

  const scaleX = interpolate(add(translateX), {
    inputRange: [0, props.width],
    outputRange: [0, 1],
  });

  const percentage = round(
    add(
      multiply(divide(sub(props.max, props.min), props.width), translateX),
      props.min,
    ),
  );

  const label = concat(percentage);

  useCode(
    () =>
      block([
        onChange(
          state,
          cond(eq(state, State.END), [
            set(state, State.UNDETERMINED),
            set(translationX, 0),
            call([percentage], ([percentageChanged]) => {
              props.onChange && props.onChange(percentageChanged);
            }),
          ]),
        ),
      ]),
    [translateX],
  );

  return (
    <View style={[styles.container, props.style, {width: props.width}]}>
      <View style={styles.backgroundSlide}>
        <Animated.View
          style={[
            styles.left,
            {
              backgroundColor: props.color,
              transform: [
                {translateX: -props.width / 2},
                {scaleX},
                {translateX: props.width / 2},
              ],
            },
          ]}
        />
      </View>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            transform: [{translateX: sub(translateX, KNOB_WIDTH / 2)}],
          }}>
          <Knob state={state}>
            <ReText text={label} style={styles.label} />
          </Knob>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  left: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  backgroundSlide: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 15,
    overflow: 'hidden',
  },
});

export default Slider;
