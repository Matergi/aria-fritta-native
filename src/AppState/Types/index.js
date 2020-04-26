// @flow strict

import type {ScreenName} from 'router';

export type RecoverPassword = {
  countryPhoneNumberKey: string,
  countryPhoneNumber: string,
  phoneNumber: string,
  verificationNumber: string,
  password: string,
  repassword: string,
};

export type Gender = 'M|F';

export type Signup = {
  name: string,
  surname: string,
  email: string,
  birthdate: string,
  gender: Gender,
  password: string,
  repassword: string,
  countryPhoneNumberKey: string,
  countryPhoneNumber: string,
  phoneNumber: string,
  verificationNumber: string,
};

export type InfoUser = {
  +name: string,
};

export type User = {
  +info: InfoUser,
  +token: string,
};

export type RouterScreen = {
  +id: ScreenName,
};

export type State = {
  version: string,
  screen: RouterScreen,
  signup?: Signup,
  recoverPassword?: RecoverPassword,
  user?: User,
  loading?: string,
};
