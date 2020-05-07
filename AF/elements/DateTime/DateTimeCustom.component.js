// @flow

import React from 'react';
import {View} from 'react-native';
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
  children: any,
  minimumDate?: any,
  maximumDate?: any,
};

const DateTime = (props: Props) => {
  return (
    <View style={props.style}>
      <Press
        onPress={() => {
          Dependencies.Navigation.navigate(screens.dateTimeModal.id, {
            mode: props.mode,
            date: props.value && props.value.toDate(),
            minimumDate: props.minimumDate && props.minimumDate.toDate(),
            maximumDate: props.maximumDate && props.maximumDate.toDate(),
            save: (date: Date) => {
              props.onChange && props.onChange(moment(date));
            },
          });
        }}>
        {props.children &&
          props.children(
            props.value && props.value !== ''
              ? props.value.format('YYYY-MM-DD')
              : props.default,
          )}
      </Press>
      <View />
    </View>
  );
};

export default DateTime;
