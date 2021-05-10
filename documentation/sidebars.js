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
                "useModalForm",
                "useDrawerForm",
                "useStepsForm",
                "useTable",
                "useEditableTable",
            ],
        },
    ],
};
