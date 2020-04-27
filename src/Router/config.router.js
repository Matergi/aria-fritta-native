import {modal, modalWithoutBackground} from './transitions';

import {DateTimeModal, PickerModal, WebView} from 'elements';

import {Test, Login, Home, Signup, RecoverPassword, Detail} from 'screens';

import screens from './index';

type Screen = {
  router: RouterScreen,
  ui: any,
  navigationOptions?: any,
  sharedElementsConfig?: any,
};

const routerScreens: Array<Screen> = [
  // Elements
  {
    router: screens.dateTimeModal,
    ui: DateTimeModal,
    navigationOptions: modalWithoutBackground,
  },
  {
    router: screens.pickerModal,
    ui: PickerModal,
    navigationOptions: modalWithoutBackground,
  },
  {
    router: screens.webView,
    ui: WebView,
    navigationOptions: modal,
  },

  // App
  {
    router: screens.test,
    ui: Test,
  },
  {
    router: screens.login,
    ui: Login,
  },
  {
    router: screens.home,
    ui: Home,
  },
  {
    router: screens.signup,
    ui: Signup,
  },
  {
    router: screens.recoverPassword,
    ui: RecoverPassword,
  },
  {
    router: screens.detail,
    ui: Detail,
    sharedElementsConfig: (route, otherRoute, showing) => {
      // if (otherRoute.name === screens.appointmentConfiguration.id) {
      //   return;
      // }

      const {detailId} = route.params ?? {};
      return [`item-${detailId}`];
    },
  },
];

export default routerScreens;
