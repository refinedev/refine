import { Plugin } from "@docusaurus/types";
import path from "path";
import fs from "fs-extra";

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
                console.log("Composing refine examples...");

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
                    tags: allTags.map((tag) => ({
                        name: tag,
                        color: colorByHash(tag),
                    })),
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
