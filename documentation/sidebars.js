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
            id: "tutorial",
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
                            ],
                        },
                        {
                            type: "category",
                            label: "Data",
                            items: [
                                "core/hooks/data/useApiUrl",
                                "core/hooks/data/useCreate",
                                "core/hooks/data/useCreateMany",
                                "core/hooks/data/useCustom",
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
                            items: ["core/hooks/ui/useModal"],
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
                                    label: "Resource",
                                    items: [
                                        "ui-frameworks/antd/hooks/resource/useMenu",
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
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Packages",
            items: ["packages/react-table", "packages/react-hook-form"],
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
                    items: ["guides-and-concepts/forms/custom-form-validation"],
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

                "guides-and-concepts/ssr-nextjs",
                "guides-and-concepts/theme",
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
            ],
        },
        {
            type: "category",
            label: "Examples",
            items: [
                "examples/tutorial-example",
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
                        "examples/form/custom-form-validation",
                        "examples/form/useDrawerForm",
                        "examples/form/useForm",
                        "examples/form/useModalForm",
                        "examples/form/useStepsForm",
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
                    label: "Notification Provider",
                    items: ["examples/notification-provider/react-toastify"],
                },
                {
                    type: "category",
                    label: "React Hook Form",
                    items: ["examples/react-hook-form/react-hook-form"],
                },
                {
                    type: "category",
                    label: "React Table",
                    items: [
                        "examples/react-table/advanced-react-table",
                        "examples/react-table/react-table",
                    ],
                },
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
                        "examples/table/advancedTable",
                        "examples/table/tableFilter",
                        "examples/table/useDeleteMany",
                        "examples/table/useEditableTable",
                        "examples/table/useTable",
                        "examples/table/useUpdateMany",
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
                        "examples/upload/base64Upload",
                        "examples/upload/multipartUpload",
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
    ],
};
