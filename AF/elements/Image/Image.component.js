// @flow

import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  url?: string,
  src?: any,
  image?: any,
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center',
  style?: Object,
  mask?: boolean,
  containerStyle?: Object,
  id?: string,
  debug?: boolean,
  noContainer?: boolean,
};

const ImageComponent = (props: Props) => {
  return (
    <View style={props.noContainer ? styles.container : props.containerStyle}>
      {props.image ? (
        <Image
          id={props.id}
          style={[styles.image, props.style]}
          source={props.image}
        />
      ) : (
        <FastImage
          style={[styles.image, props.style]}
          source={
            props.src
              ? props.src
              : {
                  uri: props.url,
                }
          }
          resizeMode={props.resizeMode ? props.resizeMode : 'cover'}
        />
      )}
      {props.mask && (
        <LinearGradient
          start={{x: 0, y: 1.4}}
          end={{x: 0, y: 0}}
          style={[props.style, styles.mask]}
          colors={['#080021', 'rgba(0,0,0,0)']}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  image: {
    resizeMode: 'cover',
  },
  mask: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default ImageComponent;
