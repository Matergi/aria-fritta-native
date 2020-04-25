// @flow

import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Press from '../Press';
import Text from '../Text';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {getStatusBarHeight} from 'react-native-status-bar-height';

type Page = {
  ui: any,
  text: string,
  icon: any,
  iconSelected: any,
};

type Props = {
  pages: Array<Page>,
  backgroundColorScreen?: string,
  style?: any,
  textStyle?: any,
  textStyleSelected?: any,
};

const BottomBarComponent = (props: Props) => {
  const [page, setPage] = useState(0);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: props.backgroundColorScreen},
      ]}>
      {props.pages.find((_, index) => index === page)?.ui}
      <View style={[styles.bottomBar, props.style]}>
        <View style={styles.wrapBottomBar}>
          {props.pages.map((tab, index) => (
            <Press
              key={tab.text}
              style={[
                styles.wrapItem,
                {
                  width: Dimensions.get('window').width / props.pages.length,
                },
              ]}
              onPress={() => {
                setPage(index);
              }}>
              <View style={styles.wrapIcon}>
                {index === page ? (
                  <View style={styles.icon}>{tab.iconSelected}</View>
                ) : (
                  <View style={styles.icon}>{tab.icon}</View>
                )}
              </View>

              <View style={styles.wrapText}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={[
                    styles.text,
                    index === page ? props.textStyleSelected : props.textStyle,
                  ]}>
                  {tab.text}
                </Text>
              </View>
            </Press>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: getStatusBarHeight(),
    paddingBottom: '10%',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    height: '13%',
    width: '100%',
    paddingTop: 5,
  },
  wrapBottomBar: {
    position: 'relative',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    paddingBottom: getBottomSpace() / 1.5,
  },
  wrapItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
    // backgroundColor: 'orange',
  },
  wrapText: {
    width: '100%',
    height: '40%',
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    // backgroundColor: 'grey',
  },
  wrapIcon: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  icon: {
    // backgroundColor: 'red',
  },
});

export default BottomBarComponent;
