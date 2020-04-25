// @flow strict

export type Theme = {
  +colorAccent: string,
  +backgroundAccent: string,
  +shadow: any,
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
};

export default defaultTheme;
