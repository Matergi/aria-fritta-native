// @flow

import internalizations from './internalizations';

let language;
let dict;
let refreshPage;

const test = false;

class Language {
  static init = (lang: string, refreshPageParam: void) => {
    language = lang;
    dict = internalizations[language];
    refreshPage = refreshPageParam;
  };

  static get = (key: string, variables?: Object): string => {
    if (test) {
      dict = internalizations.test;
    } else if (!dict) {
      dict = internalizations.en;
    }

    const subVariables = key && typeof key === 'string' && key.split('.');

    if (!subVariables) {
      // eslint-disable-next-line no-alert
      alert(key + ' not valid');
      return '';
    }

    let value: string = '';
    let element;

    subVariables.forEach(variable => {
      if (element !== undefined) {
        element = element[variable];
      } else {
        element = dict[variable];
      }
      value = element;
    });

    if (!value) {
      // eslint-disable-next-line no-alert
      alert(key + ' not found');
    } else if (variables) {
      Object.keys(variables).forEach(keyVariable => {
        value = value.replace(
          new RegExp(`{${keyVariable}}`, 'g'),
          variables[keyVariable],
        );
      });
    }

    return value;
  };

  static setLanguage = (lang: string) => {
    language = lang;
    dict = internalizations[lang];
    refreshPage && refreshPage();
  };

  static getLanguage = () => {
    return language;
  };
}

export default Language;
