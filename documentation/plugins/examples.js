"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
function _nullishCoalesce(lhs, rhsFn) {
    if (lhs != null) {
        return lhs;
    } else {
        return rhsFn();
    }
}
function _optionalChain(ops) {
    let lastAccessLHS = undefined;
    let value = ops[0];
    let i = 1;
    while (i < ops.length) {
        const op = ops[i];
        const fn = ops[i + 1];
        i += 2;
        if (
            (op === "optionalAccess" || op === "optionalCall") &&
            value == null
        ) {
            return undefined;
        }
        if (op === "access" || op === "optionalAccess") {
            lastAccessLHS = value;
            value = fn(value);
        } else if (op === "call" || op === "optionalCall") {
            value = fn((...args) => value.call(lastAccessLHS, ...args));
            lastAccessLHS = undefined;
        }
    }
    return value;
}
var _path = require("path");
var _path2 = _interopRequireDefault(_path);

const colorByHash = (input) => {
    let hash = 0;
    let color = "#";

    input.split("").forEach((char) => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });

    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ("00" + value.toString(16)).slice(-2);
    }

    return color;
};

function plugin() {
    return {
        name: "docusaurus-plugin-refine-examples",
        configureWebpack(config) {
            return {
                resolve: {
                    alias: {
                        "@examples": _path2.default.join(
                            _optionalChain([
                                config,
                                "access",
                                (_) => _.resolve,
                                "optionalAccess",
                                (_2) => _2.alias,
                                "optionalAccess",
                                (_3) => _3["@generated"],
                            ]),
                            "docusaurus-plugin-refine-examples",
                            "default",
                        ),
                    },
                },
            };
        },
        async contentLoaded({ allContent, actions }) {
            if (!process.env.DISABLE_EXAMPLES) {
                console.log("Composing refine examples...");

                const { createData } = actions;

                const currentVersion =
                    allContent["docusaurus-plugin-content-docs"].default
                        .loadedVersions[0];

                const allDocs = currentVersion.docs;

                const allExamples = allDocs
                    .filter(
                        (doc) =>
                            doc.id.startsWith("examples/") &&
                            doc.id !== "examples/examples",
                    )
                    .map((doc) => {
                        const titleFromId =
                            doc.id
                                .replace("examples/", "")
                                .split("/")
                                .slice(0, -1)
                                .join("-") +
                            " " +
                            doc.title
                                .replace("antd", "Ant Design")
                                .replace("mui", "Material UI")
                                .replace("chakra-ui", "Chakra UI");

                        return {
                            // ...doc,
                            id: doc.id,
                            baseTitle: doc.title,
                            title: doc.title
                                .replace("antd", "Ant Design")
                                .replace("mui", "Material UI")
                                .replace("chakra-ui", "Chakra UI"),
                            displayTitle: _nullishCoalesce(
                                _nullishCoalesce(
                                    doc.frontMatter["example-title"],
                                    () => titleFromId,
                                ),
                                () =>
                                    doc.title
                                        .replace("antd", "Ant Design")
                                        .replace("mui", "Material UI")
                                        .replace("chakra-ui", "Chakra UI"),
                            ),
                            description: doc.description,
                            permalink: doc.permalink,
                            tags: doc.frontMatter["example-tags"] || [],
                        };
                    });

                const allTags = allExamples
                    .reduce((acc, example) => [...acc, ...example.tags], [])
                    .filter((tag, index, self) => self.indexOf(tag) === index);

                const data = {
                    examples: allExamples,
                    tags: allTags.map((tag) => ({
                        name: tag,
                        color: colorByHash(tag),
                    })),
                };

                await createData(`examples-data.json`, JSON.stringify(data));
            } else {
                const { createData } = actions;

                await createData(
                    `examples-data.json`,
                    JSON.stringify({ examples: [], tags: [] }),
                );
            }
        },
    };
}
exports.default = plugin;
