// @flow

import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text, Press} from 'elements';
import {connect} from 'react-redux';
import type {State} from 'types';
import {tips} from 'SagaEffects';

type Props = {
  tips: (string, string) => void,
};

const Test = ({tips}: Props) => (
  <SafeAreaView>
    <Text>Test</Text>
    <Press
      onPress={() => {
        tips('via e pul', '100');
      }}>
      <Text>run place hint</Text>
    </Press>
  </SafeAreaView>
);

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = dispatch => ({
  tips: (input: string, uuidSession: string) => {
    dispatch(tips(input, uuidSession));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Test);
