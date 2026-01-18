import { I18nContext } from "@contexts/i18n";
import { useContext, useMemo } from "react";

/**
 * If you need to translate the texts in your own components, refine provides the `useTranslate` hook.
 * It returns the translate method from `i18nProvider` under the hood.
 *
 * @see {@link https://refine.dev/docs/api-reference/core/hooks/translate/useTranslate} for more details.
 */
export const useTranslate = ({
  ns,
}: {
  ns?: string;
} = {}) => {
  const { i18nProvider } = useContext(I18nContext);

  const fn = useMemo(() => {
    function translate(
      key: string,
      options?: any,
      defaultMessage?: string,
    ): string;
    function translate(key: string, defaultMessage?: string): string;

    function translate(
      key: string,
      options?: string | any,
      defaultMessage?: string,
    ) {
      let finalOptions = options;
      let finalDefaultMessage = defaultMessage;

      if (typeof options === "string" && defaultMessage === undefined) {
        finalOptions = undefined;
        finalDefaultMessage = options;
      }

      if (ns) {
        finalOptions = { ns, ...finalOptions };
      }

      return (
        i18nProvider?.translate(key, finalOptions, finalDefaultMessage) ??
        finalDefaultMessage ??
        (typeof options === "string" && defaultMessage === undefined
          ? options
          : key)
      );
    }

    return translate;
  }, [i18nProvider, ns]);

  return fn;
};
