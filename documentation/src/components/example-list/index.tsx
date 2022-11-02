import React from "react";
import { useLocation, useHistory } from "@docusaurus/router";

/** @ts-expect-error Docusaurus and Typescript doesn't play well together. */
import data from "@examples/examples-data.json";

type ExampleDoc = Record<
    "id" | "title" | "description" | "permalink" | "displayTitle",
    string
> & { tags: string[] };

const { examples, tags: allTags } = data as {
    examples: ExampleDoc[];
    tags: {
        name: string;
        color: string;
    }[];
};

const staticTags = [
    "headless",
    "antd",
    "mui",
    "mantine",
    "chakra-ui",
    "data-provider",
    "live-provider",
    "auth-provider",
    "router-provider",
    "access-control",
    "i18n",
    "form",
    "table",
    "refine-hooks",
    "customization",
    "upload",
    "tutorial",
    "vite",
    "testing",
];

const visibleTags = staticTags.map((tag) => ({
    name: tag,
    color: allTags.find((aTag) => aTag.name === tag).color,
}));

const PREDEFINED_COLORS = {
    react: "#61dafb",
    vite: "#646cff",
    "react-router": "#ca4245",
    rest: "#f1e05a",
    graphql: "#e10098",
    antd: "#fa8c16",
    "material-ui": "#0081cb",
    tailwind: "#38b2ac",
    mantine: "#0ea5e9",
    "chakra-ui": "#319795",
    auth0: "#eb5424",
    appwrite: "#f24c69",
    supabase: "#00c7b7",
    firebase: "#ffca28",
    strapi: "#2e7eea",
    medusa: "#5b21b6",
};

const PREDEFINED_NAMES = {
    antd: "Ant Design",
    "material-ui": "Material UI",
    tailwind: "Tailwind CSS",
    rest: "REST",
    graphql: "GraphQL",
    "chakra-ui": "Chakra UI",
};

const ExampleList: React.FC = () => {
    const [query, setQuery] = React.useState("");
    const [filters, setFilters] = React.useState<Set<string>>(
        new Set(visibleTags.map(({ name }) => name)),
    );

    const { search } = useLocation();
    const { replace } = useHistory();

    React.useEffect(() => {
        // tags are stored in the query string as a comma separated list
        const params = new URLSearchParams(search);
        const tags = params.get("tags");
        if (tags) {
            // validate tags by checking `staticTags`
            const validTags = tags
                .split(",")
                .filter((tag) => staticTags.includes(tag));
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
        if (filters.size === visibleTags.length) {
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
            nextFilters.size === visibleTags.length ||
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
        if (filters.size === visibleTags.length) {
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
            setFilters(new Set(visibleTags.map(({ name }) => name)));
        } else {
            updateURLParams(newFilters);
            setFilters(newFilters);
        }
    };

    const renderFilters = () => {
        return (
            <div className="flex flex-col gap-3 pb-3">
                <div className="flex items-end gap-4">
                    <h3 className="mb-0 text-[24px] leading-[24px]">Filters</h3>
                    <span className="leading-[18px] text-[14px]">
                        {filteredExamples.length} examples
                    </span>
                </div>
                <div className="flex justify-start gap-2 flex-wrap">
                    {visibleTags.map(({ name, color }) => {
                        const isActive = filters.has(name);
                        const allSelected = filters.size === visibleTags.length;
                        return (
                            <button
                                key={name}
                                className={`appearance-none select-none rounded border border-slate-300 border-solid flex items-center justify-center gap-2 py-1.5 pl-2 pr-2.5 cursor-pointer shadow-sm hover:shadow ${
                                    isActive && !allSelected
                                        ? ""
                                        : "hover:!bg-slate-200 hover:!bg-opacity-30"
                                }`}
                                style={{
                                    backgroundColor:
                                        isActive && !allSelected
                                            ? `${getTagColor(name) ?? color}33`
                                            : "transparent",
                                }}
                                onClick={() => updateFilters(name)}
                            >
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{
                                        backgroundColor:
                                            getTagColor(name) ?? color,
                                    }}
                                />
                                {getTagName(name)}
                            </button>
                        );
                    })}
                </div>
                <div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search in examples..."
                        className="appearance-none bg-transparent rounded border border-slate-300 border-solid py-2 pl-2 pr-2.5 w-full outline-none focus:outline-none focus:ring-1 focus:ring-slate-300 focus:ring-opacity-50"
                    />
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
                className="rounded-lg no-underline border group shadow-sm hover:shadow-md border-slate-300 border-solid px-3 py-2 flex flex-col gap-1.5 h-full"
            >
                <div className="cursor-pointer no-underline group-hover:underline font-bold font-2xl tracking-wide text-[color:var(--ifm-font-color-base)]">
                    {beautify(displayTitle)}
                </div>
                <div className="cursor-pointer text-xs tracking-tight line-clamp-3 h-12 mb-0 no-underline text-[color:var(--ifm-font-color-base)]">
                    {description}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1 pb-1 mt-auto">
                    {example.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-md border border-slate-300 border-solid flex items-center justify-center gap-1 py-px pl-1 pr-1.5 text-xs text-[color:var(--ifm-font-color-base)]"
                        >
                            <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                    backgroundColor:
                                        getTagColor(tag) ??
                                        allTags.find(({ name }) => name === tag)
                                            ?.color,
                                }}
                            />
                            {getTagName(tag)}
                        </span>
                    ))}
                </div>
            </a>
        );
    };

    const renderCards = () => {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {filteredExamples.map((example) => {
                    return renderCard(example);
                })}
            </div>
        );
    };

    return (
        <div className="">
            <div className="pb-4">{renderFilters()}</div>
            <div className="pb-4">{renderCards()}</div>
        </div>
    );
};

export default ExampleList;
