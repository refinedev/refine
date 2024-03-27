import { useCallback, useContext } from "react";

import { I18nContext } from "@contexts/i18n";

export type UseGetLocaleType = () => () => string | undefined;

/**
 * If you need to know the current locale, refine provides the `useGetLocale` hook.
 * It returns the `getLocale` method from `i18nProvider` under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/translate/useGetLocale} for more details.
 */
export const useGetLocale: UseGetLocaleType = () => {
  const { i18nProvider } = useContext(I18nContext);

  return useCallback(() => i18nProvider?.getLocale(), []);
};
