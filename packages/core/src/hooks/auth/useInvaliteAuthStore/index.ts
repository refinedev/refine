import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateAuthStore = () => {
    const queryClient = useQueryClient();

    const invalidate = () => {
        queryClient.invalidateQueries(["useAuthenticated"]);
        queryClient.invalidateQueries(["getUserIdentity"]);
        queryClient.invalidateQueries(["usePermissions"]);
    };

    return invalidate;
};
