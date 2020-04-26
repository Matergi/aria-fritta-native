// @flow strict

type Screen = {
  +backgroundColor: string,
};

export type Theme = {
  +colorAccent: string,
  +backgroundAccent: string,
  +shadow: any,
  +screen: Screen,
};

const defaultTheme: Theme = {
  colorAccent: '#160452',
  backgroundAccent: '#A6A0CC',
  shadow: {
    shadowColor: '#160452',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 7.49,
    elevation: 12,
  },
  screen: {
    backgroundColor: '#ffffff',
  },
};

export default defaultTheme;
