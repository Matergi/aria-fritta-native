// @flow
import * as React from 'react';

const navigationRef: any = React.createRef();

const navigate = (routeName: string, params: any) => {
  let paramsToPass;
  if (params && Object.keys(params).length > 0) {
    paramsToPass = params;
  }

  navigationRef.current &&
    navigationRef.current.navigate(routeName, paramsToPass);
};

const reset = (routeName: string) => {
  navigationRef.current &&
    navigationRef.current.reset({
      index: 0,
      routes: [{name: routeName}],
    });
};

const pop = () => {
  navigationRef.current && navigationRef.current.goBack();
};

// add other navigation functions that you need and export them

export default {
  navigate,
  pop,
  reset,
  navigationRef,
};
