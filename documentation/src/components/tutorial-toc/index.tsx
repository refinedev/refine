import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useWindowSize } from "@docusaurus/theme-common";
// @ts-expect-error no types
import { useDoc } from "@docusaurus/theme-common/internal";

// @ts-expect-error no types
import DocItemTOCMobile from "@theme/DocItem/TOC/Mobile";
// @ts-expect-error no types
import DocItemTOCDesktop from "@theme/DocItem/TOC/Desktop";

import { useCurrentTutorial } from "../../hooks/use-current-tutorial";
import { useLocation } from "@docusaurus/router";
import { UnitCircle } from "../unit-circle";
import { TutorialCircle } from "../tutorial-circle";
// import { useTutorialConfig } from "../../hooks/use-tutorial-config";
// import useGlobalData from "@docusaurus/useGlobalData";

const LinkWithId: React.FC<
    React.PropsWithChildren<{
        id: string;
        className?: string;
        isCurrent?: boolean;
    }>
> = ({ id, children, className, isCurrent }) => {
    const toUrl = useBaseUrl(`/docs/${id}`, { forcePrependBaseUrl: true });

    return (
        <Link
            to={toUrl}
            className={className}
            onClick={(e) => (isCurrent ? e?.preventDefault() : undefined)}
        >
            {children}
        </Link>
    );
};

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
        if (toc.length === 0) return null;
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
                <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <TutorialCircle id={doc.id} width="100%" height="100%" />
                </div>
                <div className="flex flex-col gap-2">
                    <LinkWithId
                        id={doc.id}
                        isCurrent={doc.current}
                        className={`${
                            currentDocId === doc.id ? "font-bold" : ""
                        } leading-[22px] text-slate-600 ${
                            doc.current
                                ? "hover:cursor-default hover:no-underline"
                                : ""
                        }`}
                    >
                        {doc.title}
                    </LinkWithId>
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
                    {unit.docs
                        .sort((a, b) =>
                            `${a.title}`?.localeCompare(`${b.title}`),
                        )
                        .map(renderUnitItem)}
                </ul>
            </div>
        );
    };

    const renderUnitTab = (unit: typeof currentTutorial["units"][number]) => {
        return (
            <button
                key={unit.no}
                type="button"
                onClick={() => setSelectedUnit(unit.unit)}
                className={`w-5 h-7 p-0 md:w-5 lg:w-5 ${
                    unit.unit === selectedUnit && "md:w-6 lg:w-7"
                } cursor-pointer bg-transparent border-none font-semibold flex justify-center items-center`}
            >
                <UnitCircle unit={unit.unit} width="100%" height="100%" />
            </button>
        );
    };

    const currentUnit = currentTutorial?.units.find(
        (unit) => unit.unit === selectedUnit,
    );

    return (
        <div className="sticky top-[5rem] max-h-[calc(100vh-6rem]">
            <div className="unit-tabs flex gap-1.5 mb-1">
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
    const canRender = (!hidden && toc.length > 0) || tutorial?.isTutorial;
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
