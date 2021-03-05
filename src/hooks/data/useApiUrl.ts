import { useContext } from "react";

import { DataContext } from "@contexts/data";
import { IDataContext } from "@interfaces";

export const useApiUrl = (): string | null => {
    const { getApiUrl } = useContext<IDataContext>(DataContext);

    if (getApiUrl) {
        return getApiUrl();
    }

    return null;
};
