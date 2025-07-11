import { useAuthBindingsContext } from "@contexts/auth";

/**
 * @returns authProvider if provided, otherwise null
 * @internal
 */
export const useActiveAuthProvider = () => {
  const authProvider = useAuthBindingsContext();

  if (authProvider.isProvided) {
    return authProvider;
  }

  return null;
};
