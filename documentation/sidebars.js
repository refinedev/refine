module.exports = {
    someSidebar: [
        {
            type: "doc",
            id: "tutorial",
        },
        {
            type: "category",
            label: "Guides",
            items: ["multipartUpload", "base64upload", "auth0", "tableSearch", "customPages"],
        },
        {
            type: "category",
            label: "Providers",
            items: ["authProvider", "dataProvider"],
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
                "useModalForm",
                "useDrawerForm",
                "useStepsForm",
                "useTable",
                "useCheckboxGroup",
                "useSelect",
                "useEditableTable",
                "useRadioGroup",
                "useForm",
            ],
        },
    ],
};
