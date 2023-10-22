/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarItem} */
const GettingStarted = {
    type: "category",
    label: "Getting Started",
    className: "category-as-header",
    items: [
        "getting-started/overview/index",
        "getting-started/quick-start/index",
        {
            type: "doc",
            label: "Tutorial",
            id: "tutorial/introduction/index",
        },
        "examples/index",
    ],
};

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarItem} */
const GuidesConcepts = {
    type: "category",
    label: "Guides & Concepts",
    className: "category-as-header",
    items: [
        "guides-concepts/general-concepts/index",
        "guides-concepts/data-fetching/index",
        {
            type: "category",
            label: "Routing 🚧",
            link: {
                type: "doc",
                id: "guides-concepts/routing/index",
            },
            items: [
                "guides-concepts/routing/nextjs/index",
                "guides-concepts/routing/remix/index",
                "guides-concepts/routing/react-router/index",
            ],
        },
        "guides-concepts/authentication/index",
        "guides-concepts/authorization/index",
        {
            type: "category",
            label: "UI Libraries 🚧",
            link: {
                type: "doc",
                id: "guides-concepts/ui-libraries/index",
            },
            items: [
                "guides-concepts/ui-libraries/ant-design/index",
                "guides-concepts/ui-libraries/material-ui/index",
                "guides-concepts/ui-libraries/chakra-ui/index",
                "guides-concepts/ui-libraries/mantine/index",
                "guides-concepts/ui-libraries/custom/index",
            ],
        },
        {
            type: "category",
            label: "Tables 🚧",
            link: {
                type: "doc",
                id: "guides-concepts/tables/index",
            },
            items: [
                "guides-concepts/tables/ant-design/index",
                "guides-concepts/tables/material-ui/index",
                "guides-concepts/tables/react-table/index",
            ],
        },
        {
            type: "category",
            label: "Forms 🚧",
            link: {
                type: "doc",
                id: "guides-concepts/forms/index",
            },
            items: [
                "guides-concepts/forms/ant-design/index",
                "guides-concepts/forms/mantine/index",
                "guides-concepts/forms/react-hook-form/index",
            ],
        },
        "guides-concepts/internationalization/index",
        "guides-concepts/realtime/index",
        "guides-concepts/notifications/index",
        "guides-concepts/audit-logs/index",
        "guides-concepts/development/index",
        "guides-concepts/multi-tenancy/index",
        "guides-concepts/import-export/index",
        "guides-concepts/upload/index",
        "guides-concepts/faq/index",
    ],
};

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarItem} */
const CoreAPI = {
    type: "category",
    label: "Core",
    className: "category-as-header",
    items: [
        {
            type: "doc",
            id: "core/refine-component/index",
            label: "<Refine>",
            className: "font-mono",
        },
        {
            type: "category",
            label: "Providers",
            items: [
                "core/providers/auth-provider/index",
                "core/providers/access-control-provider/index",
                "core/providers/audit-log-provider/index",
                "core/providers/data-provider/index",
                "core/providers/i18n-provider/index",
                "core/providers/live-provider/index",
                "core/providers/notification-provider/index",
                "core/providers/router-provider/index",
            ],
        },
        {
            type: "category",
            label: "Components",
            collapsible: false,
            items: [
                "core/components/authenticated/index",
                "core/components/can-access/index",
                "core/components/auth-page/index",
                "core/components/auto-save-indicator/index",
                "core/components/inferencer/index",
            ],
        },
        {
            type: "category",
            label: "Hooks",
            collapsible: false,
            items: [
                "core/hooks/use-show/index",
                "core/hooks/use-table/index",
                "core/hooks/use-select/index",
                "core/hooks/use-form/index",
                "core/hooks/use-can/index",
                { type: "html", value: "AUTH" },
                "core/hooks/auth/use-is-authenticated/index",
                "core/hooks/auth/use-on-error/index",
                "core/hooks/auth/use-get-identity/index",
                "core/hooks/auth/use-login/index",
                "core/hooks/auth/use-logout/index",
                "core/hooks/auth/use-permissions/index",
                "core/hooks/auth/use-register/index",
                "core/hooks/auth/use-forgot-password/index",
                "core/hooks/auth/use-update-password/index",
                { type: "html", value: "DATA" },
                "core/hooks/data/use-one/index",
                "core/hooks/data/use-many/index",
                "core/hooks/data/use-list/index",
                "core/hooks/data/use-infinite-list/index",
                "core/hooks/data/use-create/index",
                "core/hooks/data/use-create-many/index",
                "core/hooks/data/use-update/index",
                "core/hooks/data/use-update-many/index",
                "core/hooks/data/use-delete/index",
                "core/hooks/data/use-delete-many/index",
                "core/hooks/data/use-custom/index",
                "core/hooks/data/use-custom-mutation/index",
                "core/hooks/data/use-invalidate/index",
                "core/hooks/data/use-api-url/index",
                "core/hooks/data/use-data-provider/index",
                { type: "html", value: "AUDIT LOG" },
                "core/hooks/audit-log/use-log/index",
                "core/hooks/audit-log/use-log-list/index",
                { type: "html", value: "REALTIME" },
                "core/hooks/realtime/use-publish/index",
                "core/hooks/realtime/use-subscription/index",
                { type: "html", value: "NAVIGATION" },
                "core/hooks/navigation/use-resource/index",
                "core/hooks/navigation/use-go/index",
                "core/hooks/navigation/use-back/index",
                "core/hooks/navigation/use-parsed/index",
                "core/hooks/navigation/use-link/index",
                "core/hooks/navigation/use-get-to-path/index",
                "core/hooks/navigation/use-navigation/index",
                { type: "html", value: "TRANSLATE" },
                "core/hooks/translate/use-get-locale/index",
                "core/hooks/translate/use-set-locale/index",
                "core/hooks/translate/use-translate/index",
                { type: "html", value: "UTILITIES" },
                "core/hooks/utilities/use-modal/index",
                "core/hooks/utilities/use-menu/index",
                "core/hooks/utilities/use-breadcrumb/index",
                "core/hooks/utilities/use-notification/index",
                "core/hooks/utilities/use-import/index",
                "core/hooks/utilities/use-export/index",
            ],
        },
        "core/interface-references/index",
    ],
};

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarItem} */
const AntDesign = {
    type: "category",
    label: "Ant Design",
    collapsible: false,
    // className: "category-as-header",
    items: [
        {
            type: "category",
            label: "Components",
            items: [
                "ui-integrations/ant-design/components/themed-layout/index",
                "ui-integrations/ant-design/components/auth-page/index",
                "ui-integrations/ant-design/components/breadcrumb/index",
                "ui-integrations/ant-design/components/filter-dropdown/index",
                "ui-integrations/ant-design/components/auto-save-indicator/index",
                "ui-integrations/ant-design/components/inferencer/index",
                // "ui-integrations/ant-design/components/custom-inputs/index", // This should be included in the guide
                {
                    type: "category",
                    label: "Basic Views",
                    items: [
                        "ui-integrations/ant-design/components/basic-views/create/index",
                        "ui-integrations/ant-design/components/basic-views/edit/index",
                        "ui-integrations/ant-design/components/basic-views/list/index",
                        "ui-integrations/ant-design/components/basic-views/show/index",
                    ],
                },
                {
                    type: "category",
                    label: "Buttons",
                    items: [
                        "ui-integrations/ant-design/components/buttons/clone-button/index",
                        "ui-integrations/ant-design/components/buttons/create-button/index",
                        "ui-integrations/ant-design/components/buttons/delete-button/index",
                        "ui-integrations/ant-design/components/buttons/edit-button/index",
                        "ui-integrations/ant-design/components/buttons/export-button/index",
                        "ui-integrations/ant-design/components/buttons/import-button/index",
                        "ui-integrations/ant-design/components/buttons/list-button/index",
                        "ui-integrations/ant-design/components/buttons/refresh-button/index",
                        "ui-integrations/ant-design/components/buttons/save-button/index",
                        "ui-integrations/ant-design/components/buttons/show-button/index",
                    ],
                },
                {
                    type: "category",
                    label: "Fields",
                    items: [
                        "ui-integrations/ant-design/components/fields/boolean-field/index",
                        "ui-integrations/ant-design/components/fields/date-field/index",
                        "ui-integrations/ant-design/components/fields/email-field/index",
                        "ui-integrations/ant-design/components/fields/file-field/index",
                        "ui-integrations/ant-design/components/fields/image-field/index",
                        "ui-integrations/ant-design/components/fields/markdown-field/index",
                        "ui-integrations/ant-design/components/fields/number-field/index",
                        "ui-integrations/ant-design/components/fields/tag-field/index",
                        "ui-integrations/ant-design/components/fields/text-field/index",
                        "ui-integrations/ant-design/components/fields/url-field/index",
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Hooks",
            items: [
                "ui-integrations/ant-design/hooks/use-table/index",
                "ui-integrations/ant-design/hooks/use-editable-table/index",
                "ui-integrations/ant-design/hooks/use-simplelist/index",
                "ui-integrations/ant-design/hooks/use-form/index",
                "ui-integrations/ant-design/hooks/use-drawer-form/index",
                "ui-integrations/ant-design/hooks/use-modal-form/index",
                "ui-integrations/ant-design/hooks/use-steps-form/index",
                "ui-integrations/ant-design/hooks/use-select/index/index",
                "ui-integrations/ant-design/hooks/use-checkbox-group/index",
                "ui-integrations/ant-design/hooks/use-radio-group/index",
                "ui-integrations/ant-design/hooks/use-import/index",
                "ui-integrations/ant-design/hooks/use-modal/index",
            ],
        },
        "ui-integrations/ant-design/theming/index",
        "ui-integrations/ant-design/migration-guide/index",
    ],
};

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarItem} */
const MaterialUI = {
    type: "category",
    label: "Material UI",
    collapsible: false,
    // className: "category-as-header",
    items: [
        {
            type: "category",
            label: "Components",
            items: [
                "ui-integrations/material-ui/components/themed-layout/index",
                "ui-integrations/material-ui/components/auth-page/index",
                "ui-integrations/material-ui/components/breadcrumb/index",
                "ui-integrations/material-ui/components/auto-save-indicator/index",
                "ui-integrations/material-ui/components/inferencer/index",
                {
                    type: "category",
                    label: "Basic Views",
                    items: [
                        "ui-integrations/material-ui/components/basic-views/create/index",
                        "ui-integrations/material-ui/components/basic-views/edit/index",
                        "ui-integrations/material-ui/components/basic-views/list/index",
                        "ui-integrations/material-ui/components/basic-views/show/index",
                    ],
                },
                {
                    type: "category",
                    label: "Buttons",
                    items: [
                        "ui-integrations/material-ui/components/buttons/clone-button/index",
                        "ui-integrations/material-ui/components/buttons/create-button/index",
                        "ui-integrations/material-ui/components/buttons/delete-button/index",
                        "ui-integrations/material-ui/components/buttons/edit-button/index",
                        "ui-integrations/material-ui/components/buttons/export-button/index",
                        "ui-integrations/material-ui/components/buttons/import-button/index",
                        "ui-integrations/material-ui/components/buttons/list-button/index",
                        "ui-integrations/material-ui/components/buttons/refresh-button/index",
                        "ui-integrations/material-ui/components/buttons/save-button/index",
                        "ui-integrations/material-ui/components/buttons/show-button/index",
                    ],
                },
                {
                    type: "category",
                    label: "Fields",
                    items: [
                        "ui-integrations/material-ui/components/fields/boolean-field/index",
                        "ui-integrations/material-ui/components/fields/date-field/index",
                        "ui-integrations/material-ui/components/fields/email-field/index",
                        "ui-integrations/material-ui/components/fields/file-field/index",
                        "ui-integrations/material-ui/components/fields/markdown-field/index",
                        "ui-integrations/material-ui/components/fields/number-field/index",
                        "ui-integrations/material-ui/components/fields/tag-field/index",
                        "ui-integrations/material-ui/components/fields/text-field/index",
                        "ui-integrations/material-ui/components/fields/url-field/index",
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Hooks",
            items: [
                "ui-integrations/material-ui/hooks/use-auto-complete/index",
                "ui-integrations/material-ui/hooks/use-data-grid/index",
            ],
        },
        "ui-integrations/material-ui/theming/index",
    ],
};

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarItem} */
const ChakraUI = {
    type: "category",
    label: "Chakra UI",
    collapsible: false,
    // className: "category-as-header",
    items: [
        {
            type: "category",
            label: "Components",
            items: [
                "ui-integrations/chakra-ui/components/themed-layout/index",
                "ui-integrations/chakra-ui/components/auth-page/index",
                "ui-integrations/chakra-ui/components/breadcrumb/index",
                "ui-integrations/chakra-ui/components/auto-save-indicator/index",
                "ui-integrations/chakra-ui/components/inferencer/index",
                {
                    type: "category",
                    label: "Basic Views",
                    items: [
                        "ui-integrations/chakra-ui/components/basic-views/create/index",
                        "ui-integrations/chakra-ui/components/basic-views/edit/index",
                        "ui-integrations/chakra-ui/components/basic-views/list/index",
                        "ui-integrations/chakra-ui/components/basic-views/show/index",
                    ],
                },
                {
                    type: "category",
                    label: "Buttons",
                    items: [
                        "ui-integrations/chakra-ui/components/buttons/clone-button/index",
                        "ui-integrations/chakra-ui/components/buttons/create-button/index",
                        "ui-integrations/chakra-ui/components/buttons/delete-button/index",
                        "ui-integrations/chakra-ui/components/buttons/edit-button/index",
                        "ui-integrations/chakra-ui/components/buttons/export-button/index",
                        "ui-integrations/chakra-ui/components/buttons/import-button/index",
                        "ui-integrations/chakra-ui/components/buttons/list-button/index",
                        "ui-integrations/chakra-ui/components/buttons/refresh-button/index",
                        "ui-integrations/chakra-ui/components/buttons/save-button/index",
                        "ui-integrations/chakra-ui/components/buttons/show-button/index",
                    ],
                },
                {
                    type: "category",
                    label: "Fields",
                    items: [
                        "ui-integrations/chakra-ui/components/fields/boolean-field/index",
                        "ui-integrations/chakra-ui/components/fields/date-field/index",
                        "ui-integrations/chakra-ui/components/fields/email-field/index",
                        "ui-integrations/chakra-ui/components/fields/file-field/index",
                        "ui-integrations/chakra-ui/components/fields/markdown-field/index",
                        "ui-integrations/chakra-ui/components/fields/number-field/index",
                        "ui-integrations/chakra-ui/components/fields/tag-field/index",
                        "ui-integrations/chakra-ui/components/fields/text-field/index",
                        "ui-integrations/chakra-ui/components/fields/url-field/index",
                    ],
                },
            ],
        },
        "ui-integrations/chakra-ui/theming/index",
    ],
};

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarItem} */
const MantineUI = {
    type: "category",
    label: "Mantine",
    collapsible: false,
    // className: "category-as-header",
    items: [
        {
            type: "category",
            label: "Components",
            items: [
                "ui-integrations/mantine/components/themed-layout/index",
                "ui-integrations/mantine/components/auth-page/index",
                "ui-integrations/mantine/components/breadcrumb/index",
                "ui-integrations/mantine/components/auto-save-indicator/index",
                "ui-integrations/mantine/components/inferencer/index",
                {
                    type: "category",
                    label: "Basic Views",
                    items: [
                        "ui-integrations/mantine/components/basic-views/create/index",
                        "ui-integrations/mantine/components/basic-views/edit/index",
                        "ui-integrations/mantine/components/basic-views/list/index",
                        "ui-integrations/mantine/components/basic-views/show/index",
                    ],
                },
                {
                    type: "category",
                    label: "Buttons",
                    items: [
                        "ui-integrations/mantine/components/buttons/clone-button/index",
                        "ui-integrations/mantine/components/buttons/create-button/index",
                        "ui-integrations/mantine/components/buttons/delete-button/index",
                        "ui-integrations/mantine/components/buttons/edit-button/index",
                        "ui-integrations/mantine/components/buttons/export-button/index",
                        "ui-integrations/mantine/components/buttons/import-button/index",
                        "ui-integrations/mantine/components/buttons/list-button/index",
                        "ui-integrations/mantine/components/buttons/refresh-button/index",
                        "ui-integrations/mantine/components/buttons/save-button/index",
                        "ui-integrations/mantine/components/buttons/show-button/index",
                    ],
                },
                {
                    type: "category",
                    label: "Fields",
                    items: [
                        "ui-integrations/mantine/components/fields/boolean-field/index",
                        "ui-integrations/mantine/components/fields/date-field/index",
                        "ui-integrations/mantine/components/fields/email-field/index",
                        "ui-integrations/mantine/components/fields/file-field/index",
                        "ui-integrations/mantine/components/fields/markdown-field/index",
                        "ui-integrations/mantine/components/fields/number-field/index",
                        "ui-integrations/mantine/components/fields/tag-field/index",
                        "ui-integrations/mantine/components/fields/text-field/index",
                        "ui-integrations/mantine/components/fields/url-field/index",
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Hooks",
            items: [
                "ui-integrations/mantine/hooks/use-form/index",
                "ui-integrations/mantine/hooks/use-drawer-form/index",
                "ui-integrations/mantine/hooks/use-modal-form/index",
                "ui-integrations/mantine/hooks/use-steps-form/index",
                "ui-integrations/mantine/hooks/use-select/index",
            ],
        },
        "ui-integrations/mantine/theming/index",
    ],
};

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarItem} */
const UIIntegrations = {
    type: "category",
    label: "UI Integrations",
    className: "category-as-header",
    items: [AntDesign, MaterialUI, ChakraUI, MantineUI],
};

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarItem} */
const RouterIntegrations = {
    type: "category",
    label: "Router Integrations",
    className: "category-as-header",
    items: [
        "router-integrations/react-router/index",
        "router-integrations/next-js/index",
        "router-integrations/remix/index",
    ],
};

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarItem} */
const ReactTable = {
    type: "category",
    label: "React Table 🚧",
    collapsible: false,
    link: {
        type: "doc",
        id: "packages/react-table/index",
    },
    items: ["packages/react-table/use-table/index"],
};

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarItem} */
const ReactHookForm = {
    type: "category",
    label: "React Hook Form 🚧",
    collapsible: false,
    link: {
        type: "doc",
        id: "packages/react-hook-form/index",
    },
    items: [
        "packages/react-hook-form/use-form/index",
        "packages/react-hook-form/use-modal-form/index",
        "packages/react-hook-form/use-steps-form/index",
    ],
};

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarItem} */
const DataProviders = {
    type: "category",
    label: "Data Providers 🚧",
    collapsible: false,
    link: {
        type: "doc",
        id: "packages/data-providers/index",
    },
    items: [
        "packages/data-providers/appwrite/index",
        "packages/data-providers/graphql/index",
        "packages/data-providers/simple-rest/index",
        "packages/data-providers/strapi-v4/index",
        "packages/data-providers/supabase/index",
        "packages/data-providers/nestjs-query/index",
        "packages/data-providers/nestjsx-crud/index",
        "packages/data-providers/airtable/index",
        "packages/data-providers/hasura/index",
        "packages/data-providers/multiple-data-providers/index",
        "packages/data-providers/community-data-providers/index",
        "packages/data-providers/custom-data-provider/index",
    ],
};

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarItem} */
const Packages = {
    type: "category",
    label: "Packages",
    className: "category-as-header",
    items: [
        "packages/list-of-packages/index",
        ReactTable,
        ReactHookForm,
        "packages/cli/index",
        "packages/devtools/index",
        "packages/inferencer/index",
        "packages/command-palette/index",
        DataProviders,
    ],
};

const FurtherReadings = {
    type: "category",
    label: "Further Readings",
    className: "category-as-header",
    items: [
        "further-readings/contributing/index",
        "further-readings/benchmarks/index",
        "further-readings/testing/index",
        {
            type: "doc",
            id: "further-readings/comparison/index",
            label: "Comparison",
        },
        "further-readings/telemetry/index",
        "further-readings/license/index",
    ],
};

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').Sidebars} */
module.exports = {
    sidebar: [
        GettingStarted,
        {
            type: "link",
            href: "https://s.refine.dev/devtools-beta",
            label: "refine Devtools",
            className: "sidebar-item-shiny mt-6 -ml-2",
        },
        GuidesConcepts,
        CoreAPI,
        UIIntegrations,
        RouterIntegrations,
        Packages,
        FurtherReadings,
    ],
};
