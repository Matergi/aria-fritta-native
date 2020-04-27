// @flow

export default {
  // Elements
  dateTimeModal: {id: 'DateTimeModal'},
  pickerModal: {id: 'PickerModal'},
  webView: {id: 'WebView'},

  // App
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
  detail: {
    id: 'Detail',
  },
};

// Elements
type dateTimeModal = 'DateTimeModal';
type pickerModal = 'PickerModal';
type webView = 'WebView';

// App
type test = 'Test';
type login = 'Login';
type home = 'Home';
type singup = 'Signup';
type recoverPassword = 'RecoverPassword';
type detail = 'Detail';

export type ScreenName =
  | dateTimeModal
  | pickerModal
  | webView
  | test
  | login
  | home
  | singup
  | recoverPassword
  | detail;
