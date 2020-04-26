// @flow

import React, {useState} from 'react';
import {View, Picker, StyleSheet, Dimensions} from 'react-native';
import Text from '../Text';
import Press from '../Press';
import Dependencies from 'dependencies';

type Props = {
  route: any,
};

const PickerModal = (props: Props) => {
  const [pop, setPop] = useState(true);

  const {value, items, onChange} = props.route.params ?? {};
  const [county, setCountry] = useState(value);

  const countryFinded = items.find(
    item => county && county.toLowerCase() === item.key.toLowerCase(),
  );
  return (
    <View style={[styles.containerDatePicker]}>
      <View style={styles.actionContainer}>
        <Press
          style={styles.discard}
          onPress={() => {
            pop && Dependencies.Navigation.pop();
            setPop(false);
          }}>
          <Text>Annulla</Text>
        </Press>
        <Press
          style={styles.save}
          onPress={() => {
            onChange &&
              onChange(
                items.find(
                  item => county.toLowerCase() === item.key.toLowerCase(),
                ).key,
              );
            pop && Dependencies.Navigation.pop();
            setPop(false);
          }}>
          <Text>Salva</Text>
        </Press>
      </View>
      <Picker
        selectedValue={countryFinded && countryFinded.key}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => {
          setCountry(itemValue);
        }}>
        {items.map(item => (
          <Picker.Item
            key={item.key}
            label={`${item.label}`}
            value={item.key}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  containerDatePicker: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    backgroundColor: '#fff',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    width: Dimensions.get('screen').width,
  },
  save: {
    padding: 20,
  },
  discard: {
    padding: 20,
  },
});

PickerModal.defaultProps = {
  route: {},
};

export default PickerModal;
