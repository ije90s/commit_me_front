import { DefaultTheme } from 'styled-components';

const calcRem = (size: number) => `${size / 10}rem`;

const fontSizes = {
  small: calcRem(12),
  base: calcRem(14),
  medium: calcRem(15),
  large: calcRem(16),
};

// const paddings = {
//   small: calcRem(8),
//   base: calcRem(10),
//   large: calcRem(12),
// };
const deviceSizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '450px',
  tabletS: '768px',
  tabletM: '1024px',
  tabletL: '1280px',
  etcA: '29em',
  etcB: '35em',
};

const device = {
  mobileS: `screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `screen and (max-width: ${deviceSizes.mobileL})`,
  tabletS: `screen and (max-width: ${deviceSizes.tabletS})`,
  tabletM: `screen and (max-width: ${deviceSizes.tabletM})`,
  tabletL: `screen and (max-width: ${deviceSizes.tabletL})`,
  etcA: `screen and (min-width: ${deviceSizes.etcA})`,
  etcB: `screen and (min-width: ${deviceSizes.etcB})`,
};

const colors: Object = {
  black: '#1B1B1B',
  white: '#fff',
  gray_1: '#e5e5e5',
  gray_2: '#c4c4c4',
  blue_1: '#18A0FB',
  blueMain: '#46cdff',
  blue_2: '#84b8e0',
  blue_3: '#D9E9F6',
  blue_4: '#c1d3e8',
  blue_5: '#3397E8',

  gray_4: '#e8e8e8',
  gray_5: '#aaaaaa',
  redText: '#ff1900',
  server_orange: '#FF8A65',
};

export const theme: DefaultTheme = { fontSizes, colors, deviceSizes, device };
