import { Plugin } from "@docusaurus/types";
import path from "path";

type DocusaurusDoc = {
    unversionedId: string;
    id: string;
    title: string;
    description: string;
    source: string;
    sourceDirName: string;
    slug: string;
    permalink: string;
    draft: boolean;
    editUrl: string;
    tags: string[];
    version: string;
    lastUpdatedBy: string;
    lastUpdatedAt: number;
    formattedLastUpdatedAt: string;
    frontMatter: {
        id: string;
        title: string;
        description?: string;
        tags?: string[];
    };
    sidebar: string;
    previous?: {
        title: string;
        permalink: string;
    };
    next?: {
        title: string;
        permalink: string;
    };
};

type ContentPluginType = {
    default: {
        loadedVersions: Array<{ docs: DocusaurusDoc[] }>;
    };
};

type ExampleDoc = Pick<
    DocusaurusDoc,
    "id" | "title" | "description" | "permalink"
> & { tags: string[] };

const colorByHash = (input: string) => {
    let hash = 0;
    let color = "#";

    input.split("").forEach((char) => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });

    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ("00" + value.toString(16)).slice(-2);
    }

    return color;
};

const addColorToTags = (tags: string[]) => {
    let colors = [
        "#ef4444",
        "#f97316",
        "#f59e0b",
        "#eab308",
        "#84cc16",
        "#22c55e",
        "#10b981",
        "#14b8a6",
        "#06b6d4",
        "#0ea5e9",
        "#3b82f6",
        "#6366f1",
        "#8b5cf6",
        "#a855f7",
        "#d946ef",
        "#ec4899",
        "#f43f5e",
    ];

    // if there are more tags than colors, we will reuse colors.
    // multiply the colors array until it is bigger than the tags array
    while (colors.length < tags.length) {
        colors = [...colors, ...colors];
    }

    const selectedColorIndexes: number[] = [];
    const tagsWithColor = tags.map((tag) => {
        // pick a random color
        let randomColorIndex = Math.floor(Math.random() * colors.length);
        // if the color is already used, pick another one
        while (selectedColorIndexes.includes(randomColorIndex)) {
            randomColorIndex = Math.floor(Math.random() * colors.length);
        }

        const color = colors[randomColorIndex];
        selectedColorIndexes.push(randomColorIndex);

        return {
            name: tag,
            color: color,
        };
    });

    return tagsWithColor;
};

export default function plugin(): Plugin {
    return {
        name: "docusaurus-plugin-refine-examples",
        configureWebpack(config) {
            return {
                resolve: {
                    alias: {
                        "@examples": path.join(
                            config.resolve?.alias?.["@generated"],
                            "docusaurus-plugin-refine-examples",
                            "default",
                        ),
                    },
                },
            };
        },
        async contentLoaded({ allContent, actions }): Promise<void> {
            if (!process.env.DISABLE_EXAMPLES) {
                console.log("Composing Refine examples...");

                const { createData } = actions;

                const currentVersion = (
                    allContent[
                        "docusaurus-plugin-content-docs"
                    ] as ContentPluginType
                ).default.loadedVersions[0];

                const allDocs = currentVersion.docs as DocusaurusDoc[];

                const allExamples: ExampleDoc[] = allDocs
                    .filter(
                        (doc) =>
                            doc.id.startsWith("examples/") &&
                            doc.id !== "examples/examples",
                    )
                    .map((doc) => {
                        const titleFromId =
                            doc.id
                                .replace("examples/", "")
                                .split("/")
                                .slice(0, -1)
                                .join("-") +
                            " " +
                            doc.title
                                .replace("antd", "Ant Design")
                                .replace("mui", "Material UI")
                                .replace("chakra-ui", "Chakra UI");

                        return {
                            // ...doc,
                            id: doc.id,
                            baseTitle: doc.title,
                            title: doc.title
                                .replace("antd", "Ant Design")
                                .replace("mui", "Material UI")
                                .replace("chakra-ui", "Chakra UI"),
                            displayTitle:
                                doc.frontMatter["example-title"] ??
                                titleFromId ??
                                doc.title
                                    .replace("antd", "Ant Design")
                                    .replace("mui", "Material UI")
                                    .replace("chakra-ui", "Chakra UI"),
                            description: doc.description,
                            permalink: doc.permalink,
                            tags: doc.frontMatter["example-tags"] || [],
                        };
                    });

                const allTags = allExamples
                    .reduce(
                        (acc, example) => [...acc, ...example.tags],
                        [] as string[],
                    )
                    .filter((tag, index, self) => self.indexOf(tag) === index);

                const data = {
                    examples: allExamples,
                    tags: addColorToTags(allTags),
                };

                await createData(`examples-data.json`, JSON.stringify(data));
            } else {
                const { createData } = actions;

                await createData(
                    `examples-data.json`,
                    JSON.stringify({ examples: [], tags: [] }),
                );
            }
        },
    };
}
