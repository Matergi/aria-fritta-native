import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Input} from 'elements';

import strings from 'strings';

import type {Signup} from 'types';

type Props = {
  fields: Signup,
  onChangeField: (string, string) => Promise<any>,
};

export const hasError = (fields: Signup) => {
  const {password, repassword} = fields;
  if (!password || password.length === 0) {
    return 'password';
  }
  if (!repassword || repassword.length === 0) {
    return 'repassword';
  }
  if (password !== repassword) {
    return 'password';
  }

  return false;
};

const PasswordStep = ({fields, onChangeField}: Props) => (
  <View style={styles.container}>
    <Text>{strings.get('signup.steps.baseInfo.password')}</Text>
    <Input
      underline
      underlineColor="grey"
      style={styles.input}
      value={fields.password}
      onChange={value => onChangeField('password', value)}
    />
    <Text>{strings.get('signup.steps.baseInfo.repassword')}</Text>
    <Input
      underline
      underlineColor="grey"
      style={styles.input}
      value={fields.repassword}
      onChange={value => onChangeField('repassword', value)}
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
});

export default PasswordStep;
