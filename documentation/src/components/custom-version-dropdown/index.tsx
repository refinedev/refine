import React from "react";
import Link from "@docusaurus/Link";
import {
    useVersions,
    useActiveDocContext,
} from "@docusaurus/plugin-content-docs/client";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import { useDocsVersionCandidates } from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";

const getVersionMainDoc = (version) =>
    version.docs.find((doc) => doc.id === version.mainDocId);

const docsPluginId = "default";

const useClickOutside = (
    onClick: Function,
): React.RefObject<HTMLDivElement> => {
    const node: React.RefObject<HTMLDivElement> =
        React.useRef<HTMLDivElement>(null);

    const handleClick = (e: MouseEvent): void => {
        const { current } = node;
        if (!current || current.contains(e.target as Node)) {
            return;
        }
        onClick();
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return (): void => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    return node;
};

const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width={18}
        height={10}
        viewBox="0 0 18 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M9.715 9.268a1 1 0 0 1-1.43 0l-7.151-7.32C.514 1.317.964.25 1.849.25H16.15c.886 0 1.334 1.066.715 1.699l-7.15 7.319Z"
            fill="currentColor"
        />
    </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width={13}
        height={10}
        viewBox="0 0 13 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.075 8.925a1.5 1.5 0 0 0 2.122 0L12.56 2.56A1.5 1.5 0 0 0 10.439.439L5.136 5.742 3.368 3.974a1.5 1.5 0 0 0-2.121 2.122l2.802 2.802.026.027Z"
            fill="#1890FF"
        />
    </svg>
);

export default function CustomVersionDropdown(): JSX.Element {
    const activeDocContext = useActiveDocContext(docsPluginId);

    const [active, setActive] = React.useState(false);

    const ref = useClickOutside(() => {
        setActive(false);
    });

    const versions = useVersions(docsPluginId);

    const { savePreferredVersionName } = useDocsPreferredVersion(docsPluginId);

    const versionLinks = versions.map((version) => {
        // We try to link to the same doc, in another version
        // When not possible, fallback to the "main doc" of the version
        const versionDoc =
            activeDocContext.alternateDocVersions[version.name] ??
            getVersionMainDoc(version);
        return {
            label: version.label,
            to: versionDoc.path,
            isActive: () => version === activeDocContext.activeVersion,
            onClick: () => savePreferredVersionName(version.name),
        };
    });

    const items = [...versionLinks];

    const dropdownVersion = useDocsVersionCandidates(docsPluginId)[0];

    const dropdownLabel = dropdownVersion.label;

    const dropdownTo = getVersionMainDoc(dropdownVersion).path;

    console.log({
        items,
        dropdownLabel,
        dropdownTo,
        dropdownVersion,
        versions,
        versionLinks,
    });

    return (
        <div className="relative" ref={ref}>
            <button
                className={`w-full transition-all duration-100 ease-in-out h-8 appearance-none border border-solid rounded-lg flex justify-start px-3.5 tracking-wide font-montserrat text-[15px] leading-[20px] py-1.5 items-center ${
                    active
                        ? "bg-[#1890FF] text-white border-[#1890FF]"
                        : "bg-white border-[#2A2A42] text-[#2A2A42]"
                }`}
                style={
                    active
                        ? {
                              boxShadow:
                                  "4px 6px 12px 0 rgba(42, 42, 66, 0.25)",
                          }
                        : {}
                }
                onClick={() => setActive((p) => !p)}
            >
                <span className="font-normal mr-0.5">{"v "}</span>
                <span className="font-bold">{dropdownVersion?.label}</span>
                <ChevronDown
                    className={`mt-px ml-auto transition-all duration-100 ease-in-out ${
                        active ? "text-[white]" : "text-[#2A2A42]"
                    }`}
                />
            </button>
            <div
                className={`${
                    active ? "max-h-24" : "max-h-0"
                } h-auto w-full bg-[#F6F6F9] rounded-lg absolute top-10 left-0 overflow-hidden transition-all duration-100 ease-in-out z-[1]`}
                style={{
                    boxShadow: "4px 6px 12px 0 rgba(42, 42, 66, 0.25)",
                }}
            >
                <ul className="pl-0 mb-0">
                    {versionLinks.map((item) => (
                        <li
                            key={item.label}
                            className={`w-full select-none group cursor-pointer transition-all duration-100 ease-in-out h-8 border-0 tracking-wide font-montserrat text-[15px] leading-[20px] text-[#2A2A42]`}
                        >
                            <Link
                                to={item.to}
                                onClick={() => {
                                    item.onClick();
                                    setActive(false);
                                }}
                                className="w-full text-[#2A2A42] no-underline flex justify-start px-3.5 py-1.5 items-center"
                            >
                                <span className="font-normal mr-0.5">
                                    {"v "}
                                </span>
                                <span className="font-bold">{item.label}</span>
                                <CheckIcon
                                    className={`ml-auto ${
                                        item.isActive()
                                            ? "opacity-100"
                                            : "opacity-0 group-hover:opacity-50"
                                    }`}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
