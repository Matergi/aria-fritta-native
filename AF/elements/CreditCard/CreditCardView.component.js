// @flow

import React from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';

const images = require('./cardImages');

type Props = {
  number: string,
  cvc: string,
  name: string,
  expiry: string,
  type?: ?string,
  width?: number,
  height?: number,
  bgColor?: string,
  fullNameText?: string,
  imageFrontSource?: any,
  expiryBeforeText?: string,
  style?: any,
};

const CreditCard = (props: Props) => {
  const number = () => {
    let string = props.number.toString() || '';

    const maxLength = 16;

    if (string.length >= maxLength) {
      string = string.slice(0, maxLength);
    }

    while (string.length <= maxLength) {
      string += '•';
    }

    const array = [
      string.substring(0, 4),
      string.substring(4, 8),
      string.substring(8, 12),
      string.substring(12, 16),
    ];

    return array.reduce((accumulator, value, index) => {
      if (index !== 0) {
        accumulator += ' ';
      }

      return `${accumulator}${value}`;
    }, '');
  };

  const name = () => {
    if (props.name === '') {
      return (
        (props.fullNameText && props.fullNameText.toUpperCase()) ||
        'Nome Cognome'
      );
    } else {
      return props.name.toUpperCase();
    }
  };

  const expiry = () => {
    if (props.expiry === '') {
      return '••/••';
    } else {
      var _expiry = props.expiry.toString();

      const expiryMaxLength = 6;

      if (_expiry.match(/\//)) {
        _expiry = _expiry.replace('/', '');
      }

      if (!_expiry.match(/^[0-9]*$/)) {
        return '••/••';
      }

      while (_expiry.length < 4) {
        _expiry += '•';
      }

      _expiry = _expiry.slice(0, 2) + '/' + _expiry.slice(2, expiryMaxLength);
    }

    return _expiry;
  };

  const cvc = () => {
    if (props.cvc == null) {
      return '•••';
    } else {
      let string = props.cvc.toString();
      while (string.length < 3) {
        string += '•';
      }

      return string.length <= 4 ? string : string.slice(0, 4);
    }
  };

  const cardStyle = [
    styles.container,
    {
      width: props.width,
      height: props.height,
      backgroundColor: props.bgColor,
    },
    props.style,
  ];

  return (
    <View style={cardStyle}>
      <View style={[styles.front, {width: props.width, height: props.height}]}>
        {props.imageFrontSource ? (
          <Image
            source={props.imageFrontSource}
            style={[styles.bgImage, {width: props.width, height: props.height}]}
          />
        ) : null}

        <View style={styles.name}>
          <Text style={styles.textName}>{name()}</Text>
        </View>
        <View style={styles.lower}>
          <Image
            style={styles.logo}
            source={{
              uri: images.mastercard,
            }}
          />
          <View style={styles.cvcWrap}>
            <View style={styles.cvcContainer}>
              <Text style={styles.text}>cvc</Text>
              <Text style={styles.text}>{cvc()}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <View style={styles.number}>
              <Text style={styles.textNumber}>{number()}</Text>
            </View>
            <View style={styles.rowWrap}>
              <View style={styles.expiry}>
                <Text style={styles.textSmall}>
                  {props.expiryBeforeText || 'MONTH/YEAR'}
                </Text>
                <Text style={styles.textExpiry}>{expiry()}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 0,
    flex: null,
  },
  logo: {
    height: 35,
    width: 57,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  text: {
    color: '#fff',
  },
  bgImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    borderRadius: 8,
  },
  lower: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  expiry: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rowWrap: {
    flexDirection: 'row',
  },
  name: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  validthru: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textValidThru: {
    fontSize: 8,
    color: '#ddd',
    fontWeight: '900',
    backgroundColor: 'transparent',
  },
  textSmall: {
    fontSize: 8,
    color: '#ddd',
    fontWeight: '900',
    backgroundColor: 'transparent',
  },
  textNumber: {
    color: '#fff',
    fontSize: 21,
    textAlign: 'center',
    marginBottom: 22,
    backgroundColor: 'transparent',
  },
  textName: {
    color: '#fff',
    fontSize: 17,
    backgroundColor: 'transparent',
  },
  textExpiry: {
    color: '#fff',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  front: {
    flex: 1,
  },
  back: {
    flex: 1,
  },
  cvcWrap: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  cvcContainer: {
    flexDirection: 'column',
  },
  textCvc: {
    color: '#000',
    fontSize: 18,
  },
  info: {
    flex: 1,
  },
  shinyFront: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    width: 50,
    height: 40,
    position: 'absolute',
    top: 15,
    left: 20,
  },
  shinyBack: {
    backgroundColor: '#ddd',
    borderRadius: 8,
    width: 50,
    height: 40,
    position: 'absolute',
    bottom: 15,
    left: 20,
  },
  bar: {
    height: 40,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 30,
    backgroundColor: '#000',
  },
});

CreditCard.defaultProps = {
  number: null,
  cvc: null,
  name: '',
  expiry: '',
  expiryBefore: 'month/year',
  expiryAfter: 'valid thru',
  type: null,
  width: 300,
  height: 180,
  bgColor: '#191278',
};

CreditCard.CardImages = images;

export default CreditCard;
