// @flow

import ThemeComponent from './themesProvider.component';

import ThemeContext from './theme.context';

import ThemeCustomer from './customer.theme';
import ThemeProfessionist from './professionist.theme';
import ThemeBase from './base.theme';

import type {Theme} from './base.theme.js';
export type {Theme};

export default ThemeContext;
export {ThemeComponent, ThemeBase, ThemeCustomer, ThemeProfessionist};
