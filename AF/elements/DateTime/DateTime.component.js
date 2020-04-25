// @flow

import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../Text';
import Press from '../Press';
import Dependencies from 'dependencies';
import screens from 'router';
import moment from 'moment';

type mode = 'datetime' | 'date' | 'time';

type Props = {
  value?: any,
  mode: mode,
  style?: any,
  onChange: any => void,
  error?: boolean,
  underlineColor?: string,
  color?: string,
  default?: string,
};

const DateTime = (props: Props) => {
  return (
    <View style={props.style}>
      <Press
        onPress={() => {
          Dependencies.Navigation.navigate(screens.dateTimeModal.id, {
            mode: props.mode,
            date: props.value && props.value.toDate(),
            save: (date: Date) => {
              props.onChange && props.onChange(moment(date));
            },
          });
        }}>
        <Text
          style={[
            styles.date,
            props.value &&
              props.value !== '' &&
              props.color && {color: props.color},
          ]}>
          {props.value && props.value !== ''
            ? props.value.format('YYYY-MM-DD')
            : props.default}
        </Text>
        <View
          style={[
            styles.underline,
            props.error && styles.error,
            props.underlineColor && {backgroundColor: props.underlineColor},
          ]}
        />
      </Press>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  date: {
    marginTop: 4,
    color: 'rgba(180, 180, 180, 1)',
  },
  underline: {
    backgroundColor: '#000',
    width: '100%',
    height: 1,
    marginTop: 9,
  },
  showDatePicker: {
    position: 'absolute',
    bottom: 0,
  },
  error: {
    backgroundColor: '#f00',
  },
});

export default DateTime;
