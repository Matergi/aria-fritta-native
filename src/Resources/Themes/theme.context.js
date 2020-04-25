// @flow
import {createContext} from 'react';

import baseTheme from './base.theme';

const themeContext = createContext<Object>({
  theme: baseTheme,
});

export default themeContext;
