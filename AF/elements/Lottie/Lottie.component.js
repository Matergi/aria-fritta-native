// @flow
import React from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {loading} from 'lottiefiles';

type Type = 'loading';

type Props = {
  type: Type,
};

const Lottie = (props: Props) => {
  let animation;

  if (props.type === 'loading') {
    animation = loading;
  }
  return (
    <LottieView
      autoPlay
      autoSize
      style={styles.loadingIcon}
      source={animation}
    />
  );
};

const styles = StyleSheet.create({
  loadingIcon: {
    width: 50,
    height: 'auto',
  },
});

export default Lottie;
