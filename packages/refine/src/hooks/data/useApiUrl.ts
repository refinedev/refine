import { useContext } from "react";

import { DataContext } from "@contexts/data";
import { IDataContext } from "../../interfaces";

export const useApiUrl = (): string => {
    const { getApiUrl } = useContext<IDataContext>(DataContext);

    return getApiUrl();
};
