module.exports = function () {
    return {
        name: "plugin-use-case-routes",

        async contentLoaded({ actions }) {
            const { addRoute, createData } = actions;

            const dataJsonPath = await createData(
                "use-cases/detail-page-1.json",
                JSON.stringify({ title: "Salih" }, null, 2),
            );

            addRoute({
                path: "/use-cases/detail-page-1",
                component: "@site/src/components/use-case/detail-page.js",
                exact: true,
                modules: {
                    data: dataJsonPath,
                },
            });
        },
    };
};
