import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";

/**
 * A hook that the UI uses
 * @internal
 */
export const useIsExistAuthentication = (): boolean => {
  const { isProvided: legacyIsProvided } = useLegacyAuthContext();
  const { isProvided } = useAuthBindingsContext();

  return Boolean(isProvided || legacyIsProvided);
};
