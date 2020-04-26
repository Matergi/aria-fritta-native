// @flow

import React, {useContext} from 'react';
import {SafeAreaView, View, StyleSheet, ScrollView} from 'react-native';
import {Screen} from 'dimensions';
import {Text, Press} from 'elements';
import Back from 'images/screen/back.svg';
import {connect} from 'react-redux';
import {BackScreen} from 'SideEffects';
import ThemeContext from 'themes';

type Props = {
  children: any,
  title?: string,
  back: () => void,
  style?: Object,
  hide?: boolean,
  scrollable?: boolean,
  bottomSpace?: boolean,
};

const ScreenWithHeader = (props: Props) => {
  const {theme} = useContext(ThemeContext);
  if (props.hide) {
    return props.children;
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        props.style,
        {backgroundColor: theme.screen.backgroundColor},
        props.bottomSpace === false && styles.noPaddingBottom,
      ]}>
      <View
        style={[
          styles.header,
          {backgroundColor: theme.screen.backgroundColor},
        ]}>
        <Text style={[styles.title, {color: theme.headerTextColor}]}>
          {props.title}
        </Text>
        <Press
          style={[
            styles.navigation,
            {backgroundColor: theme.screen.backgroundColor},
          ]}
          onPress={() => {
            props.back();
          }}>
          <Back color={theme.headerTextColor} />
        </Press>
      </View>
      {props.scrollable ? (
        <ScrollView>{props.children}</ScrollView>
      ) : (
        <View style={styles.screen}>{props.children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    position: 'relative',
  },
  navigation: {
    width: 'auto',
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    zIndex: 2,
    height: Screen.heightNavigationBar,
  },
  header: {
    position: 'relative',
    zIndex: 2,
    height: Screen.heightNavigationBar,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    // fontWeight: '500',
  },
  noPaddingBottom: {
    paddingBottom: 0,
  },
  screen: {
    flex: 1,
    position: 'relative',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    back: () => {
      dispatch(BackScreen());
    },
  };
};

export default connect(
  undefined,
  mapDispatchToProps,
)(ScreenWithHeader);
