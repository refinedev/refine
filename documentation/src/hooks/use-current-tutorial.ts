import React from "react";
import { useDoc } from "@docusaurus/theme-common/internal";
import { useDocsVersion } from "@docusaurus/theme-common/internal";

import useTutorialPagination from "./use-tutorial-pagination";

// import { Doc } from "@docusaurus/types";

type DocItem = {
    id: string;
    title: string;
};

const TUTORIAL_ID_PREFIX = "tutorial/";

// tutorial doc id structure is tutorial/<unit>/<tutorial-id>

export const useCurrentTutorial = () => {
    const currentDoc = useDoc();
    const { docs } = useDocsVersion();

    const {
        frontMatter,
        metadata: { id: currentId },
    } = currentDoc;

    const isTutorial = !!(frontMatter as any)?.tutorial;

    const unit = currentId.split("/")[1];

    const pagination = useTutorialPagination(currentDoc as any);

    const allTutorialDocs = Object.entries<DocItem>(docs).filter(([key]) =>
        key.startsWith(TUTORIAL_ID_PREFIX),
    );

    const separatedByUnit = allTutorialDocs.reduce((acc, [key, value]) => {
        const unit = key.split("/")[1];
        if (!acc[unit]) {
            acc[unit] = [];
        }

        acc[unit].push(value);

        return acc;
    }, {} as Record<string, DocItem[]>);

    const unitsArray = Object.entries(separatedByUnit).map(([key, value]) => ({
        unit: key,
        ...(key === unit && isTutorial && { current: true }),
        docs: value.map((el) => ({
            ...el,
            ...(el.id === currentId && isTutorial && { current: true }),
        })),
    }));

    return isTutorial
        ? {
              isTutorial,
              unit,
              pagination,
              units: unitsArray,
          }
        : undefined;
};
