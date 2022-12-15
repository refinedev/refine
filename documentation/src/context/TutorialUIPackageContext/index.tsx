import React from "react";
import { useDoc } from "@docusaurus/theme-common/internal";

export type PreferredUIPackage =
    | "antd"
    | "chakra-ui"
    | "mantine"
    | "mui"
    | undefined;

export const availableUIPackages = [
    "antd",
    "chakra-ui",
    "mantine",
    "mui",
] as const;

const validate = (value?: string | undefined) => {
    if (availableUIPackages.includes(value as any)) {
        return value;
    }
    return undefined;
};

const LOCALSTORAGE_KEY = "tutorial-preferred-ui-package";

export const TutorialUIPackageContext = React.createContext<{
    preferred: PreferredUIPackage;
    setPreferred: (val: PreferredUIPackage) => void;
    current: PreferredUIPackage;
}>({ preferred: undefined, current: undefined, setPreferred: () => undefined });

export const TutorialUIPackageProvider: React.FC<
    React.PropsWithChildren<{}>
> = ({ children }) => {
    const { frontMatter } = useDoc();
    const dedicated = (frontMatter as any)?.tutorial?.dedicatedUI;

    const [preferred, _setPreferred] =
        React.useState<PreferredUIPackage>(undefined);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const rawValue = localStorage.getItem(LOCALSTORAGE_KEY);
            const validatedValue = validate(rawValue);
            if (validatedValue) {
                _setPreferred(validatedValue as PreferredUIPackage);
            }
        }
    }, []);

    const setPreferred = (val: PreferredUIPackage) => {
        console.log("val", val);
        if (!validate(val)) {
            return undefined;
        }

        if (typeof window !== "undefined") {
            localStorage.setItem(LOCALSTORAGE_KEY, val);
        }

        _setPreferred(val);
    };

    return (
        <TutorialUIPackageContext.Provider
            value={{
                preferred,
                setPreferred,
                current: dedicated || preferred,
            }}
        >
            {children}
        </TutorialUIPackageContext.Provider>
    );
};
