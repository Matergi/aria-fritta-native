// @flow

import type {Card, BillingDetails, EditableCard} from './Stripe';
export type {Card, BillingDetails, EditableCard};

import {
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} from './Stripe';

import {
  tips,
  geocodingWithId,
  reverseGeocoding,
  findMyLocation,
} from './Locations';

import {ChangeScreen, BackScreen} from './Screen';

import {OpenWebView} from './WebView';

import {LoginWithFacebook} from './Facebook';

const locations = {
  tips,
  geocodingWithId,
  reverseGeocoding,
  findMyLocation,
};

import {Login, Signup, ConfirmPhoneNumber, InfoUser, Logout} from './Profile';

import {
  RecoverPassword,
  ConfirmPhoneNumberForRecoverPassword,
  ResetPassword,
} from './RecoverPassword';

export {
  locations,
  ChangeScreen,
  BackScreen,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  OpenWebView,
  LoginWithFacebook,
  Login,
  Signup,
  ConfirmPhoneNumber,
  RecoverPassword,
  ConfirmPhoneNumberForRecoverPassword,
  InfoUser,
  ResetPassword,
  Logout,
};
