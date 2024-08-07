import type { PropsWithChildren } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import type { ThemeOptions } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { ChevronDownIcon } from "@/icons/chevron-down";
import { Role } from "@/types";
import { indigo, slate, teal } from "./colors";

const themeOptionsBase: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 360,
      sm: 720,
      md: 960,
      lg: 1296,
      xl: 1440,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          height: "40px",
        },
        root: {
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 500,
          boxShadow: "none",
          borderRadius: "6px",
          textTransform: "capitalize",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: slate[500],
        },
      },
      defaultProps: {
        IconComponent: ChevronDownIcon,
      },
    },
  },
  palette: {
    text: {
      primary: slate[900],
      secondary: slate[500],
      disabled: slate[300],
    },
    success: {
      main: "#16A34A",
    },
    error: {
      main: "#DC2626",
    },
    grey: slate,
    divider: slate[200],
    mode: "light",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
};

const themeOptionsEmployee: ThemeOptions = {
  palette: {
    primary: {
      ...teal,
      main: teal[600],
    },
  },
};

const themeOptionsManager: ThemeOptions = {
  palette: {
    primary: {
      ...indigo,
      main: indigo[600],
    },
  },
};

const themeOptionsAdmin: ThemeOptions = {
  palette: {
    primary: {
      ...slate,
      main: slate[900],
    },
    secondary: {
      main: teal[600],
    },
  },
};

const themeEmployee = createTheme(
  deepmerge(themeOptionsEmployee, themeOptionsBase),
);

const themeManager = createTheme(
  deepmerge(themeOptionsManager, themeOptionsBase),
);

const themeAdmin = createTheme(deepmerge(themeOptionsAdmin, themeOptionsBase));

type Props = PropsWithChildren<{
  role?: Role;
}>;

export const ThemeProvider = ({ children, role = Role.EMPLOYEE }: Props) => {
  let selectedTheme = themeEmployee;

  switch (role) {
    case Role.EMPLOYEE:
      selectedTheme = themeEmployee;
      break;
    case Role.MANAGER:
      selectedTheme = themeManager;
      break;
    case Role.ADMIN:
      selectedTheme = themeAdmin;
      break;
    default:
      selectedTheme = themeEmployee;
  }

  return (
    <MuiThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "#root": {
            minHeight: "100dvh",
          },
          html: { WebkitFontSmoothing: "auto" },
        }}
      />
      {children}
    </MuiThemeProvider>
  );
};
