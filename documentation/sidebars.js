module.exports = {
    someSidebar: [
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
                            label: "Admin",
                            items: ["guides-and-concepts/hooks/admin/useTitle"],
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
                            ],
                        },
                        {
                            type: "category",
                            label: "Authorization",
                            items: ["guides-and-concepts/hooks/auth/useLogout"],
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
                                "guides-and-concepts/components/buttons/list-button",
                            ],
                        },
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
            type: "doc",
            id: "interfaceReferences",
        },
        {
            type: "doc",
            id: "theme",
        },
    ],
};
