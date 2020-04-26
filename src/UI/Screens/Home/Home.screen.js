// @flow

import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text} from 'elements';

import {connect} from 'react-redux';

import strings from 'strings';

import type {State, InfoUser} from 'types';

type Props = {
  user: InfoUser,
};

const HomeScreen = ({user}: Props) => (
  <SafeAreaView>
    <Text>{`${strings.get('home.hi')} ${user.name}`}</Text>
  </SafeAreaView>
);

const mapStateToProps = (state: State) => ({
  user: state.user?.info,
});

export default connect(mapStateToProps)(HomeScreen);
