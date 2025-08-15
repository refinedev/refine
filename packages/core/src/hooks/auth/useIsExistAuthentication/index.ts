import { useAuthBindingsContext } from "@contexts/auth";

/**
 * A hook that the UI uses
 * @internal
 */
export const useIsExistAuthentication = (): boolean => {
  const { isProvided } = useAuthBindingsContext();

  return Boolean(isProvided);
};
