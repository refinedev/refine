import React from "react";
import { useWindowSize } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";

// @ts-expect-error no types
import DocItemTOCMobile from "@theme/DocItem/TOC/Mobile";
// @ts-expect-error no types
import DocItemTOCDesktop from "@theme/DocItem/TOC/Desktop";

import { useCurrentTutorial } from "../../hooks/use-current-tutorial";
import { useLocation } from "@docusaurus/router";
// import { useTutorialConfig } from "../../hooks/use-tutorial-config";
// import useGlobalData from "@docusaurus/useGlobalData";

export const TutorialTOC = () => {
    // const tutorialConfig = useTutorialConfig();
    const {
        /* frontMatter, */ toc,
        metadata: { id: currentDocId },
    } = useDoc();
    const currentTutorial = useCurrentTutorial();

    const { hash } = useLocation();

    const [selectedUnit, setSelectedUnit] = React.useState(
        currentTutorial.unit,
    );

    // const test = useGlobalData();

    const renderTocItem = (item: typeof toc[number]) => {
        return (
            <li
                key={item.id}
                style={{
                    marginLeft: (item.level - 2) * 12,
                }}
                className="mb-1"
            >
                <a
                    href={`#${item.id}`}
                    className={`${
                        `${hash}`.slice(1) === item.id
                            ? "text-[#1890ff]"
                            : "text-slate-500 hover:text-[#1890ff] active:text-[#1890ff]"
                    }`}
                >
                    {item.value}
                </a>
            </li>
        );
    };

    const renderTOC = () => {
        return (
            <ul className="list-none pl-0 mt-1">{toc.map(renderTocItem)}</ul>
        );
    };

    const renderUnitItem = (
        doc: NonNullable<
            typeof currentTutorial
        >["units"][number]["docs"][number],
    ) => {
        return (
            <li key={doc.id} className="pb-2 flex flex-row gap-2 items-start">
                <div className="w-4 h-4 bg-slate-300 rounded-full mt-0.5" />
                <div className="flex flex-col gap-2">
                    <a
                        onClick={(e) => {
                            doc.current ? e.preventDefault() : undefined;
                        }}
                        href={"/docs/" + doc.id}
                        className={`${
                            currentDocId === doc.id ? "font-bold" : ""
                        } text-slate-600 ${
                            doc.current
                                ? "hover:cursor-default hover:no-underline"
                                : ""
                        }`}
                    >
                        {doc.title}
                    </a>
                    {doc.current && renderTOC()}
                </div>
            </li>
        );
    };

    const renderUnitDocs = (
        unit: NonNullable<typeof currentTutorial>["units"][number],
    ) => {
        return (
            <div>
                <ul className="list-none pl-0">
                    {unit.docs.map(renderUnitItem)}
                </ul>
            </div>
        );
    };

    const renderUnitTab = (unit: typeof currentTutorial["units"][number]) => {
        return (
            <div
                key={unit.no}
                className="w-7 text-center h-9 flex justify-center items-start pt-1"
            >
                <button
                    type="button"
                    onClick={() => setSelectedUnit(unit.unit)}
                    className={`w-7 h-7 cursor-pointer bg-slate-200 text-slate-500 border-solid border-2 ${
                        selectedUnit === unit.unit
                            ? "border-slate-400"
                            : "border-transparent"
                    } font-semibold flex justify-center items-center`}
                >
                    {unit.no}
                </button>
            </div>
        );
    };

    const currentUnit = currentTutorial?.units.find(
        (unit) => unit.unit === selectedUnit,
    );

    // max-height: calc(100vh - var(--ifm-navbar-height) - 2rem);
    // overflow-y: auto;
    // position: sticky;
    // top: calc(var(--ifm-navbar-height) + 1rem);

    return (
        <div className="sticky top-[5rem] max-h-[calc(100vh-6rem]">
            <div className="unit-tabs flex gap-1 mb-1">
                {currentTutorial?.units.map(renderUnitTab)}
            </div>
            <div className="unit-list-container bg-slate-100 py-3 px-3">
                <div className="font-bold text-sm mb-2 text-slate-700">
                    {currentUnit.title ?? currentUnit.unit}
                </div>
                <div className="text-sm">{renderUnitDocs(currentUnit)}</div>
            </div>
        </div>
    );
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
