// @flow

export default {
  dateTimeModal: {id: 'DateTimeModal'},
  pickerModal: {id: 'PickerModal'},
  webView: {id: 'WebView'},
  test: {
    id: 'Test',
  },
};

type dateTimeModal = 'DateTimeModal';
type pickerModal = 'PickerModal';
type webView = 'WebView';
type test = 'Test';

export type ScreenName = dateTimeModal | pickerModal | webView | test;
