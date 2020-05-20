// @flow

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input, DateTime, RadioButtons} from 'elements';

import moment from 'moment';

import strings from 'strings';

import type {Signup} from 'types';

type Props = {
  fields: Signup,
  onChangeField: (string, string) => Promise<any>,
};

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const hasError = (fields: Signup) => {
  const {name, surname, email, birthdate, gender} = fields;
  if (!name || name.length === 0) {
    return 'name';
  }
  if (!surname || surname.length === 0) {
    return 'surname';
  }
  if (!email || email.length === 0 || !validateEmail(email)) {
    return 'email';
  }
  if (!birthdate || birthdate.length === 0) {
    return 'birthdate';
  }
  if (!gender || gender.length === 0) {
    return 'gender';
  }

  return false;
};

const BaseInfoStep = ({fields, onChangeField}: Props) => (
  <View style={styles.container}>
    <Text>{strings.get('signup.steps.baseInfo.name')}</Text>
    <Input
      underline
      underlineColor="grey"
      style={styles.input}
      value={fields.name}
      onChange={value => {
        onChangeField && onChangeField('name', value);
      }}
    />
    <Text>{strings.get('signup.steps.baseInfo.surname')}</Text>
    <Input
      underline
      underlineColor="grey"
      style={styles.input}
      value={fields.surname}
      onChange={value => {
        onChangeField && onChangeField('surname', value);
      }}
    />
    <Text>{strings.get('signup.steps.baseInfo.email')}</Text>
    <Input
      underline
      underlineColor="grey"
      style={styles.input}
      value={fields.email}
      onChange={value => {
        onChangeField && onChangeField('email', value);
      }}
    />
    <Text>{strings.get('signup.steps.baseInfo.birthdate')}</Text>
    <DateTime
      mode={'date'}
      underline
      underlineColor="grey"
      style={styles.input}
      default={strings.get('signup.steps.baseInfo.birthdatePlaceHolder')}
      value={fields.birthdate && moment(fields.birthdate)}
      onChange={value => {
        onChangeField && onChangeField('birthdate', value.format('YYYY-MM-DD'));
      }}
    />
    <Text>{strings.get('signup.steps.baseInfo.gender')}</Text>
    <RadioButtons
      style={styles.radioButton}
      elements={[{key: 'M', value: 'M'}, {key: 'F', value: 'F'}]}
      value={fields.gender}
      onChange={value => {
        onChangeField && onChangeField('gender', value);
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    flexDirection: 'column',
  },
  input: {
    height: 50,
    marginBottom: 20,
  },
  radioButton: {
    height: 45,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default BaseInfoStep;
