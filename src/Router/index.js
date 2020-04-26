// @flow

export default {
  dateTimeModal: {id: 'DateTimeModal'},
  pickerModal: {id: 'PickerModal'},
  webView: {id: 'WebView'},
  test: {
    id: 'Test',
  },
  login: {
    id: 'Login',
  },
  home: {
    id: 'Home',
  },
  signup: {
    id: 'Signup',
  },
  recoverPassword: {
    id: 'RecoverPassword',
  },
};

type dateTimeModal = 'DateTimeModal';
type pickerModal = 'PickerModal';
type webView = 'WebView';
type test = 'Test';
type login = 'Login';
type home = 'Home';
type singup = 'Signup';
type recoverPassword = 'RecoverPassword';

export type ScreenName =
  | dateTimeModal
  | pickerModal
  | webView
  | test
  | login
  | home
  | singup
  | recoverPassword;
