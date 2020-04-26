import React from 'react';
import {View, StyleSheet} from 'react-native';
import Press from '../Press';
import Text from '../Text';
import Image from '../Image';
import Dependencies from 'dependencies';
import screens from 'router';

type Value = {
  key: string,
  label: string,
  value: string,
  image?: any,
};

type Props = {
  items: Array<Value>,
  value: string,
  shown: string,
  image: any,
  error?: boolean,
  underlineColor?: string,
  color?: string,
  default?: string,
};

const PickerComponent = (props: Props) => {
  return (
    <Press
      style={[styles.container, props.style]}
      onPress={() => {
        Dependencies.Navigation.navigate(screens.pickerModal.id, {
          ...props,
        });
      }}>
      <View style={styles.row}>
        {props.image && <Image style={styles.image} image={props.image} />}
        <Text
          style={[
            styles.value,
            props.shown &&
              props.shown !== '' &&
              props.color && {color: props.color},
          ]}>
          {props.shown && props.shown !== '' ? props.shown : props.default}
        </Text>
      </View>
      <View
        style={[
          styles.underline,
          props.error && styles.error,
          props.underlineColor && {backgroundColor: props.underlineColor},
        ]}
      />
      <View />
    </Press>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    marginTop: 8.5,
    textAlign: 'center',
    color: 'rgba(180, 180, 180, 1)',
  },
  underline: {
    backgroundColor: '#000',
    width: '100%',
    height: 1,
    position: 'absolute',
    bottom: 0,
  },
  error: {
    backgroundColor: '#f00',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 30,
    height: 20,
  },
});

export default PickerComponent;
