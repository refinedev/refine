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
                            label: "Resource",
                            items: [
                                "api-references/hooks/resource/useMenu",
                                "api-references/hooks/resource/useResource",
                            ],
                        },
                        {
                            type: "category",
                            label: "Navigation",
                            items: [
                                "api-references/hooks/navigation/useNavigation",
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
                                "api-references/components/basic-views/list",
                                "api-references/components/basic-views/create",
                                "api-references/components/basic-views/show",
                                "api-references/components/basic-views/edit",
                            ],
                        },
                        {
                            type: "category",
                            label: "Buttons",
                            items: [
                                "api-references/components/buttons/create-button",
                                "api-references/components/buttons/export-button",
                                "api-references/components/buttons/delete-button",
                                "api-references/components/buttons/refresh-button",
                                "api-references/components/buttons/save-button",
                                "api-references/components/buttons/list-button",
                                "api-references/components/buttons/show-button",
                                "api-references/components/buttons/edit-button",
                                "api-references/components/buttons/clone-button",
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
                            ],
                        },
                        "api-references/interfaceReferences",
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Guides & Concepts",
            items: [
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
                    label: "Table",
                    items: ["guides-and-concepts/table/table-search"],
                },
                {
                    type: "category",
                    label: "Import - Export",
                    items: [
                        "guides-and-concepts/import-export/csv-import",
                        "guides-and-concepts/import-export/csv-export",
                    ],
                },
                "guides-and-concepts/custom-pages",
                "guides-and-concepts/theme",
            ],
        },
        {
            type: "category",
            label: "Examples",
            items: [
                "examples/topMenuLayout",
                "examples/useUpdateMany",
                "examples/useDeleteMany",
                "examples/customLogin",
                "examples/customFooter",
                "examples/customSider",
                "examples/customInput",
                "examples/strapi",
            ],
        },
    ],
};
