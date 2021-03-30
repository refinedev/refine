const CracoAlias = require("craco-alias");

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                aliases: {
                    readmin: "../packages/core",
                    "readmin-json-server": "../packages/json-server",
                    react: "../node_modules/react",
                    "react-dom": "../node_modules/react-dom",
                },
            },
        },
    ],
};
