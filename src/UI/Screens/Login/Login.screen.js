// @flow

import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Text, Press, Input} from 'elements';

import {connect} from 'react-redux';
import {Login, ChangeScreen, LoginWithFacebook} from 'SideEffects';

import strings from 'strings';
import screens from 'router';

import NextIcon from 'images/signup/next.svg';
import FacebookIcon from 'images/signup/facebook.svg';

const WIDTH_CIRCULAR = 70;

type Props = {
  login: (string, string) => Promise<any>,
  loginWithFacebook: () => Promise<string>,
  openSignup: () => Promise<any>,
  openRecoverPassword: () => Promise<any>,
};

const LoginScreen = ({
  login,
  loginWithFacebook,
  openSignup,
  openRecoverPassword,
}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.bottomActions}>
          <Text
            style={[styles.bottomActionItem, styles.bottomActionItemLeft]}
            textStyle={styles.underline}
            onPress={() => {
              openSignup();
            }}>
            {strings.get('login.signup')}
          </Text>
          <Text
            style={[styles.bottomActionItem, styles.bottomActionItemRight]}
            textStyle={styles.underline}
            onPress={() => {
              openRecoverPassword();
            }}>
            {strings.get('login.forgotPassword')}
          </Text>
        </View>
        <View style={styles.spaceFromActionAndCircularSection} />
        <View style={styles.circularSection}>
          <Press
            style={styles.circularItem}
            onPress={() => {
              loginWithFacebook();
            }}>
            <FacebookIcon style={styles.icon} />
          </Press>
          <Press
            style={styles.circularItem}
            onPress={() => {
              login(email, password);
            }}>
            <NextIcon style={styles.icon} />
          </Press>
        </View>
        <View style={styles.circularSectionAndForm} />
        <Input
          style={styles.input}
          underline
          underlineColor={'grey'}
          onChange={setPassword}
          value={password}
        />
        <Text>{strings.get('login.password')}</Text>
        <View style={styles.spaceFromInput} />
        <Input
          style={styles.input}
          underline
          underlineColor={'grey'}
          onChange={setEmail}
          value={email}
        />
        <Text>{strings.get('login.email')}</Text>
        <Text style={styles.title}>{strings.get('login.welcomeBack')}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 30,
    flexDirection: 'column-reverse',
  },
  bottomActions: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomActionItem: {
    flex: 1,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  bottomActionItemLeft: {
    textAlign: 'left',
  },
  bottomActionItemRight: {
    textAlign: 'right',
  },
  spaceFromActionAndCircularSection: {
    height: '15%',
  },
  circularSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circularItem: {
    width: WIDTH_CIRCULAR,
    height: WIDTH_CIRCULAR,
    borderRadius: WIDTH_CIRCULAR / 2,
    backgroundColor: '#41464d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularSectionAndForm: {
    height: '5%',
  },
  input: {
    height: 50,
    letterSpacing: 50,
  },
  spaceFromInput: {
    height: '4%',
  },
  icon: {
    transform: [{scale: 0.6}],
  },
  title: {
    position: 'absolute',
    top: '10%',
    left: 30,
    fontWeight: '600',
    fontSize: 35,
  },
});

const mapDisaptchToProps = dispatch => ({
  login: (email: string, password: string) => dispatch(Login(email, password)),
  loginWithFacebook: () => dispatch(LoginWithFacebook()),
  openSignup: () => dispatch(ChangeScreen(screens.signup)),
  openRecoverPassword: () => dispatch(ChangeScreen(screens.recoverPassword)),
});

export default connect(
  undefined,
  mapDisaptchToProps,
)(LoginScreen);
