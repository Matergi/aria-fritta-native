// @flow

export const tips = (input: string, uuidSession: string) => {
  return (dispatch: any, getState: any, manager: Object) => {
    return manager.Request({
      url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      method: 'GET',
      query: {
        input,
        key: manager.googleConfig.places_api_key,
        types: 'address',
        sessiontoken: uuidSession,
      },
      disableCheck: true,
    });
  };
};

export const geocodingWithId = (placeid: string) => {
  return (dispatch: any, getState: any, manager: Object) => {
    return manager.Request({
      url: 'https://maps.googleapis.com/maps/api/place/details/json',
      method: 'GET',
      query: {
        placeid,
        key: manager.googleConfig.places_api_key,
      },
      disableCheck: true,
    });
  };
};

export const reverseGeocoding = (latitude: number, longitude: number) => {
  return (dispatch: any, getState: any, manager: Object) => {
    return manager.Request({
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      method: 'GET',
      query: {
        latlng: `${latitude},${longitude}`,
        key: manager.googleConfig.places_api_key,
      },
      disableCheck: true,
    });
  };
};

export const findMyLocation = () => {
  return (dispatch: any, getState: any, manager: Object): Promise<any> => {
    const promise = new Promise((resolve, reject) => {
      manager.Permissions.checkAndRequestIfNecessary(
        manager.Permissions.PERMISSIONS_LOCATION_WHEN_IN_USE,
      )
        .then(() => {
          manager.Geolocation.getCurrentPosition(
            info => resolve(info),
            error => {
              reject(error);
            },
          );
        })
        .catch(error => {
          reject(error);
        });
    });

    return promise;
  };
};
