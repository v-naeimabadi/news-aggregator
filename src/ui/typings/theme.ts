export interface Theme {
  palette: {
    primary: {
      main: string;
      shade1: string;
      shade2: string;
      tint1: string;
      tint2: string;
      tint3: string;
    };
    gray: {
      main: string;
      shade1: string;
      shade2: string;
      tint1: string;
      tint2: string;
      tint3: string;
    };
    red: {
      main: string;
      shade1: string;
      shade2: string;
      tint1: string;
      tint2: string;
    };
    accent: {
      main: string;
      shade1: string;
      shade2: string;
      tint1: string;
      tint2: string;
      tint3: string;
    };
    green: {
      main: string;
      shade1: string;
      shade2: string;
      tint1: string;
      tint2: string;
    };
    white: string;
    black: string;
    transparent: string;
  };
}
