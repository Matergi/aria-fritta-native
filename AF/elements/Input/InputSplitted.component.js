// @flow

import React, {useState, useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Text, {font} from '../Text/Text.component';

type Rule = {
  length: number,
  placeholder: string,
  id: string,
};

type Props = {
  style?: any,
  color?: string,
  selectionColor?: string,
  underlineFocusColor?: string,
  underlineColor?: string,
  underline?: boolean,
  placeholder?: string,
  children?: any,
  onChange: (Array<string>) => void,
  values: Array<string>,
  isPassword?: boolean,
  keyboard?: string,
  error?: boolean,
  maxLength?: number,
  rules: Array<Rule>, // **|**
  separator: string, // /
  charWidth: number,
  editable: boolean,
};

const InputSplittedComponent = (props: Props) => {
  const [value, onChangeText] = useState(props.values);

  const refs: Array<any> = [];
  for (let i = 0; i < props.rules.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    refs.push(useRef());
  }

  return (
    <View style={props.style}>
      <View style={styles.row}>
        {props.rules.map((rule, index) => (
          <View key={rule.id} style={styles.row}>
            {index > 0 && <Text>{props.separator}</Text>}
            <TextInput
              ref={refs[index]}
              editable={props.editable}
              autoCapitalize={'none'}
              autoCompleteType={'off'}
              secureTextEntry={props.isPassword}
              selectionColor={props.selectionColor}
              placeholder={rule.placeholder}
              keyboardType={props.keyboard}
              onFocus={() => {
                if (!value || value[0].length === 0) {
                  refs[0].current.focus();
                  return;
                }
              }}
              style={[
                props.underline &&
                  props.underlineColor &&
                  styles.inputBottomLine,
                props.underline &&
                  props.underlineColor && {
                    borderBottomColor: props.underlineColor,
                  },
                styles.input,
                {color: props.color},
                props.error && styles.error,
                {width: rule.length * props.charWidth},
              ]}
              onKeyPress={e => {
                const {nativeEvent} = e;
                if (nativeEvent.key === 'Backspace') {
                  if (
                    (!value[index] && index > 0) ||
                    (value[index].length === 0 && index > 0)
                  ) {
                    refs[index - 1].current.focus();
                  }
                } else if (
                  value[index] &&
                  value[index].length === rule.length &&
                  refs[index + 1] !== undefined
                ) {
                  refs[index + 1].current.focus();
                }
              }}
              onChangeText={text => {
                console.log(text);
                const newValue = value;
                newValue[index] = text;
                if (
                  text.length === rule.length &&
                  refs[index + 1] !== undefined
                ) {
                  refs[index + 1].current.focus();
                }
                onChangeText(newValue);
                props.onChange(newValue);
              }}
              value={value[index]}
              maxLength={rule.length}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

InputSplittedComponent.defaultProps = {
  editable: true,
};

const styles = StyleSheet.create({
  inputBottomLine: {
    borderBottomWidth: 1,
    ...font,
  },
  input: {
    height: '100%',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 2,
  },
  error: {
    borderBottomColor: '#f00',
  },
  row: {
    flexDirection: 'row',
  },
});

export default InputSplittedComponent;
