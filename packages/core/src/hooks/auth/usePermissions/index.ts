import { useContext } from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useQuery, UseQueryResult } from "react-query";

export const usePermissions = (): UseQueryResult<any, unknown> => {
    const { getPermissions } = useContext<IAuthContext>(AuthContext);

    const queryResponse = useQuery("usePermissions", getPermissions);

    return queryResponse;
};
