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
import { SelectTutorialFramework } from "../select-tutorial-framework";
import { useTutorialUIPackage } from "../../hooks/use-tutorial-ui-package";
import { PreferredUIPackage } from "../../context/TutorialUIPackageContext";
// import { useTutorialConfig } from "../../hooks/use-tutorial-config";
// import useGlobalData from "@docusaurus/useGlobalData";

const uiNames: Record<PreferredUIPackage, string> = {
    headless: "Headless",
    antd: "Ant Design",
    mui: "Material UI",
    mantine: "Mantine",
    "chakra-ui": "Chakra UI",
};

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

export const TutorialTOC = ({ isMobile }: { isMobile?: boolean }) => {
    // const tutorialConfig = useTutorialConfig();
    const {
        /* frontMatter, */ toc,
        metadata: { id: currentDocId },
    } = useDoc();
    const currentTutorial = useCurrentTutorial();

    const { hash } = useLocation();

    const { preferred: preferredUIPackage } = useTutorialUIPackage();

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
                    className={`tutorial__item--toc-item ${
                        `${hash}`.slice(1) === item.id ? "active" : ""
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
                        className={`tutorial__item-link ${
                            currentDocId === doc.id ? "font-semibold" : ""
                        } leading-[22px] ${
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
                style={{
                    backgroundColor:
                        unit.unit === selectedUnit
                            ? "var(--tutorial-toc-bg-color)"
                            : "transparent",
                    boxShadow:
                        unit.unit === selectedUnit
                            ? "0 -1px 0px 0px rgb(255 255 255 / 10%)"
                            : "none",
                }}
                className={`${
                    unit.unit === selectedUnit
                        ? "tutorial__item--unit-item"
                        : ""
                } w-[28px] h-[30px] pt-0 px-[3.5px] rounded-tl-[24px] rounded-tr-[24px] cursor-pointer border-none font-semibold flex justify-center items-start -mb-1`}
            >
                <UnitCircle unit={unit.unit} width="100%" height="28px" />
            </button>
        );
    };

    const currentUnit = currentTutorial?.units.find(
        (unit) => unit.unit === selectedUnit,
    );

    const isFirstUnit =
        currentTutorial?.units.find((el) => el.unit === currentTutorial.unit)
            ?.no === 1;

    return (
        <div
            className="sticky top-[5rem] max-h-[calc(100vh-6rem]"
            style={{
                color: "var(--tutorial-toc-text-color)",
            }}
        >
            <div className="unit-tabs flex gap-0.5 mb-1">
                {currentTutorial?.units.map(renderUnitTab)}
            </div>
            <div
                className="unit-list-container py-3 px-3"
                style={{
                    backgroundColor: "var(--tutorial-toc-bg-color)",
                }}
            >
                <div
                    className="font-bold text-sm mb-2"
                    style={{
                        color: "var(--tutorial-toc-text-color)",
                    }}
                >
                    {currentUnit.title ?? currentUnit.unit}
                </div>
                <div className="text-sm">{renderUnitDocs(currentUnit)}</div>
            </div>
            {!isMobile &&
                !isFirstUnit &&
                currentDocId !== "tutorial/introduction/select-framework" && (
                    <div className="tutorial--framework-select--container">
                        <div className="tutorial--framework-select--wrapper">
                            <div>
                                Current UI Framework is{" "}
                                <span className="font-bold">
                                    {uiNames[preferredUIPackage]}
                                </span>
                            </div>
                            <LinkWithId
                                id="tutorial/introduction/select-framework"
                                className="tutorial--framework-select--button"
                            >
                                click to pick another
                            </LinkWithId>
                        </div>
                    </div>
                )}
        </div>
    );
};

export const useDocTOCwithTutorial = () => {
    const tutorial = useCurrentTutorial();
    const { frontMatter, toc } = useDoc();
    const windowSize = useWindowSize();
    const hidden = frontMatter.hide_table_of_contents;
    const canRender = (!hidden && toc.length > 0) || tutorial?.isTutorial;
    const mobile = canRender ? (
        tutorial?.isTutorial ? (
            windowSize === "mobile" ? (
                <div className="my-4">
                    <TutorialTOC isMobile />
                </div>
            ) : null
        ) : (
            <DocItemTOCMobile />
        )
    ) : undefined;
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
