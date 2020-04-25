// @flow

import React from 'react';
import {
  TouchableOpacity as _TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';

import {executeJob} from 'tools';

const TouchableOpacity = Animated.createAnimatedComponent(_TouchableOpacity);

type Props = {
  style?: any,
  children?: any,
  scalable?: boolean,
  onPress?: any,
};

const PressElement = (props: Props) => {
  const scale = new Animated.Value(1);

  return (
    <TouchableOpacity
      onPressIn={() => {
        props.scalable &&
          executeJob({
            start: end => {
              Animated.spring(scale, {
                toValue: 0.99,
                easing: Easing.bounce,
                speed: 25,
                useNativeDriver: true,
              }).start(end);
            },
          });
      }}
      onPress={() => {
        if (!props.scalable) {
          props.onPress && props.onPress();
          return;
        }

        executeJob({
          start: end => {
            Animated.spring(scale, {
              toValue: 1,
              easing: Easing.ease,
              speed: 25,
              useNativeDriver: true,
            }).start(() => {
              end();
            });

            props.onPress && props.onPress();
          },
        });
      }}
      activeOpacity={1}
      style={[
        {
          transform: [
            {
              scale,
            },
          ],
        },
        styles.conatiner,
        props.style,
      ]}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  conatiner: {},
});

export default PressElement;
