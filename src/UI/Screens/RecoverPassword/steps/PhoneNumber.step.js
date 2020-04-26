import React, {useState} from 'react';
import {View, StyleSheet, NativeModules} from 'react-native';
import {Text, Input, Picker} from 'elements';
import CountriesNumber from 'countriesNumber';

import strings from 'strings';

const BridgeInfo = NativeModules.BridgeInfo;

import type {Signup} from 'types';

type Props = {
  fields: Signup,
  onChangeField: (string, string) => Promise<any>,
};

export const hasError = (fields: Signup) => {
  const {countryPhoneNumber, phoneNumber} = fields;
  if (!countryPhoneNumber || countryPhoneNumber.length === 0) {
    return 'countryPhoneNumber';
  }
  if (!phoneNumber || phoneNumber.length === 0) {
    return 'phoneNumber';
  }

  return false;
};

const PhoneNumberStep = ({fields, onChangeField}: Props) => {
  const [country, setCountry] = useState(undefined);
  BridgeInfo.getCountry()
    .then(countryPhone => setCountry(countryPhone))
    .catch(() => setCountry(''));

  if (country === undefined) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Text>{strings.get('signup.steps.baseInfo.phoneNumber')}</Text>
      <View style={styles.phoneNumber}>
        <Picker
          underlineColor={'grey'}
          style={styles.country}
          value={
            fields.countryPhoneNumberKey
              ? fields.countryPhoneNumberKey
              : country.split('_')[0].split('-')[0]
          }
          shown={
            fields.countryPhoneNumber ??
            CountriesNumber.find(
              countryFind =>
                countryFind.iso2.toLowerCase() ===
                country
                  .split('_')[0]
                  .split('-')[0]
                  .toLowerCase(),
            )?.dialCode
          }
          image={
            CountriesNumber.find(
              countryFind => countryFind.iso2 === fields.countryPhoneNumberKey,
            )?.image
          }
          onChange={countryChanged => {
            const countryFinded = CountriesNumber.find(
              countryFind => countryFind.iso2 === countryChanged,
            );

            onChangeField('countryPhoneNumberKey', countryFinded?.iso2);
            onChangeField('countryPhoneNumber', countryFinded?.dialCode);
          }}
          items={[
            {
              iso2: 'nothing',
              name: 'seleziona una country code',
              dialCode: '',
              image: undefined,
            },
            ...CountriesNumber,
          ].map(countryField => ({
            key: countryField.iso2,
            label: countryField.name,
            image: countryField.image,
            value: countryField.dialCode,
          }))}
        />
        <Input
          underline
          underlineColor="grey"
          style={styles.input}
          value={fields.phoneNumber}
          onChange={value => onChangeField('phoneNumber', value)}
        />
      </View>
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
  phoneNumber: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  input: {
    width: '60%',
    height: 40,
    marginBottom: 20,
  },
  country: {
    height: 40,
    width: '30%',
  },
});

export default PhoneNumberStep;
