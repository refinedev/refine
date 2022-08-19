import React from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../../interfaces";
import { useLogout } from "@hooks";

/**
 * `useCheckError` calls the `checkError` method from the {@link https://refine.dev/docs/core/providers/auth-provider `authProvider`} under the hood.
 *
 * @see {@link https://refine.dev/docs/core/hooks/auth/useCheckError} for more details.
 *
 */
export const useCheckError = (): UseMutationResult<
    void,
    string | undefined,
    any,
    unknown
> => {
    const { checkError: checkErrorFromContext } =
        React.useContext<IAuthContext>(AuthContext);

    const { mutate: logout } = useLogout<{ redirectPath?: string }>();

    const queryResponse = useMutation(
        ["useCheckError"],
        checkErrorFromContext,
        {
            onError: (redirectPath?: string) => {
                logout({ redirectPath });
            },
        },
    );

    return queryResponse;
};
