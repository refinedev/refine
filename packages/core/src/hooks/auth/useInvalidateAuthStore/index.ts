import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateAuthStore = () => {
    const queryClient = useQueryClient();

    const invalidate = async () => {
        await Promise.all([
            queryClient.invalidateQueries(["useAuthenticated"]),
            queryClient.invalidateQueries(["getUserIdentity"]),
            queryClient.invalidateQueries(["usePermissions"]),
        ]);
    };

    return invalidate;
};
