import {modal, modalWithoutBackground} from './transitions';

import {DateTimeModal, PickerModal, WebView} from 'elements';

import {Test} from 'screens';

import screens from './index';

type Screen = {
  router: RouterScreen,
  ui: any,
  navigationOptions?: any,
  sharedElementsConfig?: any,
};

const routerScreens: Array<Screen> = [
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
  {
    router: screens.test,
    ui: Test,
    // sharedElementsConfig: (route, otherRoute, showing) => {
    //   if (otherRoute.name === screens.appointmentConfiguration.id) {
    //     return;
    //   }
    //   const {categoryId} = route.params;
    //   return [`category-image-${categoryId}`, `category-title-${categoryId}`];
    // },
  },
];

export default routerScreens;
