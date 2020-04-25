// @flow

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {font} from '../Text/Text.component';
import {TextInputMask} from 'react-native-masked-text';

type Props = {
  style: any,
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
  type: string,
  options: any,
  editable: boolean,
};

const InputMaskComponent = (props: Props) => {
  const [value, onChangeText] = useState(props.value ? props.value : '');

  return (
    <View style={props.style}>
      <TextInputMask
        editable={props.editable}
        type={props.type}
        options={props.options}
        autoCapitalize={'none'}
        autoCompleteType={'off'}
        secureTextEntry={props.isPassword}
        selectionColor={props.selectionColor}
        placeholder={props.placeholder}
        keyboardType={props.keyboard}
        style={[
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
          props.onChange(text);
        }}
        value={value}
        maxLength={props.maxLength}
      />
      {props.children}
    </View>
  );
};

InputMaskComponent.defaultProps = {
  editable: true,
};

const styles = StyleSheet.create({
  inputBottomLine: {
    paddingLeft: 6,
    borderBottomWidth: 1,
    ...font,
  },
  input: {
    height: '100%',
    fontSize: 16,
  },
  error: {
    borderBottomColor: '#f00',
  },
});

export default InputMaskComponent;
