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
var _fsextra = require("fs-extra");
var _fsextra2 = _interopRequireDefault(_fsextra);
var _path = require("path");
var _path2 = _interopRequireDefault(_path);

const getDocContent = async (docPath) => {
    const accessPath = docPath.startsWith("@site/")
        ? docPath.replace("@site/", "./")
        : docPath;

    return new Promise((resolve) => {
        _fsextra2.default.readFile(
            _path2.default.resolve(accessPath),
            (err, data) => {
                if (err) {
                    resolve(undefined);
                }

                return resolve(data.toString());
            },
        );
    });
};

const getChecklistItems = (docContent) => {
    const regex = /<ChecklistItem[\s\n\r\t]+id="((?:\w|\d|-|_)+)"[\s\n\r\t]*>/g;

    const matches = docContent.matchAll(regex);

    const itemIds = Array.from(matches).map((match) => match[1]);

    return itemIds;
};

const getUnitById = (id) => {
    // tutorial/<unit-name>/<ui-scope(optional)>/<tutorial-slug>
    const unitId = id.split("/")[1];

    return unitId;
};

function plugin() {
    return {
        name: "docusaurus-plugin-refine-checklist",
        configureWebpack(config) {
            return {
                resolve: {
                    alias: {
                        "@checklists": _path2.default.join(
                            _optionalChain([
                                config,
                                "access",
                                (_) => _.resolve,
                                "optionalAccess",
                                (_2) => _2.alias,
                                "optionalAccess",
                                (_3) => _3["@generated"],
                            ]),
                            "docusaurus-plugin-refine-checklist",
                            "default",
                        ),
                    },
                },
            };
        },
        async contentLoaded({ allContent, actions }) {
            if (!process.env.DISABLE_CHECKLISTS) {
                console.log("Composing Refine tutorial checklists...");

                const { createData } = actions;

                const currentVersion =
                    allContent["docusaurus-plugin-content-docs"].default
                        .loadedVersions[0];

                const allDocs = currentVersion.docs;

                const allTutorials = allDocs.filter(
                    (doc) =>
                        doc.id.startsWith("tutorial/") &&
                        doc.id !== "tutorial/tutorial",
                );

                const tutorialsWithChecklist = await Promise.all(
                    allTutorials.map(async (tutorial) => {
                        const docContent = await getDocContent(tutorial.source);
                        const checklistItemIds = getChecklistItems(
                            _nullishCoalesce(docContent, () => ""),
                        );

                        return {
                            id: tutorial.id,
                            unit: getUnitById(tutorial.id),
                            title: tutorial.title,
                            checklist: checklistItemIds.map((id, index) => ({
                                id,
                                index,
                            })),
                        };
                    }),
                );

                const data = {
                    items: tutorialsWithChecklist,
                };

                await createData(
                    `tutorial-checklist-data.json`,
                    JSON.stringify(data),
                );
            } else {
                const { createData } = actions;
                await createData(
                    `tutorial-checklist-data.json`,
                    JSON.stringify({ items: [] }),
                );
            }
        },
    };
}
exports.default = plugin;
