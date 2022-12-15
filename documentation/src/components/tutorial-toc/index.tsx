import React from "react";
import { useWindowSize } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";

// @ts-expect-error no types
import DocItemTOCMobile from "@theme/DocItem/TOC/Mobile";
// @ts-expect-error no types
import DocItemTOCDesktop from "@theme/DocItem/TOC/Desktop";

import { useCurrentTutorial } from "../../hooks/use-current-tutorial";
import { useTutorialConfig } from "../../hooks/use-tutorial-config";
// import useGlobalData from "@docusaurus/useGlobalData";

export const TutorialTOC = () => {
    const tutorialConfig = useTutorialConfig();
    const { /* frontMatter, */ toc } = useDoc();
    const currentTutorial = useCurrentTutorial();

    // const test = useGlobalData();

    const renderTocItem = (item: typeof toc[number]) => {
        return (
            <li
                key={item.id}
                style={{
                    marginLeft: item.level * 8,
                }}
            >
                <a href={`#${item.id}`}>{item.value}</a>
            </li>
        );
    };

    const renderTOC = () => {
        return <ul style={{ paddingLeft: 0 }}>{toc.map(renderTocItem)}</ul>;
    };

    const renderUnitItem = (
        doc: NonNullable<
            typeof currentTutorial
        >["units"][number]["docs"][number],
    ) => {
        return (
            <li key={doc.id}>
                <a
                    onClick={(e) => {
                        doc.current ? e.preventDefault() : undefined;
                    }}
                    href={"/docs/" + doc.id}
                >
                    {doc.title}
                </a>
                {doc.current && renderTOC()}
            </li>
        );
    };

    const renderUnitDocs = (
        unit: NonNullable<typeof currentTutorial>["units"][number],
    ) => {
        return (
            <div>
                <h3>
                    {tutorialConfig.tutorial.units[unit.unit]?.label ??
                        unit.unit}
                </h3>
                <ul style={{ paddingLeft: 0 }}>
                    {unit.docs.map(renderUnitItem)}
                </ul>
            </div>
        );
    };

    const renderUnits = () => {
        return currentTutorial?.units.map(renderUnitDocs);
    };

    return <div>{renderUnits()}</div>;
};

export const useDocTOCwithTutorial = () => {
    const tutorial = useCurrentTutorial();
    const { frontMatter, toc } = useDoc();
    const windowSize = useWindowSize();
    const hidden = frontMatter.hide_table_of_contents;
    const canRender = !hidden && toc.length > 0;
    const mobile = canRender ? <DocItemTOCMobile /> : undefined;
    const desktop =
        canRender && (windowSize === "desktop" || windowSize === "ssr") ? (
            tutorial?.isTutorial ? (
                <TutorialTOC />
            ) : (
                <DocItemTOCDesktop />
            )
        ) : undefined;
    return {
        hidden,
        mobile,
        desktop,
    };
};
