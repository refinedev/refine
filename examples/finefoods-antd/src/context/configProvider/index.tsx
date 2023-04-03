import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
} from "react";
import { ConfigProvider as AntdConfigProvider, theme } from "antd";

type Mode = "light" | "dark";

type ConfigProviderContext = {
    mode: Mode;
    setMode: (mode: Mode) => void;
};

export const ConfigProviderContext = createContext<
    ConfigProviderContext | undefined
>(undefined);

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
    const [mode, setMode] = useState<Mode>("light");

    return (
        <ConfigProviderContext.Provider value={{ mode, setMode }}>
            <AntdConfigProvider
                theme={{
                    algorithm:
                        mode === "light"
                            ? theme.defaultAlgorithm
                            : theme.darkAlgorithm,
                }}
            >
                {children}
            </AntdConfigProvider>
        </ConfigProviderContext.Provider>
    );
};

export const useConfigProvider = () => {
    const context = useContext(ConfigProviderContext);

    if (context === undefined) {
        throw new Error(
            "useConfigProvider must be used within a ConfigProvider",
        );
    }

    return context;
};
