const {
    getImports,
    getNameChangeInImport,
    appendAfterImports,
} = require("@pankod/refine-cli");

/** @type {import('@pankod/refine-cli').RefineConfig} */
module.exports = {
    swizzle: {
        items: [
            {
                group: "Buttons",
                label: "ShowButton",
                files: [
                    {
                        src: "./src/components/buttons/show/index.tsx",
                        dest: "./src/components/buttons/show.tsx",
                    },
                ],
            },
            {
                group: "Buttons",
                label: "CreateButton",
                files: [
                    {
                        src: "./src/components/buttons/create/index.tsx",
                        dest: "./src/components/buttons/create.tsx",
                    },
                ],
            },
            {
                group: "Basic Views",
                label: "Create",
                files: [
                    {
                        src: "./src/components/crud/create/index.tsx",
                        dest: "./src/components/crud/create.tsx",
                    },
                ],
            },
        ],
        transform: (content, src, dest) => {
            let newContent = content;
            const imports = getImports(content);

            imports.map((importItem) => {
                // for antd imports
                if (importItem.importPath === "antd") {
                    const newStatement = `import ${importItem.namedImports} from "@pankod/refine-antd";`;

                    newContent = newContent.replace(
                        importItem.statement,
                        newStatement,
                    );
                }

                // for icons
                if (importItem.importPath === "@ant-design/icons") {
                    const newStatement = `import { Icons } from "@pankod/refine-antd";`;

                    const iconsLine = `
                    const ${importItem.namedImports} = Icons;
                    `;

                    newContent = newContent.replace(
                        importItem.statement,
                        newStatement,
                    );

                    newContent = appendAfterImports(newContent, iconsLine);
                }

                // for ui-types
                if (importItem.importPath === "@pankod/refine-ui-types") {
                    newContent = newContent.replace(importItem.statement, "");

                    // prop is data-testid
                    // remove data-testid={*} from props
                    const testIdPropRegex = /data-testid={.*?}/g;

                    newContent = newContent.replace(testIdPropRegex, "");
                }
            });

            return newContent;
        },
    },
};
