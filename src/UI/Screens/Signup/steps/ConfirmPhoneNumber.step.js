// @flow

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'elements';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import strings from 'strings';

import type {Signup} from 'types';

type Props = {
  fields: Signup,
  onChangeField: (string, string) => Promise<any>,
};

const CELL_COUNT = 5;

export const hasError = (fields: Signup) => {
  const {verificationNumber} = fields;
  if (!verificationNumber || verificationNumber.length !== 5) {
    return 'verificationNumber';
  }

  return false;
};

const ConfirmPhoneNumber = ({fields, onChangeField}: Props) => {
  const ref = useBlurOnFulfill({
    value: fields.verificationNumber,
    cellCount: CELL_COUNT,
  });

  const [propsCode, getCellOnLayoutHandler] = useClearByFocusCell({
    value: fields.verificationNumber,
    setValue: value => onChangeField('verificationNumber', value),
  });

  return (
    <View style={styles.container}>
      <Text>{strings.get('signup.steps.baseInfo.confirmPhoneNumber')}</Text>
      <CodeField
        ref={ref}
        {...propsCode}
        size={500}
        onFocus={() => onChangeField('verificationNumber', '')}
        rootStyle={styles.codeFiledRoot}
        value={fields.verificationNumber}
        onChangeText={value => onChangeField('verificationNumber', value)}
        inputPosition="center"
        cellCount={CELL_COUNT}
        keyboardType="number-pad"
        renderCell={({index, symbol, isFocused}) => {
          return (
            <View
              key={`id${index}`}
              style={[styles.wrapCell, isFocused && styles.cellFocus]}>
              <Text
                key={index}
                style={[styles.cell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {isFocused ? <Cursor /> : symbol ? symbol /*'👌'*/ : null}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

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
  cell: {
    width: '100%',
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    textAlign: 'center',
  },
  wrapCell: {
    width: '15%',
    borderBottomWidth: 1,
    borderColor: '#00000030',
  },
  cellFocus: {
    borderColor: 'blue',
  },
});

export default ConfirmPhoneNumber;
