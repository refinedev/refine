import { DocumentTitleContext } from "@contexts/document-title";
import { useCallback, useContext, useEffect } from "react";
import { useParsed } from "..";

export const useDocumentTitle = (title?: string) => {
    const { title: currentTitle, updateTitle } =
        useContext(DocumentTitleContext);
    const { pathname } = useParsed();

    useEffect(() => {
        if (title) {
            updateTitle(title, pathname ?? "", 1);
        }
    }, [title]);

    const fn = useCallback(
        (title: string) => {
            updateTitle(title, pathname ?? "", 1);
        },
        [updateTitle],
    );

    return {
        updateTitle: fn,
        title: title ?? currentTitle,
    };
};
