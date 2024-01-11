module.exports = {
    tutorial: {
        label: "Tutorial",
        path_prefix_segment: "tutorial",
        defaultParameters: {
            routerSelection: "react-router",
            uiSelection: "ant-design",
        },
        parameterOptions: {
            routerSelection: [
                {
                    label: "React Router",
                    value: "react-router",
                },
                {
                    label: "Next.js",
                    value: "next-js",
                },
                {
                    label: "Remix",
                    value: "remix",
                },
            ],
            uiSelection: [
                {
                    label: "Ant Design",
                    value: "ant-design",
                },
                {
                    label: "Material UI",
                    value: "material-ui",
                },
            ],
        },
        units: [
            {
                title: "Essentials",
                id: "essentials",
                items: [
                    "essentials/intro/index",
                    "essentials/setup/index",
                    "essentials/data-fetching/index",
                    "essentials/forms/index",
                    "essentials/tables/index",
                ],
            },
            {
                title: "Authentication",
                id: "authentication",
                items: [
                    "authentication/intro/index",
                    "authentication/auth-provider/index",
                    "authentication/protecting-content/index",
                    "authentication/auth-pages/index",
                ],
            },
            {
                title: "Routing",
                id: "routing",
                items: [
                    "routing/intro/index",
                    "routing/resource-definition/index",
                    "routing/infering-parameters/index",
                    "routing/redirects/:routerSelection/index",
                    "routing/syncing-state/:routerSelection/index",
                    "routing/authentication/:routerSelection/index",
                ],
            },
            {
                title: "UI Libraries",
                id: "ui-libraries",
                items: [
                    "ui-libraries/intro/index",
                    "ui-libraries/layout/:uiSelection/:routerSelection/index",
                    "ui-libraries/crud-components/:uiSelection/:routerSelection/index",
                    "ui-libraries/refactoring/:uiSelection/:routerSelection/index",
                    "ui-libraries/summary/:uiSelection/:routerSelection/index",
                ],
            },
        ],
    },
};
