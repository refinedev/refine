module.exports = {
    someSidebar: [
        {
            type: "category",
            label: "Getting Started",
            items: ["getting-started/overview"],
        },
        {
            type: "doc",
            id: "tutorial",
        },
        {
            type: "category",
            label: "API References",
            items: [
                {
                    type: "category",
                    label: "Providers",
                    items: [
                        "api-references/providers/auth-provider",
                        "api-references/providers/data-provider",
                        "api-references/providers/i18n-provider",
                    ],
                },
                {
                    type: "category",
                    label: "Hooks",
                    items: [
                        {
                            type: "category",
                            label: "Data",
                            items: [
                                "api-references/hooks/data/useCreate",
                                "api-references/hooks/data/useCreateMany",
                                "api-references/hooks/data/useUpdate",
                                "api-references/hooks/data/useUpdateMany",
                                "api-references/hooks/data/useDelete",
                                "api-references/hooks/data/useDeleteMany",
                                "api-references/hooks/data/useList",
                                "api-references/hooks/data/useOne",
                                "api-references/hooks/data/useMany",
                                "api-references/hooks/data/useCustom",
                                "api-references/hooks/data/useApiUrl",
                            ],
                        },
                        {
                            type: "category",
                            label: "Authorization",
                            items: [
                                "api-references/hooks/auth/useLogin",
                                "api-references/hooks/auth/useLogout",
                                "api-references/hooks/auth/useCheckError",
                                "api-references/hooks/auth/useAuthenticated",
                                "api-references/hooks/auth/useGetIdentity",
                                "api-references/hooks/auth/usePermissions",
                            ],
                        },
                        {
                            type: "category",
                            label: "Form",
                            items: [
                                "api-references/hooks/form/useForm",
                                "api-references/hooks/form/useModalForm",
                                "api-references/hooks/form/useDrawerForm",
                                "api-references/hooks/form/useStepsForm",
                            ],
                        },
                        {
                            type: "category",
                            label: "Table",
                            items: [
                                "api-references/hooks/table/useTable",
                                "api-references/hooks/table/useEditableTable",
                            ],
                        },

                        {
                            type: "category",
                            label: "Field",
                            items: [
                                "api-references/hooks/field/useCheckboxGroup",
                                "api-references/hooks/field/useSelect",
                                "api-references/hooks/field/useRadioGroup",
                            ],
                        },
                        {
                            type: "category",
                            label: "Refine",
                            items: ["api-references/hooks/refine/useTitle"],
                        },
                        {
                            type: "category",
                            label: "Translate",
                            items: [
                                "api-references/hooks/translate/useTranslate",
                                "api-references/hooks/translate/useSetLocale",
                                "api-references/hooks/translate/useGetLocale",
                            ],
                        },
                        {
                            type: "category",
                            label: "Show",
                            items: ["api-references/hooks/show/useShow"],
                        },
                        {
                            type: "category",
                            label: "List",
                            items: ["api-references/hooks/show/useSimpleList"],
                        },
                        {
                            type: "category",
                            label: "Resource",
                            items: [
                                "api-references/hooks/resource/useMenu",
                                "api-references/hooks/resource/useResource",
                                "api-references/hooks/resource/useResourceWithRoute",
                            ],
                        },
                        {
                            type: "category",
                            label: "Navigation",
                            items: [
                                "api-references/hooks/navigation/useNavigation",
                            ],
                        },
                        {
                            type: "category",
                            label: "Import - Export",
                            items: [
                                "api-references/hooks/import-export/useImport",
                                "api-references/hooks/import-export/useExport",
                            ],
                        },
                        {
                            type: "category",
                            label: "UI",
                            items: ["api-references/hooks/ui/useModal"],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Components",
                    items: [
                        "api-references/components/refine-config",
                        "api-references/components/layout-wrapper",
                        "api-references/components/resource",
                        "api-references/components/filter-dropdown",
                        {
                            type: "category",
                            label: "Basic Views",
                            items: [
                                "api-references/components/basic-views/list",
                                "api-references/components/basic-views/create",
                                "api-references/components/basic-views/show",
                                "api-references/components/basic-views/edit",
                            ],
                        },
                        {
                            type: "category",
                            label: "Authorization",
                            items: [
                                "api-references/components/auth/authenticated",
                            ],
                        },
                        {
                            type: "category",
                            label: "Buttons",
                            items: [
                                "api-references/components/buttons/list-button",
                                "api-references/components/buttons/create-button",
                                "api-references/components/buttons/edit-button",
                                "api-references/components/buttons/show-button",
                                "api-references/components/buttons/delete-button",
                                "api-references/components/buttons/clone-button",
                                "api-references/components/buttons/refresh-button",
                                "api-references/components/buttons/save-button",
                                "api-references/components/buttons/import-button",
                                "api-references/components/buttons/export-button",
                            ],
                        },
                        {
                            type: "category",
                            label: "Inputs",
                            items: [
                                "api-references/components/inputs/custom-inputs",
                            ],
                        },
                        {
                            type: "category",
                            label: "Fields",
                            items: [
                                "api-references/components/fields/boolean",
                                "api-references/components/fields/url",
                                "api-references/components/fields/image",
                                "api-references/components/fields/file",
                                "api-references/components/fields/date",
                                "api-references/components/fields/email",
                                "api-references/components/fields/markdown",
                                "api-references/components/fields/tag",
                                "api-references/components/fields/text",
                                "api-references/components/fields/number",
                            ],
                        },
                    ],
                },
                "api-references/interfaceReferences",
            ],
        },
        {
            type: "category",
            label: "Guides & Concepts",
            items: [
                {
                    type: "category",
                    label: "Data Provider",
                    items: ["guides-and-concepts/data-provider/graphql"],
                },
                {
                    type: "category",
                    label: "Upload",
                    items: [
                        "guides-and-concepts/upload/multipart-upload",
                        "guides-and-concepts/upload/base64-upload",
                    ],
                },
                {
                    type: "category",
                    label: "Auth",
                    items: ["guides-and-concepts/auth/auth0"],
                },
                {
                    type: "category",
                    label: "Search",
                    items: [
                        "guides-and-concepts/search/search",
                        "guides-and-concepts/search/table-search",
                        "guides-and-concepts/search/list-search",
                    ],
                },
                {
                    type: "category",
                    label: "Import - Export",
                    items: [
                        "guides-and-concepts/import-export/csv-import",
                        "guides-and-concepts/import-export/csv-export",
                    ],
                },
                {
                    type: "category",
                    label: "Form",
                    items: ["guides-and-concepts/forms/custom-form-validation"],
                },
                "guides-and-concepts/mutation-mode",
                "guides-and-concepts/custom-layout",
                "guides-and-concepts/custom-pages",
                "guides-and-concepts/theme",
            ],
        },
        {
            type: "category",
            label: "Examples",
            items: [
                "examples/tutorial-example",
                "examples/authorization",
                "examples/i18n",
                {
                    type: "category",
                    label: "Data Provider",
                    items: [
                        "examples/data-provider/strapi",
                        "examples/data-provider/strapi-graphql",
                        "examples/data-provider/nestjsxCrud",
                        "examples/data-provider/airtable",
                        "examples/data-provider/supabase",
                        "examples/data-provider/altogic",
                    ],
                },
                {
                    type: "category",
                    label: "Auth Provider",
                    items: [
                        "examples/auth-provider/auth0",
                        "examples/auth-provider/otpLogin",
                        "examples/auth-provider/google-auth",
                    ],
                },
                {
                    type: "category",
                    label: "Form",
                    items: [
                        "examples/form/useForm",
                        "examples/form/useModalForm",
                        "examples/form/useDrawerForm",
                        "examples/form/useStepsForm",
                        "examples/form/custom-form-validation",
                    ],
                },
                {
                    type: "category",
                    label: "Table",
                    items: [
                        "examples/table/useTable",
                        "examples/table/useEditableTable",
                        "examples/table/useUpdateMany",
                        "examples/table/useDeleteMany",
                        "examples/table/advancedTable",
                        "examples/table/tableFilter",
                    ],
                },
                {
                    type: "category",
                    label: "List",
                    items: ["examples/list/useSimpleList"],
                },
                {
                    type: "category",
                    label: "Search",
                    items: ["examples/search/search"],
                },
                {
                    type: "category",
                    label: "Field",
                    items: [
                        "examples/field/useCheckboxGroup",
                        "examples/field/useSelect",
                        "examples/field/useRadioGroup",
                    ],
                },
                {
                    type: "category",
                    label: "Customization",
                    items: [
                        "examples/customization/topMenuLayout",
                        "examples/customization/customLogin",
                        "examples/customization/customFooter",
                        "examples/customization/customSider",
                        "examples/customization/offLayoutArea",
                        "examples/customization/rtl",
                    ],
                },
                {
                    type: "category",
                    label: "Inputs",
                    items: ["examples/inputs/customInput"],
                },
                {
                    type: "category",
                    label: "Upload",
                    items: [
                        "examples/upload/multipartUpload",
                        "examples/upload/base64Upload",
                    ],
                },
                {
                    type: "category",
                    label: "UI",
                    items: ["examples/ui/useModal"],
                },
                "examples/import-export",
                "examples/e2e-testing",
                "examples/customPages",
                "examples/customTheme",
                "examples/javascript",
            ],
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
