// @flow

import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Text from '../Text';
import Press from '../Press';
import Dependencies from 'dependencies';
import DatePicker from 'react-native-date-picker';

type Props = {
  close: () => void,
  route: any,
};

const DateTimeModal = (props: Props) => {
  const [pop, setPop] = useState(true);
  const {dateParam, save, mode} = props.route.params ?? {};
  const [date, setDate] = useState(dateParam ?? new Date());

  return (
    <View style={[styles.containerDatePicker]}>
      <View style={styles.actionContainer}>
        <Press
          style={styles.discard}
          onPress={() => {
            pop && Dependencies.Navigation.pop();
            setPop(false);
          }}>
          <Text>annulla</Text>
        </Press>
        <Press
          style={styles.save}
          onPress={() => {
            save && save(date);
            pop && Dependencies.Navigation.pop();
            setPop(false);
          }}>
          <Text>salva</Text>
        </Press>
      </View>
      <DatePicker
        mode={mode}
        style={styles.dateTime}
        date={date}
        onDateChange={setDate}
      />
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
  dateTime: {
    width: Dimensions.get('screen').width,
  },
  save: {
    padding: 20,
  },
  discard: {
    padding: 20,
  },
});

DateTimeModal.defaultProps = {
  route: {},
};

export default DateTimeModal;
