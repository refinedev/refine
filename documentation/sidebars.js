module.exports = {
    someSidebar: [
        {
            type: "doc",
            id: "tutorial",
        },
        {
            type: "category",
            label: "Guides",
            items: ["multipartUpload", "base64upload", "auth0"],
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
                        "hooks/data/useCreateMany"
                    ]
                },
                "useModalForm",
                "useDrawerForm",
                "useStepsForm",
                "useTable",
                "useCheckboxGroup",
                "useSelect",
                "useEditableTable",
                "useRadioGroup",
                "useForm"
            ],
        }
    ],
};
