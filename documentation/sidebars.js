module.exports = {
    someSidebar: [
        {
            type: "category",
            label: "Getting Started",
            items: ["getting-started/overview", "getting-started/basics"],
            collapsed: false,
        },
        {
            type: "doc",
            id: "comparison",
            label: "Comparison",
        },
        {
            type: "doc",
            id: "tutorials",
        },
        {
            type: "category",
            label: "Core",
            items: [
                "core/tutorial",
                {
                    type: "category",
                    label: "Providers",
                    items: [
                        "core/providers/accessControl-provider",
                        "core/providers/auth-provider",
                        "core/providers/audit-log-provider",
                        "core/providers/data-provider",
                        "core/providers/i18n-provider",
                        "core/providers/live-provider",
                        "core/providers/notification-provider",
                        "core/providers/router-provider",
                    ],
                },
                {
                    type: "category",
                    label: "Hooks",
                    items: [
                        {
                            type: "category",
                            label: "Access Control",
                            items: ["core/hooks/accessControl/useCan"],
                        },
                        {
                            type: "category",
                            label: "Authorization",
                            items: [
                                "core/hooks/auth/useAuthenticated",
                                "core/hooks/auth/useCheckError",
                                "core/hooks/auth/useGetIdentity",
                                "core/hooks/auth/useLogin",
                                "core/hooks/auth/useLogout",
                                "core/hooks/auth/usePermissions",
                                "core/hooks/auth/useRegister",
                                "core/hooks/auth/useResetPassword",
                                "core/hooks/auth/useUpdatePassword",
                            ],
                        },
                        {
                            type: "category",
                            label: "Audit Log",
                            items: [
                                "core/hooks/audit-log/useLog",
                                "core/hooks/audit-log/useLogList",
                            ],
                        },
                        {
                            type: "category",
                            label: "Breadcrumb",
                            items: ["core/hooks/useBreadcrumb"],
                        },
                        {
                            type: "category",
                            label: "Data",
                            items: [
                                "core/hooks/data/useApiUrl",
                                "core/hooks/data/useCreate",
                                "core/hooks/data/useCreateMany",
                                "core/hooks/data/useCustom",
                                "core/hooks/data/useCustomMutation",
                                "core/hooks/data/useDataProvider",
                                "core/hooks/data/useDelete",
                                "core/hooks/data/useDeleteMany",
                                "core/hooks/data/useList",
                                "core/hooks/data/useMany",
                                "core/hooks/data/useOne",
                                "core/hooks/data/useUpdate",
                                "core/hooks/data/useUpdateMany",
                            ],
                        },
                        {
                            type: "category",
                            label: "Field",
                            items: ["core/hooks/useSelect"],
                        },
                        {
                            type: "category",
                            label: "Form",
                            items: ["core/hooks/useForm"],
                        },
                        {
                            type: "category",
                            label: "Import-Export",
                            items: [
                                "core/hooks/import-export/useExport",
                                "core/hooks/import-export/useImport",
                            ],
                        },
                        {
                            type: "category",
                            label: "Invalidate",
                            items: ["core/hooks/invalidate/useInvalidate"],
                        },
                        {
                            type: "category",
                            label: "Live",
                            items: [
                                "core/hooks/live/usePublish",
                                "core/hooks/live/useSubscription",
                            ],
                        },
                        {
                            type: "category",
                            label: "Navigation",
                            items: ["core/hooks/navigation/useNavigation"],
                        },
                        {
                            type: "category",
                            label: "Notification",
                            items: ["core/hooks/useNotification"],
                        },
                        {
                            type: "category",
                            label: "Refine",
                            items: ["core/hooks/refine/useTitle"],
                        },
                        {
                            type: "category",
                            label: "Resource",
                            items: [
                                "core/hooks/resource/useResource",
                                "core/hooks/resource/useResourceWithRoute",
                            ],
                        },
                        {
                            type: "category",
                            label: "Show",
                            items: ["core/hooks/show/useShow"],
                        },
                        {
                            type: "category",
                            label: "Table",
                            items: ["core/hooks/useTable"],
                        },
                        {
                            type: "category",
                            label: "Translate",
                            items: [
                                "core/hooks/translate/useGetLocale",
                                "core/hooks/translate/useSetLocale",
                                "core/hooks/translate/useTranslate",
                            ],
                        },
                        {
                            type: "category",
                            label: "UI",
                            items: [
                                "core/hooks/ui/useModal",
                                "core/hooks/ui/useMenu",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Components",
                    items: [
                        "core/components/refine-config",
                        "core/components/layout-wrapper",
                        {
                            type: "category",
                            label: "Authorization",
                            items: ["core/components/auth/authenticated"],
                        },
                        {
                            type: "category",
                            label: "Access Control",
                            items: ["core/components/accessControl/can-access"],
                        },
                    ],
                },
                "core/interfaceReferences",
            ],
        },
        {
            type: "category",
            label: "UI Frameworks",
            items: [
                {
                    type: "category",
                    label: "Ant Design",
                    collapsed: false,
                    items: [
                        "ui-frameworks/antd/tutorial",
                        {
                            type: "category",
                            label: "Hooks",
                            items: [
                                {
                                    type: "category",
                                    label: "Field",
                                    items: [
                                        "ui-frameworks/antd/hooks/field/useCheckboxGroup",
                                        "ui-frameworks/antd/hooks/field/useRadioGroup",
                                        "ui-frameworks/antd/hooks/field/useSelect",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Form",
                                    items: [
                                        "ui-frameworks/antd/hooks/form/useDrawerForm",
                                        "ui-frameworks/antd/hooks/form/useForm",
                                        "ui-frameworks/antd/hooks/form/useModalForm",
                                        "ui-frameworks/antd/hooks/form/useStepsForm",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Import",
                                    items: [
                                        "ui-frameworks/antd/hooks/import/useImport",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "List",
                                    items: [
                                        "ui-frameworks/antd/hooks/list/useSimpleList",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Table",
                                    items: [
                                        "ui-frameworks/antd/hooks/table/useEditableTable",
                                        "ui-frameworks/antd/hooks/table/useTable",
                                    ],
                                },
                            ],
                        },
                        {
                            type: "category",
                            label: "Components",
                            items: [
                                {
                                    type: "category",
                                    label: "Basic Views",
                                    items: [
                                        "ui-frameworks/antd/components/basic-views/create",
                                        "ui-frameworks/antd/components/basic-views/edit",
                                        "ui-frameworks/antd/components/basic-views/list",
                                        "ui-frameworks/antd/components/basic-views/show",
                                    ],
                                },
                                "ui-frameworks/antd/components/breadcrumb",
                                {
                                    type: "category",
                                    label: "Buttons",
                                    items: [
                                        "ui-frameworks/antd/components/buttons/clone-button",
                                        "ui-frameworks/antd/components/buttons/create-button",
                                        "ui-frameworks/antd/components/buttons/delete-button",
                                        "ui-frameworks/antd/components/buttons/edit-button",
                                        "ui-frameworks/antd/components/buttons/export-button",
                                        "ui-frameworks/antd/components/buttons/import-button",
                                        "ui-frameworks/antd/components/buttons/list-button",
                                        "ui-frameworks/antd/components/buttons/refresh-button",
                                        "ui-frameworks/antd/components/buttons/save-button",
                                        "ui-frameworks/antd/components/buttons/show-button",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Fields",
                                    items: [
                                        "ui-frameworks/antd/components/fields/boolean",
                                        "ui-frameworks/antd/components/fields/date",
                                        "ui-frameworks/antd/components/fields/email",
                                        "ui-frameworks/antd/components/fields/file",
                                        "ui-frameworks/antd/components/fields/image",
                                        "ui-frameworks/antd/components/fields/markdown",
                                        "ui-frameworks/antd/components/fields/number",
                                        "ui-frameworks/antd/components/fields/tag",
                                        "ui-frameworks/antd/components/fields/text",
                                        "ui-frameworks/antd/components/fields/url",
                                    ],
                                },
                                "ui-frameworks/antd/components/filter-dropdown",
                                {
                                    type: "category",
                                    label: "Inputs",
                                    items: [
                                        "ui-frameworks/antd/components/inputs/custom-inputs",
                                    ],
                                },
                            ],
                        },
                        {
                            type: "category",
                            label: "Customization",
                            items: [
                                "ui-frameworks/antd/customization/antd-custom-theme",
                                "ui-frameworks/antd/customization/antd-custom-layout",
                                "ui-frameworks/antd/customization/antd-custom-sider",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Material UI",
                    collapsed: false,
                    items: [
                        "ui-frameworks/mui/tutorial",
                        {
                            type: "category",
                            label: "Hooks",
                            items: [
                                "ui-frameworks/mui/hooks/useAutocomplete",
                                "ui-frameworks/mui/hooks/useDataGrid",
                            ],
                        },
                        {
                            type: "category",
                            label: "Components",
                            items: [
                                {
                                    type: "category",
                                    label: "Basic Views",
                                    items: [
                                        "ui-frameworks/mui/components/basic-views/create",
                                        "ui-frameworks/mui/components/basic-views/edit",
                                        "ui-frameworks/mui/components/basic-views/list",
                                        "ui-frameworks/mui/components/basic-views/show",
                                    ],
                                },
                                "ui-frameworks/mui/components/mui-breadcrumb",
                                {
                                    type: "category",
                                    label: "Buttons",
                                    items: [
                                        "ui-frameworks/mui/components/buttons/clone-button",
                                        "ui-frameworks/mui/components/buttons/create-button",
                                        "ui-frameworks/mui/components/buttons/delete-button",
                                        "ui-frameworks/mui/components/buttons/edit-button",
                                        "ui-frameworks/mui/components/buttons/export-button",
                                        "ui-frameworks/mui/components/buttons/import-button",
                                        "ui-frameworks/mui/components/buttons/list-button",
                                        "ui-frameworks/mui/components/buttons/refresh-button",
                                        "ui-frameworks/mui/components/buttons/save-button",
                                        "ui-frameworks/mui/components/buttons/show-button",
                                    ],
                                },
                                {
                                    type: "category",
                                    label: "Fields",
                                    items: [
                                        "ui-frameworks/mui/components/fields/boolean",
                                        "ui-frameworks/mui/components/fields/date",
                                        "ui-frameworks/mui/components/fields/email",
                                        "ui-frameworks/mui/components/fields/file",
                                        "ui-frameworks/mui/components/fields/markdown",
                                        "ui-frameworks/mui/components/fields/number",
                                        "ui-frameworks/mui/components/fields/tag",
                                        "ui-frameworks/mui/components/fields/text",
                                        "ui-frameworks/mui/components/fields/url",
                                    ],
                                },
                            ],
                        },
                        {
                            type: "category",
                            label: "Customization",
                            items: [
                                "ui-frameworks/mui/customization/mui-custom-theme",
                                "ui-frameworks/mui/customization/mui-custom-layout",
                                "ui-frameworks/mui/customization/mui-custom-sider",
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Packages",
            items: [
                "packages/command-palette",
                "packages/react-table",
                {
                    type: "category",
                    label: "React Hook Form",
                    items: [
                        "packages/react-hook-form/useForm",
                        "packages/react-hook-form/useModalForm",
                        "packages/react-hook-form/useStepsForm",
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Guides & Concepts",
            items: [
                "guides-and-concepts/access-control",
                {
                    type: "category",
                    label: "Auth",
                    items: ["guides-and-concepts/auth/auth0"],
                },
                "guides-and-concepts/custom-layout",
                "guides-and-concepts/custom-pages",
                {
                    type: "category",
                    label: "Data Provider",
                    items: [
                        "guides-and-concepts/data-provider/appwrite",
                        "guides-and-concepts/data-provider/graphql",
                        "guides-and-concepts/data-provider/handling-filters",
                        "guides-and-concepts/data-provider/strapi-v4",
                    ],
                },
                {
                    type: "category",
                    label: "Form",
                    items: [
                        "guides-and-concepts/forms/custom-form-validation",
                        "guides-and-concepts/forms/save-and-continue",
                    ],
                },
                {
                    type: "category",
                    label: "Import - Export",
                    items: [
                        "guides-and-concepts/import-export/csv-export",
                        "guides-and-concepts/import-export/csv-import",
                    ],
                },
                "guides-and-concepts/real-time",
                "guides-and-concepts/multi-level-menu/multi-level-menu",
                {
                    type: "category",
                    label: "Multitenancy",
                    items: [
                        "guides-and-concepts/multi-tenancy/appwrite",
                        "guides-and-concepts/multi-tenancy/strapi-v4",
                    ],
                },
                "guides-and-concepts/mutation-mode",
                {
                    type: "category",
                    label: "Search",
                    items: [
                        "guides-and-concepts/search/list-search",
                        "guides-and-concepts/search/search",
                        "guides-and-concepts/search/table-search",
                    ],
                },
                {
                    type: "category",
                    label: "SSR",
                    items: [
                        "guides-and-concepts/ssr/remix",
                        "guides-and-concepts/ssr/nextjs",
                    ],
                },
                {
                    type: "category",
                    label: "Upload",
                    items: [
                        "guides-and-concepts/upload/base64-upload",
                        "guides-and-concepts/upload/multipart-upload",
                    ],
                },
                {
                    type: "category",
                    label: "Web3",
                    items: ["guides-and-concepts/web3/ethereum-signin"],
                },
                "guides-and-concepts/telemetry/telemetry",
            ],
        },
        {
            type: "category",
            label: "Examples",
            items: [
                {
                    type: "category",
                    label: "Tutorial",
                    items: [
                        "examples/tutorial/antd-tutorial-example",
                        "examples/tutorial/mui-tutorial-example",
                        "examples/tutorial/headless-tutorial-example",
                    ],
                },
                "examples/real-world-example",
                {
                    type: "category",
                    label: "Access Control",
                    items: [
                        "examples/access-control/casbin",
                        "examples/access-control/cerbos",
                    ],
                },
                "examples/authorization",
                {
                    type: "category",
                    label: "Auth Provider",
                    items: [
                        "examples/auth-provider/auth0",
                        "examples/auth-provider/google-auth",
                        "examples/auth-provider/otpLogin",
                    ],
                },
                "examples/antd-calendar-example",
                "examples/command-palette",
                {
                    type: "category",
                    label: "Core",
                    items: [
                        "examples/core/useImport",
                        "examples/core/useModal",
                    ],
                },
                {
                    type: "category",
                    label: "Customization",
                    items: [
                        "examples/customization/customFooter",
                        "examples/customization/customLogin",
                        "examples/customization/customSider",
                        "examples/customization/offLayoutArea",
                        "examples/customization/rtl",
                        "examples/customization/topMenuLayout",
                    ],
                },
                "examples/customPages",
                {
                    type: "category",
                    label: "Data Provider",
                    items: [
                        "examples/data-provider/airtable",
                        "examples/data-provider/altogic",
                        "examples/data-provider/appwrite",
                        "examples/data-provider/directus",
                        "examples/data-provider/hasura",
                        "examples/data-provider/multiple",
                        "examples/data-provider/nestjsxCrud",
                        "examples/data-provider/nhost",
                        "examples/data-provider/strapi",
                        "examples/data-provider/strapi-graphql",
                        "examples/data-provider/strapi-v4",
                        "examples/data-provider/supabase",
                    ],
                },
                "examples/e2e-testing",
                {
                    type: "category",
                    label: "Field",
                    items: [
                        "examples/field/useCheckboxGroup",
                        "examples/field/useRadioGroup",
                        "examples/field/useSelect",
                    ],
                },
                {
                    type: "category",
                    label: "Form",
                    items: [
                        {
                            type: "category",
                            label: "Ant Design",
                            items: [
                                "examples/form/antd/custom-form-validation",
                                "examples/form/antd/useDrawerForm",
                                "examples/form/antd/useForm",
                                "examples/form/antd/useModalForm",
                                "examples/form/antd/useStepsForm",
                            ],
                        },
                        {
                            type: "category",
                            label: "Headless",
                            items: ["examples/form/headless/save-and-continue"],
                        },
                        {
                            type: "category",
                            label: "Material UI",
                            items: [
                                "examples/form/mui/drawerForm",
                                "examples/form/mui/useForm",
                                "examples/form/mui/useModalForm",
                                "examples/form/mui/useStepsForm",
                            ],
                        },
                        {
                            type: "category",
                            label: "React Hook Form",
                            items: [
                                "examples/form/react-hook-form/useForm",
                                "examples/form/react-hook-form/useModalForm",
                                "examples/form/react-hook-form/useStepsForm",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "i18n",
                    items: [
                        "examples/i18n/i18n-nextjs",
                        "examples/i18n/i18n-react",
                    ],
                },
                "examples/import-export",
                {
                    type: "category",
                    label: "Inputs",
                    items: [
                        "examples/inputs/customInput",
                        "examples/inputs/datePicker",
                    ],
                },
                "examples/javascript",
                {
                    type: "category",
                    label: "List",
                    items: ["examples/list/useSimpleList"],
                },
                {
                    type: "category",
                    label: "Live Provider",
                    items: ["examples/live-provider/ably"],
                },
                "examples/multi-level-menu/multi-level-menu",
                {
                    type: "category",
                    label: "Multitenancy",
                    items: [
                        "examples/multi-tenancy/appwrite",
                        "examples/multi-tenancy/strapi-v4",
                    ],
                },
                {
                    type: "category",
                    label: "Next.js",
                    items: [
                        "examples/next-js/nextjs",
                        "examples/next-js/i18n-nextjs",
                    ],
                },
                {
                    type: "category",
                    label: "Notification Provider",
                    items: ["examples/notification-provider/react-toastify"],
                },
                /*                 {
                    type: "category",
                    label: "Remix",
                    items: [
                        "examples/remix/remix-antd",
                        "examples/remix/remix-headless",
                    ],
                }, */
                {
                    type: "category",
                    label: "Router Provider",
                    items: ["examples/router-provider/react-location"],
                },
                {
                    type: "category",
                    label: "Search",
                    items: ["examples/search/search"],
                },
                {
                    type: "category",
                    label: "Table",
                    items: [
                        {
                            type: "category",
                            label: "Ant Design",
                            items: [
                                "examples/table/antd/advancedTable",
                                "examples/table/antd/tableFilter",
                                "examples/table/antd/useDeleteMany",
                                "examples/table/antd/useEditableTable",
                                "examples/table/antd/useTable",
                                "examples/table/antd/useUpdateMany",
                            ],
                        },
                        {
                            type: "category",
                            label: "Material UI",
                            items: [
                                "examples/table/mui/advanced",
                                "examples/table/mui/filter",
                                "examples/table/mui/useDataGrid",
                                "examples/table/mui/useDeleteMany",
                                "examples/table/mui/useUpdateMany",
                            ],
                        },
                        {
                            type: "category",
                            label: "React Table",
                            items: [
                                "examples/table/react-table/advanced-react-table",
                                "examples/table/react-table/react-table",
                            ],
                        },
                        {
                            type: "category",
                            label: "Handson Table",
                            items: ["examples/table/handsontable/handsontable"],
                        },
                    ],
                },
                "examples/customTheme",
                {
                    type: "category",
                    label: "UI",
                    items: ["examples/ui/useModal"],
                },
                {
                    type: "category",
                    label: "Upload",
                    items: [
                        {
                            type: "category",
                            label: "Ant Design",
                            items: [
                                "examples/upload/antd/base64",
                                "examples/upload/antd/multipart",
                            ],
                        },
                        {
                            type: "category",
                            label: "Material UI",
                            items: [
                                "examples/upload/mui/base64",
                                "examples/upload/mui/multipart",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Web3",
                    items: ["examples/web3/web3Login"],
                },
            ],
        },
        {
            type: "doc",
            id: "migration-guide",
        },
        {
            type: "doc",
            id: "testing",
        },
        {
            type: "doc",
            id: "contributing",
        },
        {
            type: "doc",
            id: "faq",
        },
    ],
};
