// @flow

import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {font} from '../Text/Text.component';
import rnTextSize, {TSFontSpecs} from 'react-native-text-size';

type Props = {
  style?: any,
  color?: string,
  selectionColor?: string,
  underlineFocusColor?: string,
  underlineColor?: string,
  underline?: boolean,
  placeholder?: string,
  children?: any,
  onChange: string => void,
  value?: string,
  isPassword?: boolean,
  keyboard?: string,
  error?: boolean,
  maxLength?: number,
  editable: boolean,
  fontScaling?: boolean,
  minHeightEnabled?: boolean,
};

const InputComponent = (props: Props) => {
  const [value, onChangeText] = useState(props.value ? props.value : '');

  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = props.fontScaling;

  const fontSpecs: TSFontSpecs = {
    fontFamily: font.fontFamily,
    fontSize: props.style && props.style.fontSize ? props.style.fontSize : 16,
    fontStyle: props.style && props.style.fontStyle,
    fontWeight: props.style && props.style.fontWeight,
  };

  const [minHeight, setMinHeight] = useState(0);
  const calcMinHeight = async () => {
    const size = await rnTextSize.measure({
      text: 'A',
      width: 100,
      ...fontSpecs,
    });
    setMinHeight(size.height);
  };

  useEffect(() => {
    calcMinHeight();
  }, [props.children]);

  return (
    <View style={[styles.row, props.style]}>
      <TextInput
        editable={props.editable}
        autoCapitalize={'none'}
        autoCompleteType={'off'}
        secureTextEntry={props.isPassword}
        selectionColor={props.selectionColor}
        placeholder={props.placeholder}
        keyboardType={props.keyboard}
        style={[
          props.minHeightEnabled && {minHeight: minHeight * 2},
          props.underline && props.underlineColor && styles.inputBottomLine,
          props.underline &&
            props.underlineColor && {
              borderBottomColor: props.underlineColor,
            },
          styles.input,
          {color: props.color},
          props.error && styles.error,
        ]}
        onChangeText={text => {
          onChangeText(text);
          props.onChange && props.onChange(text);
        }}
        value={props.value ? props.value : value}
        maxLength={props.maxLength}
      />
      {props.children}
    </View>
  );
};

InputComponent.defaultProps = {
  editable: true,
  fontScaling: false,
};

const styles = StyleSheet.create({
  inputBottomLine: {
    paddingLeft: 6,
    borderBottomWidth: 1,
    ...font,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  error: {
    borderBottomColor: '#f00',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
});

export default InputComponent;
