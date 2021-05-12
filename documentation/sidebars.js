module.exports = {
    someSidebar: [
        {
            type: "doc",
            id: "tutorial",
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
                        "hooks/data/useCreate"
                    ]
                },
                "useModalForm",
                "useDrawerForm",
                "useStepsForm",
                "useSelect",
                "useEditableTable",
            ],
        },
        {
            type: "category",
            label: "Guides",
            items: ["base64upload"],
        },
    ],
};
