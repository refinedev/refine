const { getImports } = require("@pankod/refine-cli");

/** @type {import('@pankod/refine-cli').RefineConfig} */
module.exports = {
    group: "Data Provider",
    swizzle: {
        items: [
            {
                label: "Data Provider",
                files: [
                    {
                        src: "./src/provider.ts",
                        dest: "./rest-data-provider/index.ts",
                    },
                    {
                        src: "./src/utils/axios.ts",
                        dest: "./rest-data-provider/utils/axios.ts",
                    },
                    {
                        src: "./src/utils/generateFilter.ts",
                        dest: "./rest-data-provider/utils/generateFilter.ts",
                    },
                    {
                        src: "./src/utils/generateSort.ts",
                        dest: "./rest-data-provider/utils/generateSort.ts",
                    },
                    {
                        src: "./src/utils/mapOperator.ts",
                        dest: "./rest-data-provider/utils/mapOperator.ts",
                    },
                    {
                        src: "./src/utils/index.ts",
                        dest: "./rest-data-provider/utils/index.ts",
                    },
                ],
                message: `
                **\`Warning:\`**
                You will also need to add \`axios\` to your project dependencies.

                **\`Usage\`**

                \`\`\`
                // title: App.tsx
                import { dataProvider } from "./rest-data-provider";

                const App = () => {
                    return (
                        <Refine
                            dataProvider={dataProvider}
                            /* ... */
                        />
                    );
                }
                \`\`\`
                `,
            },
        ],
        transform: (content) => {
            let newContent = content;
            const imports = getImports(content);

            imports?.map((importItem) => {
                if (
                    importItem?.importPath === "axios" &&
                    importItem?.defaultImport === "axios"
                ) {
                    // add comment for axios import
                    newContent = newContent.replace(
                        importItem.statement,
                        `// "axios" package should be installed to customize the http client
            ${importItem.statement}`,
                    );
                }
                if (importItem?.importPath === "query-string") {
                    // update query-string import
                    newContent = newContent.replace(
                        importItem?.statement,
                        `// "stringify" function is re-exported from "query-string" package by "@pankod/refine-simple-rest"
            ${importItem.statement.replace(
                "query-string",
                "@pankod/refine-simple-rest",
            )}`,
                    );
                }
                if (
                    importItem?.importPath === "axios" &&
                    importItem?.namedImports
                ) {
                    // update axios type import
                    newContent = newContent.replace(
                        importItem.statement,
                        `// "axios" package needs to be installed
            ${importItem.statement}`,
                    );
                }
            });

            return newContent;
        },
    },
};
