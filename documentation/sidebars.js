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
            label: "Guides & Concepts",
            items: [
                {
                    type: "category",
                    label: "Providers",
                    items: [
                        "guides-and-concepts/providers/auth-provider",
                        "guides-and-concepts/providers/data-provider",
                    ],
                },
                "guides-and-concepts/i18n",
                {
                    type: "category",
                    label: "Basic Views",
                    items: [
                        "guides-and-concepts/basic-views/list",
                        "guides-and-concepts/basic-views/create",
                        "guides-and-concepts/basic-views/show",
                        "guides-and-concepts/basic-views/edit",
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
                                "guides-and-concepts/hooks/data/useCreate",
                                "guides-and-concepts/hooks/data/useCreateMany",
                                "guides-and-concepts/hooks/data/useUpdate",
                                "guides-and-concepts/hooks/data/useUpdateMany",
                                "guides-and-concepts/hooks/data/useDelete",
                                "guides-and-concepts/hooks/data/useDeleteMany",
                                "guides-and-concepts/hooks/data/useList",
                                "guides-and-concepts/hooks/data/useOne",
                                "guides-and-concepts/hooks/data/useMany",
                                "guides-and-concepts/hooks/data/useCustom",
                            ],
                        },
                        {
                            type: "category",
                            label: "Authorization",
                            items: [
                                "guides-and-concepts/hooks/auth/useLogin",
                                "guides-and-concepts/hooks/auth/useLogout",
                                "guides-and-concepts/hooks/auth/useCheckError",
                                "guides-and-concepts/hooks/auth/useAuthenticated",
                                "guides-and-concepts/hooks/auth/useGetIdentity",
                                "guides-and-concepts/hooks/auth/usePermissions",
                            ],
                        },
                        {
                            type: "category",
                            label: "Refine",
                            items: [
                                "guides-and-concepts/hooks/refine/useTitle",
                            ],
                        },
                        {
                            type: "category",
                            label: "Translate",
                            items: [
                                "guides-and-concepts/hooks/translate/useTranslate",
                                "guides-and-concepts/hooks/translate/useSetLocale",
                                "guides-and-concepts/hooks/translate/useGetLocale",
                            ],
                        },
                        {
                            type: "category",
                            label: "Resource",
                            items: [
                                "guides-and-concepts/hooks/resource/useMenu",
                                "guides-and-concepts/hooks/resource/useResource",
                            ],
                        },
                        {
                            type: "category",
                            label: "Authorization",
                            items: ["guides-and-concepts/hooks/auth/useLogout"],
                        },
                        {
                            type: "category",
                            label: "Navigation",
                            items: [
                                "guides-and-concepts/hooks/navigation/useNavigation",
                            ],
                        },
                        "guides-and-concepts/hooks/useModalForm",
                        "guides-and-concepts/hooks/useDrawerForm",
                        "guides-and-concepts/hooks/useStepsForm",
                        "guides-and-concepts/hooks/useTable",
                        "guides-and-concepts/hooks/useCheckboxGroup",
                        "guides-and-concepts/hooks/useSelect",
                        "guides-and-concepts/hooks/useEditableTable",
                        "guides-and-concepts/hooks/useRadioGroup",
                        "guides-and-concepts/hooks/useForm",
                    ],
                },
                {
                    type: "category",
                    label: "Components",
                    items: [
                        {
                            type: "category",
                            label: "Buttons",
                            items: [
                                "guides-and-concepts/components/buttons/create-button",
                                "guides-and-concepts/components/buttons/import-button",
                                "guides-and-concepts/components/buttons/export-button",
                                "guides-and-concepts/components/buttons/delete-button",
                                "guides-and-concepts/components/buttons/refresh-button",
                                "guides-and-concepts/components/buttons/save-button",
                                "guides-and-concepts/components/buttons/list-button",
                                "guides-and-concepts/components/buttons/show-button",
                                "guides-and-concepts/components/buttons/edit-button",
                                "guides-and-concepts/components/buttons/clone-button",
                            ],
                        },
                        {
                            type: "category",
                            label: "Inputs",
                            items: [
                                "guides-and-concepts/components/inputs/custom-inputs",
                            ],
                        },
                    ],
                },
                {
                    type: "category",
                    label: "Fields",
                    items: [
                        "guides-and-concepts/fields/boolean",
                        "guides-and-concepts/fields/url",
                        "guides-and-concepts/fields/image",
                        "guides-and-concepts/fields/file",
                        "guides-and-concepts/fields/date",
                        "guides-and-concepts/fields/email",
                        "guides-and-concepts/fields/markdown",
                        "guides-and-concepts/fields/tag",
                        "guides-and-concepts/fields/text",
                    ],
                },
                "guides-and-concepts/multipart-upload",
                "guides-and-concepts/uploading-base64",
                "guides-and-concepts/auth0",
                "guides-and-concepts/table-search",
                "guides-and-concepts/custom-pages",
                "guides-and-concepts/csv-import",
                "guides-and-concepts/csv-export",
            ],
        },
        {
            type: "category",
            label: "Examples",
            items: ["examples/useUpdateMany", "examples/useDeleteMany"],
        },
        {
            type: "doc",
            id: "interfaceReferences",
        },
        {
            type: "doc",
            id: "theme",
        },
    ],
};
