import { useKeys } from "@hooks/useKeys";
import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateAuthStore = () => {
  const queryClient = useQueryClient();
  const { keys, preferLegacyKeys } = useKeys();

  const invalidate = async () => {
    await Promise.all(
      (["check", "identity", "permissions"] as const).map((action) =>
        queryClient.invalidateQueries(
          keys().auth().action(action).get(preferLegacyKeys),
        ),
      ),
    );
  };

  return invalidate;
};
