import { Plugin } from "@docusaurus/types";
import fs from "fs-extra";
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

const getDocContent = async (docPath: string) => {
    const accessPath = docPath.startsWith("@site/")
        ? docPath.replace("@site/", "./")
        : docPath;

    return new Promise<string | undefined>((resolve) => {
        fs.readFile(path.resolve(accessPath), (err, data) => {
            if (err) {
                resolve(undefined);
            }

            return resolve(data.toString());
        });
    });
};

const getChecklistItems = (docContent: string) => {
    const regex = /<ChecklistItem[\s\n\r\t]+id="((?:\w|\d|-|_)+)"[\s\n\r\t]*>/g;

    const matches = docContent.matchAll(regex);

    const itemIds = Array.from(matches).map((match) => match[1]);

    return itemIds;
};

const getUnitById = (id: string) => {
    // tutorial/<unit-name>/<ui-scope(optional)>/<tutorial-slug>
    const unitId = id.split("/")[1];

    return unitId;
};

export default function plugin(): Plugin {
    return {
        name: "docusaurus-plugin-refine-checklist",
        configureWebpack(config) {
            return {
                resolve: {
                    alias: {
                        "@checklists": path.join(
                            config.resolve?.alias?.["@generated"],
                            "docusaurus-plugin-refine-checklist",
                            "default",
                        ),
                    },
                },
            };
        },
        async contentLoaded({ allContent, actions }): Promise<void> {
            if (!process.env.DISABLE_CHECKLISTS) {
                console.log("Composing refine tutorial checklists...");

                const { createData } = actions;

                const currentVersion = (
                    allContent[
                        "docusaurus-plugin-content-docs"
                    ] as ContentPluginType
                ).default.loadedVersions[0];

                const allDocs = currentVersion.docs as DocusaurusDoc[];

                const allTutorials: DocusaurusDoc[] = allDocs.filter(
                    (doc) =>
                        doc.id.startsWith("tutorial/") &&
                        doc.id !== "tutorial/tutorial",
                );

                const tutorialsWithChecklist = await Promise.all(
                    allTutorials.map(async (tutorial) => {
                        const docContent = await getDocContent(tutorial.source);
                        const checklistItemIds = getChecklistItems(
                            docContent ?? "",
                        );

                        return {
                            id: tutorial.id,
                            unit: getUnitById(tutorial.id),
                            title: tutorial.title,
                            checklist: checklistItemIds.map((id, index) => ({
                                id,
                                index,
                            })),
                        };
                    }),
                );

                const data = {
                    items: tutorialsWithChecklist,
                };

                await createData(
                    `tutorial-checklist-data.json`,
                    JSON.stringify(data),
                );
            } else {
                const { createData } = actions;
                await createData(
                    `tutorial-checklist-data.json`,
                    JSON.stringify({ items: [] }),
                );
            }
        },
    };
}
