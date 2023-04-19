import React from "react";
import snarkdown from "snarkdown";
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
import { HTMLAttributes } from "react";
const uiNames: Record<PreferredUIPackage, string> = {
    headless: "Headless",
    antd: "Ant Design",
    mui: "Material UI",
    mantine: "Mantine",
    "chakra-ui": "Chakra UI",
};
const baseIconUrl =
    "https://refine.ams3.digitaloceanspaces.com/website/static/icons/colored/ui-framework-";

type LinkWithIdProps = HTMLAttributes<HTMLAnchorElement> & {
    id: string;
    isCurrent?: boolean;
    dangerouslySetInnerHTML?: { __html: string };
};

const LinkWithId = ({
    id,
    isCurrent,
    className,
    dangerouslySetInnerHTML,
    ...rest
}: LinkWithIdProps) => {
    const toUrl = useBaseUrl(`/docs/${id}`, { forcePrependBaseUrl: true });

    return (
        <a
            {...rest}
            href={toUrl}
            className={`${className || ""} ${
                isCurrent ? "text-black" : "text-gray-600 hover:text-black"
            }`}
            dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        />
    );
};

const markdownConverter = (text) => {
    const numericStartRegexp = /^\d+\.\s?/g;
    const numericStart = text.match(numericStartRegexp)?.[0] || "";
    const numericStartIgnore = text.replace(numericStartRegexp, "");

    const marked = snarkdown(numericStartIgnore);

    return `${numericStart}${marked}`;
};

const TutorialUIStatus = () => {
    const { preferred: preferredUIPackage } = useTutorialUIPackage();

    return (
        <div className="tutorial--framework-select--container">
            <div className="tutorial--framework-select--wrapper rounded-md">
                <div className="tutorial--framework-select__title">
                    CURRENT UI FRAMEWORK
                </div>
                <div className="tutorial--framework-select__box">
                    <div className="flex items-center gap-2">
                        <img
                            src={`${baseIconUrl}${preferredUIPackage}.svg`}
                            className="h-auto w-5"
                        />
                        <span className="font-semibold">
                            {uiNames[preferredUIPackage]}
                        </span>
                    </div>
                    <div>
                        <LinkWithId
                            id="tutorial/introduction/select-framework"
                            className="tutorial--framework-select--button"
                        >
                            change
                        </LinkWithId>
                    </div>
                </div>
            </div>
        </div>
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

    const [selectedUnit, setSelectedUnit] = React.useState(
        currentTutorial.unit,
    );

    // const test = useGlobalData();

    const renderTocItem = (item: (typeof toc)[number]) => {
        return (
            <li
                key={item.id}
                style={{
                    marginLeft: (item.level - 2) * 12,
                }}
                className="mb-1"
            >
                <a
                    dangerouslySetInnerHTML={{ __html: item.value }}
                    href={`#${item.id}`}
                    className={`tutorial__item--toc-item ${
                        `${hash}`.slice(1) === item.id ? "active" : ""
                    }`}
                ></a>
            </li>
        );
    };

    const renderTOC = () => {
        if (toc.length === 0) return null;
        return (
            <ul className="mt-1 list-none pl-0">{toc.map(renderTocItem)}</ul>
        );
    };

    const renderUnitItem = (
        doc: NonNullable<
            typeof currentTutorial
        >["units"][number]["docs"][number],
    ) => {
        const formattedTitle = markdownConverter(doc.title);

        return (
            <li key={doc.id} className="flex flex-row items-start gap-2 pb-2">
                <div className="mt-0.5 h-5 w-5 flex-shrink-0">
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
                        dangerouslySetInnerHTML={{ __html: formattedTitle }}
                    />

                    {doc.current && renderTOC()}
                </div>
            </li>
        );
    };

    const renderUnitDocs = (
        unit?: NonNullable<typeof currentTutorial>["units"][number],
    ) => {
        return (
            <div>
                <ul className="list-none pl-0">
                    {unit?.docs
                        .sort((a, b) =>
                            `${a.title}`?.localeCompare(`${b.title}`),
                        )
                        .map(renderUnitItem)}
                </ul>
            </div>
        );
    };

    const renderUnitTab = (unit: (typeof currentTutorial)["units"][number]) => {
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
                } -mb-1 flex h-[30px] w-[28px] cursor-pointer items-start justify-center rounded-tl-[24px] rounded-tr-[24px] border-none px-[3.5px] pt-0 font-semibold`}
            >
                <UnitCircle unit={unit.unit} width="100%" height="28px" />
            </button>
        );
    };

    const currentUnit:
        | NonNullable<typeof currentTutorial>["units"][number]
        | undefined = currentTutorial?.units.find(
        (unit) => unit.unit === selectedUnit,
    );

    const isFirstUnit =
        currentTutorial?.units?.find((el) => el?.unit === currentTutorial?.unit)
            ?.no === 1;

    return (
        <div
            className="max-h-[calc(100vh-6rem] sticky top-[5rem]"
            style={{
                color: "var(--tutorial-toc-text-color)",
            }}
        >
            <div className="unit-tabs mb-1 flex gap-0.5">
                {currentTutorial?.units.map(renderUnitTab)}
            </div>
            <div
                className={`unit-list-container rounded-md px-3 py-3 ${
                    currentUnit?.no === 1 ? "rounded-tl-none" : ""
                }`}
                style={{
                    backgroundColor: "var(--tutorial-toc-bg-color)",
                }}
            >
                <div
                    className="mb-2 text-sm font-bold"
                    style={{
                        color: "var(--tutorial-toc-text-color)",
                    }}
                >
                    {currentUnit?.title ?? currentUnit?.unit ?? "-"}
                </div>
                <div className="text-sm">{renderUnitDocs(currentUnit)}</div>
            </div>
            {!isFirstUnit &&
                currentDocId !== "tutorial/introduction/select-framework" && (
                    <TutorialUIStatus />
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
