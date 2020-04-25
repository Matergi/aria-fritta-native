// @flow

import React from 'react';
import {Easing} from 'react-native';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {onGestureEvent, bInterpolate} from 'react-native-redash';
import Animated, {stopClock} from 'react-native-reanimated';
import {useMemoOne} from 'use-memo-one';

const {
  Value,
  onChange,
  block,
  cond,
  eq,
  call,
  Clock,
  set,
  useCode,
  timing,
  or,
  startClock,
  clockRunning,
  not,
  and,
} = Animated;

type Props = {
  style?: any,
  children?: any,
  scalable?: boolean,
  onPress?: any,
};

const runTiming = (clock, state, config) => {
  return block([
    cond(not(clockRunning(clock)), [startClock(clock)]),
    timing(clock, state, config),
    state.position,
  ]);
};

const PressElement = ({onPress, style, children, scalable}: Props) => {
  const {state, clock, animation, shouldScale, shouldOnPress} = useMemoOne(
    () => ({
      state: new Value(State.UNDETERMINED),
      clock: new Clock(),
      animation: new Value(0),
      shouldScale: new Animated.Value(-1),
      shouldOnPress: new Value(0),
    }),
    [],
  );

  const gestureHandler = onGestureEvent({state});

  const stateAnimation = {
    finished: new Value(0),
    position: animation,
    frameTime: new Value(0),
    time: new Value(0),
  };
  const configAnimation = {
    toValue: new Value(1),
    duration: 150,
    easing: Easing.linear,
  };

  useCode(
    () =>
      !scalable &&
      block([
        cond(eq(state, State.BEGAN), [set(shouldOnPress, 1)]),
        onChange(state, [
          cond(and(eq(state, State.END), eq(shouldOnPress, 1)), [
            set(shouldOnPress, 0),
            call([], ([]) => {
              onPress && onPress();
            }),
          ]),
        ]),
      ]),
    [onPress],
  );

  useCode(
    () =>
      scalable &&
      block([
        cond(eq(state, State.BEGAN), [
          set(shouldScale, 1),
          startClock(clock),
          set(shouldOnPress, 1),
        ]),
        cond(
          or(
            eq(state, State.CANCELLED),
            eq(state, State.FAILED),
            eq(state, State.END),
          ),
          set(shouldScale, 0),
        ),
        onChange(state, [
          cond(
            eq(state, State.END),
            [
              set(stateAnimation.time, 0),
              set(stateAnimation.frameTime, 0),
              set(stateAnimation.finished, 0),
              set(configAnimation.toValue, 0),
              stopClock(clock),
              cond(eq(shouldOnPress, 1), [
                set(shouldOnPress, 0),
                call([], ([]) => {
                  onPress && onPress();
                }),
              ]),
            ],
            [
              set(stateAnimation.time, 0),
              set(stateAnimation.frameTime, 0),
              set(stateAnimation.finished, 0),
              set(configAnimation.toValue, 1),
              stopClock(clock),
            ],
          ),
        ]),
        cond(
          eq(shouldScale, 1),
          set(animation, runTiming(clock, stateAnimation, configAnimation)),
        ),
        cond(
          eq(shouldScale, 0),
          set(animation, runTiming(clock, stateAnimation, configAnimation)),
        ),
      ]),
    [onPress],
  );

  const scale = bInterpolate(animation, 1, 0.95);

  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View style={[{transform: [{scale}]}, style]}>
        {children}
      </Animated.View>
    </TapGestureHandler>
  );
};

export default PressElement;
