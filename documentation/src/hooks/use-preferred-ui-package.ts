import React from "react";
import useLocalStorage from "./use-localstorage";

type PreferredUIPackage = "antd" | "chakra-ui" | "mantine" | "mui" | undefined;

const validatePreferred = (value?: string | undefined) => {
    if (
        value === "antd" ||
        value === "chakra-ui" ||
        value === "mantine" ||
        value === "mui"
    ) {
        return value;
    }
    return undefined;
};

export const usePreferredUIPackage = () => {
    const [preferredUIPackage, setPreferredUIPackage] = useLocalStorage<
        string | undefined
    >("tutorial-preferred-ui-package", undefined);

    const validatedUIPackage = React.useMemo(
        () => validatePreferred(preferredUIPackage),
        [preferredUIPackage],
    );

    return [
        validatedUIPackage,
        setPreferredUIPackage as (value: PreferredUIPackage) => void,
    ] as const;
};
