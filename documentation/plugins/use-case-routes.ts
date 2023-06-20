import USE_CASES from "../src/assets/use-cases";

module.exports = function () {
    return {
        name: "plugin-use-case-routes",

        async contentLoaded({ actions }) {
            const { addRoute, createData } = actions;

            await Promise.all(
                USE_CASES.map(async (useCase) => {
                    const dataJsonPath = await createData(
                        `use-cases/${useCase.route}.json`,
                        JSON.stringify(useCase, null, 2),
                    );

                    addRoute({
                        path: `/use-cases/${useCase.route}`,
                        component:
                            "@site/src/components/use-case/detail-page.js",
                        exact: true,
                        modules: {
                            data: dataJsonPath,
                        },
                    });
                }),
            );
        },
    };
};
