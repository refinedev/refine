import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
} from "react";
import {
    ConfigProvider as AntdConfigProvider,
    theme as antdTheme,
} from "@pankod/refine-antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import de_DE from "antd/lib/locale/de_DE";
import { useLocalStorage } from "hooks/useLocalStorage";

interface ConfigContext {
    theme: "light" | "dark";
    setTheme: (
        value: "light" | "dark" | ((val: "light" | "dark") => "light" | "dark"),
    ) => void;
}

const ConfigContext = createContext<ConfigContext | undefined>(undefined);

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useLocalStorage<"light" | "dark">(
        "theme",
        "light",
    );

    const { i18n } = useTranslation();

    const locale = i18n.language;

    useEffect(() => {
        if (locale === "de") {
            dayjs.locale("de");
        } else {
            dayjs.locale("en");
        }
    }, [locale]);

    const value = useMemo(() => {
        return {
            theme,
            setTheme,
        };
    }, [theme, setTheme]);

    return (
        <ConfigContext.Provider value={value}>
            <AntdConfigProvider
                locale={locale === "de" ? de_DE : undefined}
                theme={{
                    algorithm:
                        theme === "light"
                            ? antdTheme.defaultAlgorithm
                            : antdTheme.darkAlgorithm,
                    token: {
                        fontFamily: `"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
                            Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
                            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
                    },
                }}
            >
                {children}
            </AntdConfigProvider>
        </ConfigContext.Provider>
    );
};

export const useConfigProvider = () => {
    const context = useContext(ConfigContext);

    if (!context) {
        throw new Error(
            "useConfigProvider must be used within a ConfigProvider",
        );
    }

    return context;
};
