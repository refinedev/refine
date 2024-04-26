import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ConfigProvider, ThemeConfig, theme } from "antd";
import { ThemeProvider } from "antd-style";
import { RefineThemes } from "@refinedev/antd";

type ColorModeContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType,
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const colorModeFromLocalStorage = localStorage.getItem("colorMode");
  const isSystemPreferenceDark = window?.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const systemPreference = isSystemPreferenceDark ? "dark" : "light";
  const [mode, setMode] = useState(
    colorModeFromLocalStorage || systemPreference,
  );

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;
  const algorithm = mode === "light" ? defaultAlgorithm : darkAlgorithm;
  const customTheme: ThemeConfig = {
    // you can change the theme colors here. example: ...RefineThemes.Magenta,
    ...RefineThemes.Purple,
    algorithm,
    components: {
      Tabs: {
        horizontalMargin: "0px",
        inkBarColor: theme.getDesignToken({ algorithm }).purple8,
        itemActiveColor: theme.getDesignToken({ algorithm }).purple8,
        itemSelectedColor: theme.getDesignToken({ algorithm }).purple8,
      },
    },
  };

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ConfigProvider theme={customTheme}>
        {/* @ts-expect-error Type error via React.ReactNode from antd-style */}
        <ThemeProvider theme={customTheme} appearance={mode}>
          {children}
        </ThemeProvider>
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeContext");
  }
  return context;
};
