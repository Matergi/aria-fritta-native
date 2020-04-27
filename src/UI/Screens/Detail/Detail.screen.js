// @flow

import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Test from 'images/test.jpg';
import {SharedElement} from 'react-navigation-shared-element';

type Props = {
  route: any,
};

const DetailScreen = ({route}: Props) => {
  const {detailId} = route.params ?? {};

  return (
    <View>
      <SharedElement id={`item-${detailId}`}>
        <Image style={styles.image} source={Test} />
      </SharedElement>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 400,
  },
});

DetailScreen.defaultProps = {
  route: {},
};

export default DetailScreen;
