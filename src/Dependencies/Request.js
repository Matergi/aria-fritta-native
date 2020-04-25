// @flow
import {StartLoading, StopLoading} from 'StateUpdaters';
import {Alert} from 'react-native';

const getHeader = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

const getFile = {
  method: 'GET',
  headers: {},
};

const postHeader = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const putHeader = {
  method: 'PUT',
  headers: {},
};

const deleteHeader = {
  method: 'DELETE',
  headers: {},
};

const stripePost = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

const postImage = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

type REST =
  | 'POST'
  | 'PUT'
  | 'GET'
  | 'DELETE'
  | 'FILE'
  | 'POST-STRIPE'
  | 'POST-IMAGE';

type DetailRequest = {
  url: string,
  query?: Object,
  body?: Object,
  method: REST,
  token: string,
  headers: Object,
  disableCheck?: boolean,
  dispatch: any,
  loadingId: string,
  withStatus?: Array<number>,
  image?: Blob,
};

export default async (detail: DetailRequest): Promise<any> => {
  detail.dispatch && detail.dispatch(StartLoading(detail.loadingId));
  let options = {};
  const formData = new FormData();

  if (detail.body) {
    Object.keys(detail.body).forEach(key => {
      if (detail.body) {
        formData.append(key, detail.body[key]);
      }
    });
  }

  if (detail.image) {
    formData.append('image', detail.image);
  }

  switch (detail.method) {
    case 'POST':
      options = postHeader;
      options = {...options, body: JSON.stringify(detail.body)};
      break;
    case 'PUT':
      options = putHeader;
      options = {...options, body: JSON.stringify(detail.body)};
      break;
    case 'DELETE':
      options = deleteHeader;
      options = {...options, body: JSON.stringify(detail.body)};
      break;
    case 'FILE':
      options = getFile;
      options = {...options, body: JSON.stringify(detail.body)};
      break;
    case 'POST-STRIPE':
      options = stripePost;
      options = {
        ...options,
        body:
          detail.body &&
          Object.keys(detail.body).reduce((accumulator, key, index) => {
            return `${accumulator}${key}=${
              detail.body ? detail.body[key] : ''
            }&`;
          }, ''),
      };
      break;
    case 'POST-IMAGE':
      options = postImage;
      options = {...options, body: formData};
      break;
    default:
      options = getHeader;
      options = {...options};
      break;
  }

  if (detail.token) {
    options = {
      ...options,
      headers: {...options.headers, Authorization: `Bearer ${detail.token}`},
    };
  }

  let {url} = detail;
  if (detail.query) {
    url = Object.keys(detail.query).reduce(
      (accumulator, current, index): string => {
        let newAccumultator = accumulator;
        if (!newAccumultator || !detail.query) {
          return '';
        }

        if (index !== 0) {
          newAccumultator += '&';
        }

        newAccumultator += `${current}=${detail.query[current]}`;
        return newAccumultator;
      },
      `${url}?`,
    );
  }

  console.log(url);
  console.log(options);

  const result = await fetch(url, options);
  const response = await result.json();
  detail.dispatch && detail.dispatch(StopLoading());

  console.log(response);

  if (detail.disableCheck) {
    if (detail.withStatus) {
      return {
        value: response,
        status: result.status,
      };
    }
    return response;
  }

  if (result.status >= 200 && result.status < 300) {
    if (detail.method === 'FILE') {
      return result;
    }

    if (detail.withStatus && detail.withStatus.includes(result.status)) {
      return {
        value: response.result,
        error: response.error,
        status: result.status,
      };
    }

    if (response.error != null) {
      Alert.alert(
        'Attenzione',
        response.error.code_description,
        [{text: 'Ok'}],
        {
          cancelable: true,
        },
      );
      throw new Error(response.error);
    }

    return response.result;
  }

  if (detail.withStatus && detail.withStatus.includes(result.status)) {
    return {
      value: response.result,
      error: response.error,
      status: result.status,
    };
  }

  console.log(response.error.addictional_description);
  Alert.alert(
    'Attenzione',
    `${
      response.error.code_description
    } \n ${response.error.addictional_description.join('\n')}`,
    [{text: 'Ok'}],
    {
      cancelable: true,
    },
  );
  throw new Error(response.error);
};
