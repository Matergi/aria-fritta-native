import screens from 'router';

export const OpenWebView = (params?: any) => {
  return (dispatch: any, getState: any, manager: Object) => {
    manager.Navigation.navigate(screens.webView.id, params);
  };
};
