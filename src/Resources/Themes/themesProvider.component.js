// @flow

import React, { useState } from 'react';
import ThemeContext from './theme.context';

import customerTheme from './customer.theme';
import professionistTheme from './professionist.theme';

import type { Theme } from './base.theme';

type Props = {
  children: any,
};

const ThemeProvider = (props: Props) => {
  const changeTheme = (theme: Theme) => {
    changeStateTheme(prevState => {
      return {
        ...prevState,
        theme,
      };
    });
  };

  const State = {
    theme: professionistTheme,
    changeTheme,
  };

  const [ThemeState, changeStateTheme] = useState(State);

  return (
    <ThemeContext.Provider value={ThemeState}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

/*
Change Theme:
import ThemeContext, {ThemeCustomer} from 'themes';

...

const {changeTheme} = useContext(ThemeContext);
changeTheme(ThemeCustomer);
*/


/*
Use Theme:
import ThemeContext, {ThemeCustomer} from 'themes';

...

const {theme} = useContext(ThemeContext);
theme.colorAccent
*/
