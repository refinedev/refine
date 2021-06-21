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
                        "guides-and-concepts/providers/i18n-provider",
                    ],
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
                        "hooks/data/useCreate",
                        "hooks/data/useCreateMany",
                        "hooks/data/useUpdate",
                        "hooks/data/useUpdateMany",
                        "hooks/data/useDelete",
                        "hooks/data/useDeleteMany",
                        "hooks/data/useList",
                        "hooks/data/useOne",
                        "hooks/data/useMany",
                        "hooks/data/useCustom",
                    ],
                },
                {
                    type: "category",
                    label: "Authorization",
                    items: [
                        "hooks/auth/useLogin",
                        "hooks/auth/useLogout",
                        "hooks/auth/useCheckError",
                        "hooks/auth/useAuthenticated",
                        "hooks/auth/useGetIdentity",
                        "hooks/auth/usePermissions",
                    ],
                },
                {
                    type: "category",
                    label: "Form",
                    items: [
                        "hooks/form/useForm",
                        "hooks/form/useModalForm",
                        "hooks/form/useDrawerForm",
                        "hooks/form/useStepsForm",
                    ],
                },
                {
                    type: "category",
                    label: "Table",
                    items: [
                        "hooks/table/useTable",
                        "hooks/table/useEditableTable",
                    ],
                },

                {
                    type: "category",
                    label: "Field",
                    items: [
                        "hooks/field/useCheckboxGroup",
                        "hooks/field/useSelect",
                        "hooks/field/useRadioGroup",
                    ],
                },
                {
                    type: "category",
                    label: "Refine",
                    items: ["hooks/refine/useTitle"],
                },
                {
                    type: "category",
                    label: "Translate",
                    items: [
                        "hooks/translate/useTranslate",
                        "hooks/translate/useSetLocale",
                        "hooks/translate/useGetLocale",
                    ],
                },
                {
                    type: "category",
                    label: "Resource",
                    items: [
                        "hooks/resource/useMenu",
                        "hooks/resource/useResource",
                    ],
                },
                {
                    type: "category",
                    label: "Navigation",
                    items: ["hooks/navigation/useNavigation"],
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
                        "components/basic-views/list",
                        "components/basic-views/create",
                        "components/basic-views/show",
                        "components/basic-views/edit",
                    ],
                },
                {
                    type: "category",
                    label: "Buttons",
                    items: [
                        "components/buttons/create-button",
                        "components/buttons/import-button",
                        "components/buttons/export-button",
                        "components/buttons/delete-button",
                        "components/buttons/refresh-button",
                        "components/buttons/save-button",
                        "components/buttons/list-button",
                        "components/buttons/show-button",
                        "components/buttons/edit-button",
                        "components/buttons/clone-button",
                    ],
                },
                {
                    type: "category",
                    label: "Inputs",
                    items: ["components/inputs/custom-inputs"],
                },
                {
                    type: "category",
                    label: "Fields",
                    items: [
                        "components/fields/boolean",
                        "components/fields/url",
                        "components/fields/image",
                        "components/fields/file",
                        "components/fields/date",
                        "components/fields/email",
                        "components/fields/markdown",
                        "components/fields/tag",
                        "components/fields/text",
                    ],
                },
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
