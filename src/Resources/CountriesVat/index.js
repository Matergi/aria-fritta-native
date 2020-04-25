let countries = [
  {name: 'Austria', code: 'AT'},
  {name: 'Belgium', code: 'BE'},
  {name: 'Bulgaria', code: 'BG'},
  {name: 'Cyprus', code: 'CY'},
  {name: 'Czech Republic', code: 'CZ'},
  {name: 'Germany', code: 'DE'},
  {name: 'Denmark', code: 'DK'},
  {name: 'Estonia', code: 'EE'},
  {name: 'Greece', code: 'EL'},
  {name: 'Spain', code: 'ES'},
  {name: 'Finland', code: 'FI'},
  {name: 'France', code: 'FR'},
  {name: 'United Kingdom', code: 'GB'},
  {name: 'Croatia', code: 'HR'},
  {name: 'Hungary', code: 'HU'},
  {name: 'Ireland', code: 'IE'},
  {name: 'Italy', code: 'IT'},
  {name: 'Lithuania', code: 'LT'},
  {name: 'Luxembourg', code: 'LU'},
  {name: 'Latvia', code: 'LV'},
  {name: 'Malta', code: 'MT'},
  {name: 'The Netherlands', code: 'NL'},
  {name: 'Poland', code: 'PL'},
  {name: 'Portugal', code: 'PT'},
  {name: 'Romania', code: 'RO'},
  {name: 'Sweden', code: 'SE'},
  {name: 'Slovenia', code: 'SI'},
  {name: 'Slovakia', code: 'SK'},
];

export default countries;

/*

import {Picker} from 'elements';
import CountriesVat from 'countriesVat';

...

<Picker
  {...props}
  items={[
    {
      name: 'seleziona una country',
      code: '',
    },
    ...CountriesVat,
  ].map(country => ({
    key: country.code,
    label: country.name,
    value: country.code,
  }))}
/>

*/
