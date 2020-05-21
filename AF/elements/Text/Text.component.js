// @flow
import React, {useState, useContext, useEffect} from 'react';

import {StyleSheet, Text, Platform, View, Dimensions} from 'react-native';
import Press from '../Press';
import ThemeContext from 'themes';

const padding = (Dimensions.get('window').height / 100) * 0.4;

type size = 's' | 'm' | 'l' | number;

type Props = {
  id?: string,
  size?: size,
  style?: any,
  onLayout?: any,
  children: any,
  debug?: boolean,
  underlineColor?: string,
  onPress?: () => void,
  ellipsizeMode?: string,
  numberOfLines?: number,
  textStyle?: any,
  fontScaling?: boolean,
};

const fontFamilyAndroid = 'Nexa';
const fontFamilyiOS = 'Nexa';

const TextElement = (props: Props) => {
  let fontSize: number = 16;

  const {theme} = useContext(ThemeContext);

  switch (props.size) {
    case 's':
      fontSize = 14;
      break;
    case 'm':
      fontSize = 16;
      break;
    case 'l':
      fontSize = 20;
      break;
    default:
      if (typeof props.size === 'number') {
        fontSize = props.size;
      }
      break;
  }

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = props.fontScaling;

  let TextToRender = (
    <Text
      ellipsizeMode={props.ellipsizeMode}
      numberOfLines={props.numberOfLines}
      style={[
        styles.text,
        {fontSize},
        theme.text,
        !props.onPress && props.style,
        props.textStyle,
      ]}
      pointerEvents="none"
      onLayout={props.onLayout}>
      {props.children}
    </Text>
  );

  if (props.underlineColor) {
    TextToRender = (
      <View style={[styles.wrapUnderline, {borderColor: props.underlineColor}]}>
        {TextToRender}
      </View>
    );
  }

  if (props.onPress) {
    TextToRender = (
      <Press style={props.style} onPress={props.onPress}>
        {TextToRender}
      </Press>
    );
  }

  return TextToRender;
};

export const font =
  Platform.OS === 'ios'
    ? {fontFamily: fontFamilyiOS, color: '#000'}
    : {fontFamily: fontFamilyAndroid, color: '#000'};

const styles = StyleSheet.create({
  text: {
    ...font,
    padding: 0,
  },
  wrapUnderline: {
    flexDirection: 'column',
    borderBottomWidth: 2,
    paddingBottom: 5,
    marginBottom: 5,
    width: 'auto',
  },
});

TextElement.defaultProps = {
  fontScaling: false,
};

export default TextElement;
