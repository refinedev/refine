import { useCallback, useEffect } from "react";

import { useTranslate } from "@refinedev/core";

type Title = string | { i18nKey: string };

type UseDocumentTitleOptions = {
  ns?: string;
  defaultTitle?: string;
};

export const useDocumentTitle = (
  title?: Title,
  options?: UseDocumentTitleOptions,
) => {
  const translate = useTranslate({ ns: options?.ns });

  const getTitle = useCallback(
    (title: Title) => {
      const key = typeof title === "string" ? title : title.i18nKey;

      return translate(key, options?.defaultTitle);
    },
    [translate, options?.defaultTitle],
  );

  useEffect(() => {
    if (!title) return;

    document.title = getTitle(title);
  }, [title, getTitle]);

  return (title: Title) => {
    document.title = getTitle(title);
  };
};
