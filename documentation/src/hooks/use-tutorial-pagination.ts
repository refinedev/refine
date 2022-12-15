import React from "react";
import { useDocsVersion } from "@docusaurus/theme-common/internal";
import { usePreferredUIPackage } from "./use-preferred-ui-package";

type Props = {
    frontMatter: { tutorial: { prev?: string; next?: string } };
};

export default function useTutorialPagination({ frontMatter }: Props) {
    const { docs } = useDocsVersion();

    const [preferredUI = "antd"] = usePreferredUIPackage();

    const parsePagination = (rawId: string) => {
        // rawId string may contain {preferredUI} placeholder
        // e.g. "tutorial-1-{preferredUI}"
        const id = rawId.replace("{preferredUI}", preferredUI);

        return id;
    };

    const toPermalink = (id: string) => {
        return "/docs/" + id;
    };

    const { tutorial } = frontMatter;

    const { next: nextRaw, prev: prevRaw } = tutorial ?? {};

    const next = nextRaw ? parsePagination(nextRaw) : undefined;
    const prev = prevRaw ? parsePagination(prevRaw) : undefined;

    const prevDocItem = docs[prev];
    const nextDocItem = docs[next];

    const previousPage = prevDocItem
        ? {
              ...prevDocItem,
              permalink: toPermalink(prevDocItem.id),
          }
        : undefined;

    const nextPage = nextDocItem
        ? {
              ...nextDocItem,
              permalink: toPermalink(nextDocItem.id),
          }
        : undefined;

    return {
        previous: previousPage,
        next: nextPage,
    };
}
