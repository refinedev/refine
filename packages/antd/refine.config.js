const { getImports, getNameChangeInImport } = require("@pankod/refine-cli");

/** @type {import('@pankod/refine-cli').RefineConfig} */
module.exports = {
    swizzle: {
        items: [
            {
                label: "ShowButton",
                files: [
                    {
                        src: "./src/components/buttons/show/index.tsx",
                        dest: "./src/components/buttons/show.tsx",
                    },
                ],
            },
            {
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
            console.log(getImports(content));
            return content;
        },
    },
};
