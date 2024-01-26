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
                    "essentials/data-fetching/intro/index",
                    "essentials/data-fetching/fetching-data/index",
                    "essentials/data-fetching/updating-data/index",
                    "essentials/data-fetching/listing-data/index",
                    "essentials/forms/index",
                    "essentials/tables/index",
                ],
            },
            {
                title: "Authentication",
                id: "authentication",
                items: [
                    "authentication/intro/index", // intro
                    "authentication/protecting-content/index", // authProvider, check, useIsAuthenticated, <Authenticated />
                    "authentication/logging-in-out/index", // useLogin, useLogout, login, logout
                    "authentication/user-identity/index", // useGetIdentity, getIdentity
                    "authentication/data-provider-integration/index", // onError, dataProvider
                ],
            },
            {
                title: "Routing",
                id: "routing",
                items: [
                    "routing/intro/index", // intro
                    "routing/resource-definition/index", // router selection should be added
                    "routing/inferring-parameters/index", // router selection should be added
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
                ],
            },
            {
                title: "Next Steps",
                id: "next-steps",
                items: [
                    "next-steps/intro/index",
                    "next-steps/inferencer/:uiSelection/index",
                    "next-steps/devtools/:routerSelection/index",
                    "next-steps/cli/:routerSelection/index",
                    "next-steps/summary/index",
                ],
            },
        ],
    },
};
