// @flow

import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../Text';
import Input from '../Input/Input.component';
import InputMask from '../Input/InputMask.component';
import InputSplitted from '../Input/InputSplitted.component';
import CreditCardView from './CreditCardView.component';

type Props = {
  onChange: any => void,
  name?: string,
  email?: string,
  phone?: string,
  test?: boolean,
};

const CreditCard = (props: Props) => {
  const [name, setName] = useState(props.name ?? '');
  const [number, setNumber] = useState(props.test ? '4242424242424242' : '');
  const [month, setMonth] = useState(props.test ? '12' : '');
  const [year, setYear] = useState(props.test ? '21' : '');
  const [cvc, setCvc] = useState(props.test ? '123' : '');
  const [email, setEmail] = useState(props.email ?? '');
  const [phone, setPhone] = useState(props.phone ?? '');
  const [city, setCity] = useState(props.test ? 'Rapolano Terme' : '');
  const [country, setCountry] = useState(props.test ? 'IT' : '');
  const [address, setAddress] = useState(props.test ? 'via e.pulselli 5' : '');
  const [address2, setAddress2] = useState('');
  const [postalCode, setPostalCode] = useState(props.test ? '53040' : '');
  const [state, setState] = useState(props.test ? 'Italy, Siena' : '');

  useEffect(() => {
    props.onChange({
      name,
      number,
      month,
      year,
      cvc,
      email,
      phone,
      city,
      country,
      address,
      address2,
      postalCode,
      state,
    });
  }, [
    name,
    number,
    month,
    year,
    cvc,
    email,
    phone,
    city,
    country,
    address,
    address2,
    postalCode,
    state,
  ]);

  return (
    <View>
      <View style={styles.center}>
        <CreditCardView
          number={number}
          cvc={cvc}
          expiry={`${month}/${year}`}
          name={name}
        />
      </View>
      <View style={styles.container}>
        <Text>* Nome Cognome</Text>
        <Input
          underline
          color={'#191278'}
          underlineFocusColor={'#191278'}
          underlineColor={'#191278'}
          style={styles.fullInput}
          value={name}
          onChange={value => {
            setName(value);
          }}
        />
        <Text>* Numero carta di credito</Text>
        <InputMask
          type={'credit-card'}
          options={{
            obfuscated: false,
            issuer: 'visa-or-mastercard',
          }}
          value={number}
          onChange={text => {
            setNumber(text.replace(/ /g, ''));
          }}
          underline
          color={'#191278'}
          underlineFocusColor={'#191278'}
          underlineColor={'#191278'}
          style={styles.fullInput}
        />
        <View style={styles.row}>
          <View style={styles.column}>
            <Text>* Scadenza</Text>
            <InputSplitted
              rules={[
                {id: 'credit-card-month', length: 2, placeholder: 'MM'},
                {id: 'credit-card-year', length: 2, placeholder: 'YY'},
              ]}
              values={[month, year]}
              separator="/"
              underline
              color={'#191278'}
              underlineFocusColor={'#191278'}
              underlineColor={'#191278'}
              charWidth={20}
              onChange={values => {
                setMonth(values[0]);
                setYear(values[1]);
              }}
              style={styles.expired}
            />
          </View>
          <View style={styles.column}>
            <Text>* CVC</Text>
            <Input
              underline
              color={'#191278'}
              underlineFocusColor={'#191278'}
              underlineColor={'#191278'}
              style={styles.shortInput}
              value={cvc}
              maxLength={4}
              placeholder="000"
              onChange={value => {
                setCvc(value);
              }}
            />
          </View>
        </View>
        <View style={styles.header} />
        <Text>Email</Text>
        <Input
          underline
          color={'#191278'}
          underlineFocusColor={'#191278'}
          underlineColor={'#191278'}
          style={styles.fullInput}
          value={email}
          onChange={value => {
            setEmail(value);
          }}
        />
        <Text>Phone Number</Text>
        <Input
          underline
          color={'#191278'}
          underlineFocusColor={'#191278'}
          underlineColor={'#191278'}
          style={styles.fullInput}
          value={phone}
          onChange={value => {
            setPhone(value);
          }}
        />
        <View style={styles.rowNoSpace}>
          <View style={styles.columnCountry}>
            <Text>* Nazione</Text>
            <Input
              underline
              color={'#191278'}
              underlineFocusColor={'#191278'}
              underlineColor={'#191278'}
              style={styles.country}
              value={country}
              maxLength={2}
              onChange={value => {
                setCountry(value);
              }}
            />
          </View>
          <View style={styles.columnCity}>
            <Text>* Città</Text>
            <Input
              underline
              color={'#191278'}
              underlineFocusColor={'#191278'}
              underlineColor={'#191278'}
              style={styles.city}
              value={city}
              onChange={value => {
                setCity(value);
              }}
            />
          </View>
        </View>
        <Text>* Indirizzo</Text>
        <Input
          underline
          color={'#191278'}
          underlineFocusColor={'#191278'}
          underlineColor={'#191278'}
          style={styles.fullInput}
          value={address}
          onChange={value => {
            setAddress(value);
          }}
        />
        <Text>* Indirizzo secondario</Text>
        <Input
          underline
          color={'#191278'}
          underlineFocusColor={'#191278'}
          underlineColor={'#191278'}
          style={styles.fullInput}
          value={address2}
          onChange={value => {
            setAddress2(value);
          }}
        />
        <View style={styles.rowNoSpace}>
          <View style={styles.columnPostalCode}>
            <Text style={styles.titlePostalCode}>Codice Postale</Text>
            <Input
              underline
              color={'#191278'}
              underlineFocusColor={'#191278'}
              underlineColor={'#191278'}
              style={styles.postalCode}
              value={postalCode}
              onChange={value => {
                setPostalCode(value);
              }}
            />
          </View>
          <View style={styles.columnState}>
            <Text style={styles.titleState}>* Stato</Text>
            <Input
              underline
              color={'#191278'}
              underlineFocusColor={'#191278'}
              underlineColor={'#191278'}
              style={styles.city}
              value={state}
              onChange={value => {
                setState(value);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowNoSpace: {
    flexDirection: 'row',
    width: '100%',
  },
  column: {
    flexDirection: 'column',
  },
  columnCountry: {
    flex: 2.5,
    marginRight: 10,
  },
  columnCity: {
    flex: 7.5,
    marginLeft: 10,
  },
  center: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    margin: '5%',
  },
  expired: {
    marginTop: 5,
    height: 40,
  },
  postalCode: {color: '#191278', height: 40, width: '100%', marginBottom: 20},
  fullInput: {color: '#191278', height: 30, width: '100%', marginBottom: 20},
  shortInput: {
    color: '#191278',
    height: 30,
    width: 70,
    textAlign: 'center',
    marginBottom: 20,
  },
  digit: {
    color: '#191278',
    height: 30,
    width: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
  middleInput: {
    color: '#191278',
    height: 30,
    width: 150,
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
  },
  country: {
    width: '100%',
    color: '#191278',
    height: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
  city: {
    color: '#191278',
    width: '100%',
    height: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
  columnPostalCode: {
    flex: 2,
    marginRight: 10,
  },
  columnState: {
    flex: 8,
    marginLeft: 10,
  },
  titlePostalCode: {
    height: 40,
  },
  titleState: {
    height: 40,
  },
});

export default CreditCard;
