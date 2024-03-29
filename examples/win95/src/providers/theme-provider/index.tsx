import { PropsWithChildren } from "react";

import {
  createGlobalStyle,
  ThemeProvider as BaseThemeProvider,
} from "styled-components";
import { styleReset } from "react95";
import themeOriginal from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    background: ${themeOriginal.desktopBackground};
    font-family: 'ms_sans_serif';
  }
  div {
    line-height: normal !important;
  }
  tr > td > a {
    color: #0000FF;
    text-decoration: none;
  }
  tr:hover {
     td > a {
        color: #80FBFE !important;
     }  
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalStyles />
      <BaseThemeProvider theme={themeOriginal}>{children}</BaseThemeProvider>
    </>
  );
};

export const theme = themeOriginal;
