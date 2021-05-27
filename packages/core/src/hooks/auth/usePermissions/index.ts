import { useContext } from "react";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useQuery } from "react-query";

export const usePermissions = () => {
    const { getPermissions } = useContext<IAuthContext>(AuthContext);

    const queryResponse = useQuery("usePermissions", getPermissions);

    return queryResponse;
};
