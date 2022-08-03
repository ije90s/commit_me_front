import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    fontSizes: {
      small: string;
      base: string;
      medium: string;
      large: string;
    };
    colors: {
      black: string;
      darkNavy: string;
      blueText: string;
      blueMain: string;
      blue_1: string;
      blue_2: string;
      blue_3: string;
      blue_4: string;
      gray_1: string;
      gray_2: string;
      gray_3: string;
      gray_4: string;
      gray_5: string;
      redText: string;
      server_orange: string;
    };
    device: {
      mobileS: string;
      mobileM: string;
      mobileL: string;
      tabletS: string;
      tabletM: string;
      tabletL: string;
      etcA: string;
      etcB: string;
    };
    deviceSize: {
      mobileS: string;
      mobileM: string;
      mobileL: string;
      tabletS: string;
      tabletM: string;
      tabletL: string;
      etcA: string;
      etcB: string;
    };
  }
}
declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    // css?: CSSProp;
    del?: boolean;
    view?: boolean;
    layout?: boolean;
    color?: string;
    fullSize?: string;
    name?: string;
    width?: string | undefined;
    left?: string | boolean;
    closeable?: boolean;
    value?: string | number;
    status?: string;
    vertical?: string;
    visiblePicker?: boolean;
    tableWidth?: string | number;
  }
}
