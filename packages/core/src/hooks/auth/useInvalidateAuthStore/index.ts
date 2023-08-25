import { useKeys } from "@hooks/useKeys";
import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateAuthStore = () => {
    const queryClient = useQueryClient();
    const { keys, preferLegacyKeys } = useKeys();

    const invalidate = async () => {
        await Promise.all([
            queryClient.invalidateQueries(
                keys().auth().action("check").get(preferLegacyKeys),
            ),
            queryClient.invalidateQueries(
                keys().auth().action("identity").get(preferLegacyKeys),
            ),
            queryClient.invalidateQueries(
                keys().auth().action("permissions").get(preferLegacyKeys),
            ),
        ]);
    };

    return invalidate;
};
