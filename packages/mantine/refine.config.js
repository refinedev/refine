module.exports = {
    swizzle: {
        items: [
            {
                label: "ShowButton",
                files: [
                    {
                        src: "./src/components/buttons/show/index.tsx",
                        dist: "./src/components/buttons/show.tsx",
                    },
                ],
            },
            {
                label: "Create",
                files: [
                    {
                        src: "./src/components/crud/create/index.tsx",
                        dist: "./src/components/crud/create.tsx",
                    },
                ],
            },
        ],
        transform: undefined,
        move: undefined,
    },
};
