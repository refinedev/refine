import { useContext } from "react";
import { useQuery, UseQueryResult } from "react-query";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";

export const useAuthenticated = (): UseQueryResult<void, unknown> => {
    const { checkAuth } = useContext<IAuthContext>(AuthContext);

    const queryResponse = useQuery("useAuthenticated", checkAuth, {
        enabled: !!checkAuth,
        retry: false,
    });

    return queryResponse;
};
