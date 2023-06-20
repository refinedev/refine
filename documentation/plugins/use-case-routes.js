"use strict";
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
var _usecases = require("../src/assets/use-cases");
var _usecases2 = _interopRequireDefault(_usecases);

module.exports = function () {
    return {
        name: "plugin-use-case-routes",

        async contentLoaded({ actions }) {
            const { addRoute, createData } = actions;

            await Promise.all(
                _usecases2.default.map(async (useCase) => {
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
