import { useContext } from "react";
import { AuthContext } from "@contexts/auth";
import { IAuthContext } from "../../interfaces";

/**
 * A hook that the UI uses
 * @internal
 */
export const useIsExistAuthentication = (): boolean => {
    const { isProvided } = useContext<IAuthContext>(AuthContext);

    return isProvided || false;
};
