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
  diffClamp,
  concat,
  divide,
  block,
  onChange,
} = Animated;

type Props = {
  style?: any,
  width: number,
  onChange: number => void,
  min: number,
  max: number,
  default: number,
  color?: string,
};

const withOffset = (state, value, defaultOffset) => {
  const offset = new Value(defaultOffset);
  return block([
    cond(
      eq(state, State.END),
      [set(offset, add(value, offset)), offset],
      add(value, offset),
    ),
  ]);
};

// for resolve bug in diffClamp follow this pull request https://github.com/software-mansion/react-native-reanimated/pull/746
const Slider = (props: Props) => {
  const {state, translationX} = useMemo(
    () => ({
      state: new Value(State.UNDETERMINED),
      translationX: new Value(0),
    }),
    [],
  );

  const withPercentualeDefault =
    (props.width / (props.max - props.min)) * (props.default - props.min);

  const offset = useMemo(() => withPercentualeDefault, []);

  const gestureHandler = onGestureEvent({
    state,
    translationX,
  });

  const translateX = useMemo(
    () =>
      sub(
        diffClamp(withOffset(state, translationX, offset), 0, props.width),
        KNOB_WIDTH / 2,
      ),
    [],
  );

  const percentage = useMemo(
    () =>
      round(
        add(
          multiply(
            divide(sub(props.max, props.min), props.width),
            add(translateX, divide(KNOB_WIDTH, 2)),
          ),
          props.min,
        ),
      ),
    [],
  );

  const label = useMemo(() => concat(percentage), []);

  useCode(
    () =>
      block([
        call([translateX], ([]) => {}),
        onChange(
          state,
          cond(eq(state, State.END), [
            set(state, State.UNDETERMINED),
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
        <Animated.View style={[styles.left]} />
      </View>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={{transform: [{translateX}]}}>
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
