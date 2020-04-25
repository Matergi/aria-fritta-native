// @flow

import React from 'react';
import {View, StyleSheet} from 'react-native';
import Press from '../Press';
import Text from '../Text';

type Element = {
  key: any,
  value: any,
};

type Props = {
  elements: Array<Element>,
  onChange: any => void,
  value: any,
  style?: any,
  error?: boolean,
  backgroundColor?: string,
  colorSelected?: string,
  colorUnselected?: string,
  backgroundColorSelected?: string,
};

const RadioButtons = (props: Props) => {
  return (
    <View style={[styles.conatiner, props.style]}>
      {props.elements.map((element, index) => (
        <Press
          key={element.key}
          style={styles.radioButton}
          onPress={() => {
            props.onChange(element.key);
          }}>
          <View
            style={[
              styles.containerRagioButton,
              props.error && styles.error,
              index > 0 && styles.noBorderLeft,
              index < props.elements.length - 1 && styles.noRadiusTopRight,
              index < props.elements.length - 1 && styles.noRadiusBottomRight,
              index > 0 && styles.noRadiusTopLeft,
              index > 0 && styles.noRadiusBottomLeft,
              props.value === element.key && styles.selected,
              props.value === element.key &&
                props.backgroundColorSelected && {
                  backgroundColor: props.backgroundColorSelected,
                },
              props.backgroundColorSelected && {
                borderColor: props.backgroundColorSelected,
              },
            ]}>
            <Text
              style={[
                styles.text,
                props.colorUnselected && {color: props.colorUnselected},
                props.value === element.key &&
                  props.colorSelected && {color: props.colorSelected},
              ]}>
              {element.value}
            </Text>
          </View>
        </Press>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
  },
  radioButton: {
    flexDirection: 'row',
  },
  containerRagioButton: {
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },
  noBorderLeft: {
    borderLeftWidth: 0,
  },
  noRadiusTopRight: {
    borderTopRightRadius: 0,
  },
  noRadiusTopLeft: {
    borderTopLeftRadius: 0,
  },
  noRadiusBottomLeft: {
    borderBottomLeftRadius: 0,
  },
  noRadiusBottomRight: {
    borderBottomRightRadius: 0,
  },
  selected: {
    backgroundColor: 'blue',
  },
  error: {
    borderColor: '#f00',
    color: '#f00',
  },
  text: {
    fontSize: 15,
  },
});

export default RadioButtons;
