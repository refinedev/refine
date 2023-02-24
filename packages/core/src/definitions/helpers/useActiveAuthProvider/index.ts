import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";

/**
 * @returns authProvider or legacyAuthProvider if provided, otherwise null
 * @internal
 * NOTE: Will be removed in v5
 */
export const useActiveAuthProvider = () => {
    const legacyAuthProvider = useLegacyAuthContext();
    const authProvider = useAuthBindingsContext();

    if (authProvider.isProvided) {
        return { isLegacy: false, ...authProvider };
    }

    if (legacyAuthProvider.isProvided) {
        // legacyAuthProvider interface is different from authProvider interface
        // we need to convert it to authProvider interface for simple usage
        // in the future, we will remove legacyAuthProvider
        return {
            isLegacy: true,
            ...legacyAuthProvider,
            check: legacyAuthProvider.checkAuth,
            onError: legacyAuthProvider.checkError,
            getIdentity: legacyAuthProvider.getUserIdentity,
        };
    }

    return null;
};
