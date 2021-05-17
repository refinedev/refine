module.exports = {
    someSidebar: [
        {
            type: "doc",
            id: "tutorial",
        },
        {
            type: "category",
            label: "Guides",
            items: ["multipartUpload"],
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
                "useSelect",
                "useEditableTable",
                "useForm"
            ],
        },
        {
            type: "category",
            label: "Guides",
            items: ["base64upload"],
        },
    ],
};
