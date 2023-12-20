import React from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import { Disclosure, Transition } from "@headlessui/react";
/** @ts-expect-error Docusaurus and Typescript doesn't play well together. */
import data from "@examples/examples-data.json";
import { EXAMPLES, SHOW_CASES } from "@site/src/assets/examples";
import clsx from "clsx";
import { GithubIconOutlined } from "@site/src/refine-theme/icons/github";
import { ArrowUpIcon } from "@site/src/refine-theme/icons/arrow-up";
import { AnimatePresence, motion } from "framer-motion";
import { Example } from "@site/src/types/examples";
import { TriangleDownIcon } from "@site/src/refine-theme/icons/triangle-down";

type ExampleDoc = Record<
    "id" | "title" | "description" | "permalink" | "displayTitle",
    string
> & { tags: string[] };

const { examples, tags } = data as {
    examples: ExampleDoc[];
    tags: {
        name: string;
        color: string;
    }[];
};

const priorityTags = [
    "antd",
    "mui",
    "chakra-ui",
    "mantine",
    "headless",
    "auth-provider",
    "audit-log-provider",
    "data-provider",
    "live-provider",
    "notification-provider",
    "access-control",
    "next.js",
    "remix",
    "table",
    "react-table",
    "form",
    "react-hook-form",
];

const sortedTags = tags.sort((a, b) => {
    const aIndex = priorityTags.indexOf(a.name);
    const bIndex = priorityTags.indexOf(b.name);

    if (aIndex === -1) {
        return bIndex === -1 ? 0 : 1;
    } else {
        return bIndex === -1 ? -1 : aIndex - bIndex;
    }
});

const PREDEFINED_COLORS = {
    antd: "#fa8c16",
    mui: "#0081cb",
    mantine: "#0ea5e9",
    "chakra-ui": "#319795",
};

const PREDEFINED_NAMES = {
    antd: "Ant Design",
    "material-ui": "Material UI",
    "chakra-ui": "Chakra UI",
    csv: "CSV Import / Export",
    javascript: "JavaScript",
};

const ExampleList: React.FC = () => {
    const [showMore, setShowMore] = React.useState(false);

    const [query] = React.useState("");
    const [filters, setFilters] = React.useState<Set<string>>(
        new Set(tags.map(({ name }) => name)),
    );

    const { search, hash } = useLocation();
    const { replace } = useHistory();

    const scrollToItem = React.useCallback(() => {
        const otherExamples = document.getElementById("other-examples");
        if (otherExamples) {
            otherExamples.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
    }, []);

    React.useEffect(() => {
        if (hash === "#other-examples") {
            setTimeout(() => {
                scrollToItem();
            }, 200);
        }
    }, [hash]);

    React.useEffect(() => {
        // tags are stored in the query string as a comma separated list
        const params = new URLSearchParams(search);
        const tags = params.get("tags");
        if (tags) {
            // validate tags by checking `staticTags`
            const validTags = tags
                .split(",")
                .filter((tag) => tags.includes(tag));
            setFilters(new Set(validTags));
        }
    }, []);

    const filteredExamples = examples.filter((example) => {
        const queryMatch = `${example.displayTitle
            .replace("antd", "Ant Design")
            .replace("mui", "Material UI")} ${example.displayTitle} ${
            example.description
        }`
            .toLowerCase()
            .includes((query ?? "").toLowerCase());
        // if all tags are selected, do not filter
        if (filters.size === tags.length) {
            return queryMatch;
        }

        // all selected filters should be present in the example
        const filterMatch = Array.from(filters).every((filter) =>
            example.tags.includes(filter),
        );

        return queryMatch && filterMatch;
    });

    const beautify = (str: string) => {
        return str
            .replace("antd", "Ant Design")
            .replace("mui", "Material UI")
            .replace("chakra-ui", "Chakra UI")
            .replace("next.js", "Next.js")
            .replace("next-js", "Next.js")
            .split("-")
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join(" ")
            .replace("I18n", "i18n");
    };

    const getTagName = (tag: string) => {
        return PREDEFINED_NAMES[tag] || beautify(tag);
    };

    const getTagColor = (tag: string) => {
        return PREDEFINED_COLORS[tag] || undefined;
    };

    const updateURLParams = (nextFilters?: Set<string>) => {
        if (
            !nextFilters ||
            nextFilters.size === tags.length ||
            nextFilters.size === 0
        ) {
            replace({
                search: "",
            });
        } else {
            replace({
                search: `?tags=${Array.from(nextFilters).join(",")}`,
            });
        }
    };

    const updateFilters = (tag: string) => {
        const newFilters = new Set(filters);
        // if all tags are selected, unselect all and select the clicked tag
        if (filters.size === tags.length) {
            newFilters.clear();
            newFilters.add(tag);
        } else {
            if (filters.has(tag)) {
                newFilters.delete(tag);
            } else {
                newFilters.add(tag);
            }
        }

        if (newFilters.size === 0) {
            updateURLParams();
            setFilters(new Set(tags.map(({ name }) => name)));
        } else {
            updateURLParams(newFilters);
            setFilters(newFilters);
        }
    };

    const renderShowcaseExampleCard = (example: Example) => {
        return (
            <div
                key={example.title}
                className={clsx(
                    "max-w-[100%] 2xl:max-w-[416px]",
                    "flex flex-col",
                    "mx-auto",
                    "px-2 pb-4 pt-2 2xl:px-4 2xl:py-4",
                    "bg-gray-50 dark:bg-gray-800",
                    "rounded-lg",
                )}
            >
                <div
                    className={clsx(
                        "not-prose",
                        "mb-0 mt-0",
                        "text-sm sm:text-base 2xl:text-xl font-semibold",
                        "text-gray-900 dark:text-gray-200",
                        "px-2 lg:px-2 xl:px-0",
                    )}
                >
                    {example.title}
                </div>
                <img
                    className={clsx(
                        "mb-0 mt-2 2xl:mt-4",
                        "w-full max-h-[456px]  md:h-[192px]  2xl:h-[242px]",
                        "object-cover",
                        "rounded-[2px]",
                    )}
                    src={example.image}
                    srcSet={example.image2x}
                    alt={example.title}
                />
                <p
                    className={clsx(
                        "not-prose",
                        "text-xs sm:text-sm 2xl:text-base",
                        "px-2 mb-0",
                        "text-gray-700 dark:text-gray-400",
                        "mt-4 2xl:mt-6",
                    )}
                    style={{
                        marginBottom: "0rem",
                    }}
                    dangerouslySetInnerHTML={{ __html: example.description }}
                />
                <div
                    className={clsx(
                        "flex justify-between items-center",
                        "px-2 2xl:px-0 pt-4 2xl:pt-6 2xl:pb-2 mt-auto",
                        "text-sm 2xl:text-base",
                    )}
                >
                    <a
                        href={example.source}
                        className={clsx(
                            "flex items-center gap-2",
                            "no-underline",
                        )}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <GithubIconOutlined
                            className={clsx("w-4 h-4 2xl:w-6 2xl:h-6")}
                        />
                        <span>Code</span>
                    </a>
                    {example.buttons.map((button, i) => {
                        return (
                            <a
                                key={i}
                                href={button.link}
                                className={clsx(
                                    "flex items-center gap-2",
                                    "no-underline",
                                )}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {button.icon({
                                    className: clsx("w-4 h-4 2xl:w-6 2xl:h-6"),
                                })}
                                <span>{button.text}</span>
                            </a>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderFilterList = () => {
        return (
            <div className="flex justify-start gap-2 flex-wrap mt-0 md:mt-4 2xl:mt-10">
                {sortedTags.sort().map(({ name, color }) => {
                    const isActive = filters.has(name);
                    const allSelected = filters.size === tags.length;

                    const tagColor = getTagColor(name) ?? color;

                    return (
                        <button
                            key={name}
                            className={clsx(
                                "appearance-none",
                                "select-none",
                                "rounded-lg",
                                "flex items-center justify-center",
                                "gap-2 px-3 py-[4px]",
                                "text-sm",
                                "cursor-pointer",
                                {
                                    "text-gray-600 dark:text-gray-400":
                                        !isActive || allSelected,
                                    "text-gray-900 dark:text-gray-0":
                                        isActive && !allSelected,
                                    "bg-gray-100 dark:bg-gray-800":
                                        !isActive || allSelected,
                                },
                            )}
                            style={{
                                borderWidth: "1px",
                                borderColor:
                                    isActive && !allSelected
                                        ? `${tagColor}40`
                                        : "transparent",
                                backgroundColor:
                                    isActive && !allSelected
                                        ? `${tagColor}33`
                                        : "",
                            }}
                            onClick={() => updateFilters(name)}
                        >
                            <div
                                className={clsx("w-2 h-2 rounded-full", {
                                    "bg-gray-400 dark:bg-gray-600":
                                        !isActive || allSelected,
                                })}
                                style={{
                                    backgroundColor:
                                        isActive && !allSelected
                                            ? tagColor
                                            : "",
                                }}
                            />
                            {getTagName(name)}
                        </button>
                    );
                })}
            </div>
        );
    };

    const renderDisclosureFilterList = () => {
        return (
            <Disclosure>
                {({ open }) => (
                    <div
                        className={clsx(
                            "rounded-[4px]",
                            "border border-gray-100 dark:border-gray-700",
                        )}
                    >
                        <Disclosure.Button
                            className={clsx(
                                "w-full",
                                "flex items-center gap-3",
                                "px-2 py-2",
                                "bg-gray-100 dark:bg-gray-800",
                                {
                                    "border-b border-gray-100 dark:border-gray-700":
                                        open,
                                },
                            )}
                        >
                            <TriangleDownIcon
                                className={clsx(
                                    "h-5 w-5",
                                    "text-gray-400 dark:text-gray-500",
                                    "transition-all duration-200 ease-in-out",
                                    {
                                        "transform -rotate-90": !open,
                                    },
                                )}
                            />
                            <div
                                className={clsx(
                                    "w-full flex items-center justify-between gap-2",
                                )}
                            >
                                <span
                                    className={clsx(
                                        "text-sm",
                                        "text-gray-500 dark:text-gray-400",
                                    )}
                                >
                                    Filters
                                </span>
                                <span
                                    className={clsx(
                                        "text-sm",
                                        "text-gray-500 dark:text-gray-400",
                                    )}
                                >
                                    {filteredExamples.length} examples
                                </span>
                            </div>
                        </Disclosure.Button>
                        <Transition
                            show={open}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Disclosure.Panel className="p-2">
                                {renderFilterList()}
                            </Disclosure.Panel>
                        </Transition>
                    </div>
                )}
            </Disclosure>
        );
    };

    const renderFilters = () => {
        return (
            <div className="flex flex-col">
                <div
                    className={clsx(
                        "flex items-center justify-between mt-4 pb-4",
                        "md:border-b border-gray-200 dark:border-gray-700",
                    )}
                >
                    <span
                        className={clsx(
                            "hidden md:block",
                            "mb-0 mt-0",
                            "text-2xl",
                            "text-gray-700 dark:text-gray-200",
                            "font-semibold",
                        )}
                    >
                        Filters
                    </span>
                    <span
                        className={clsx(
                            "hidden md:block",
                            "text-base",
                            "text-gray-500",
                        )}
                    >
                        {filteredExamples.length} examples
                    </span>
                </div>
                <div className="hidden md:flex">{renderFilterList()}</div>
                <div className="block md:hidden">
                    {renderDisclosureFilterList()}
                </div>
            </div>
        );
    };

    const renderCard = (example: ExampleDoc) => {
        const { id, displayTitle, description, permalink } = example;
        return (
            <a
                href={permalink}
                key={id}
                className={clsx(
                    "flex flex-col h-full",
                    "rounded-lg",
                    "no-underline",
                    "py-4 2xl:py-6 pt-2 2xl:pt-6 pb-3 2xl:pb-4",
                    "bg-gray-50 dark:bg-gray-800",
                )}
            >
                <div
                    className={clsx(
                        "cursor-pointer",
                        "no-underline",
                        "font-bold",
                        "text-base 2xl:text-xl",
                        "text-gray-900 dark:text-gray-200",
                        "px-4 2xl:px-6",
                    )}
                >
                    {beautify(displayTitle)}
                </div>
                <div
                    className={clsx(
                        "cursor-pointer",
                        "no-underline",
                        "line-clamp-4 sm:line-clamp-3",
                        "text-xs sm:text-sm 2xl:text-base",
                        "text-gray-700 dark:text-gray-400",
                        "my-2 2xl:my-6",
                        "px-4 2xl:px-6",
                    )}
                >
                    {description}
                </div>

                <div
                    className={clsx(
                        "mt-2 2xl:mt-0",
                        "w-full h-[1px]",
                        "bg-gray-200 dark:bg-gray-700",
                    )}
                />
                <div
                    className={clsx(
                        "pt-3 2xl:pt-4",
                        "flex flex-wrap gap-4 pt-1 pb-1 mt-auto",
                        "px-4 2xl:px-6",
                    )}
                >
                    {example.tags.map((tag) => (
                        <div
                            key={tag}
                            className={clsx([
                                "flex",
                                "items-center",
                                "justify-center",
                                "gap-2",
                            ])}
                        >
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                    backgroundColor:
                                        getTagColor(tag) ??
                                        tags.find(({ name }) => name === tag)
                                            ?.color,
                                }}
                            />
                            <div
                                className={clsx(
                                    "text-xs 2xl:text-base",
                                    "text-gray-600 dark:text-gray-500",
                                )}
                            >
                                {getTagName(tag)}
                            </div>
                        </div>
                    ))}
                </div>
            </a>
        );
    };

    const renderCards = () => {
        return (
            <div
                className={clsx(
                    "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2",
                    "gap-4 2xl:gap-x-8 2xl:gap-y-12",
                )}
            >
                <AnimatePresence>
                    {filteredExamples.map((example) => {
                        return (
                            <motion.div
                                layout
                                key={example.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderCard(example)}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className="">
            <div className="mt-16">{renderFilters()}</div>
            <div className="mt-10">{renderCards()}</div>
        </div>
    );
};

export default ExampleList;
