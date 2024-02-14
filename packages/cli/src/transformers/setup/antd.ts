import {
    addAttributeIfNotExist,
    addOrUpdateImports,
    addOrUpdateNamelessImport,
    removeImportIfExists,
    wrapElement,
} from "@utils/codeshift";
import { prettierFormat } from "../../utils/swizzle/prettierFormat";
import execa from "execa";
import { API, Collection, FileInfo, JSCodeshift } from "jscodeshift";

export const parser = "tsx";

// runs .bin/jscodeshift with the default export transformer on the current directory
export const setupAntD = async () => {
    const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");
    const { stderr } = execa.sync(jscodeshiftExecutable, [
        "./",
        "--extensions=ts,tsx,js,jsx",
        "--parser=tsx",
        `--transform=${__dirname}/../src/transformers/setup/antd.ts`,
        `--ignore-pattern=**/.cache/**`,
        `--ignore-pattern=**/node_modules/**`,
        `--ignore-pattern=**/build/**`,
        `--ignore-pattern=**/.next/**`,
    ]);

    if (stderr) {
        console.log(stderr);
    }
};

export default async function transformer(file: FileInfo, api: API) {
    const j = api.jscodeshift;
    const source = j(file.source);

    const refineElement = source.find(j.JSXElement, {
        openingElement: {
            name: {
                name: "Refine",
            },
        },
    });

    const hasRefineElement = refineElement.length !== 0;

    if (!hasRefineElement) {
        return;
    }

    addAntDesignImports(j, source);

    addOutletImport(j, source);

    refineElement.forEach((element) => {
        addAttributeIfNotExist(
            j,
            source,
            element,
            "notificationProvider",
            j.jsxExpressionContainer(j.identifier("useNotificationProvider")),
        );

        const antdApp = wrapElement(j, element, "AntdApp");

        wrapElement(j, antdApp, "ConfigProvider", [
            j.jsxAttribute(
                j.jsxIdentifier("theme"),
                j.jsxExpressionContainer(j.identifier("RefineThemes.Blue")),
            ),
        ]);
    });

    const routesElement = source.find(j.JSXElement, {
        openingElement: {
            name: {
                name: "Routes",
            },
        },
    });

    if (routesElement.length > 0) {
        addOrUpdateImports(j, source, "@refinedev/antd", [
            "ThemedLayoutV2",
            "ErrorComponent",
        ]);

        routesElement.forEach((element) => {
            removeImportIfExists(
                j,
                source,
                "@refinedev/core",
                "ErrorComponent",
            );

            const layoutChildren = [...(element.node.children ?? [])];

            const isErrorRouteExists = source.find(j.JSXElement, {
                openingElement: {
                    name: {
                        name: "ErrorComponent",
                    },
                },
            });

            if (!isErrorRouteExists) {
                const errorRoute = j.jsxElement(
                    j.jsxOpeningElement(
                        j.jsxIdentifier("Route"),
                        [
                            j.jsxAttribute(
                                j.jsxIdentifier("path"),
                                j.literal("*"),
                            ),
                            j.jsxAttribute(
                                j.jsxIdentifier("element"),
                                j.jsxExpressionContainer(
                                    j.jsxElement(
                                        j.jsxOpeningElement(
                                            j.jsxIdentifier("ErrorComponent"),
                                            [],
                                            true,
                                        ),
                                    ),
                                ),
                            ),
                        ],
                        true,
                    ),
                );
                layoutChildren.push(errorRoute);
            }

            const antdLayout = j.jsxElement(
                j.jsxOpeningElement(j.jsxIdentifier("Route"), [
                    j.jsxAttribute(
                        j.jsxIdentifier("element"),
                        j.jsxExpressionContainer(
                            j.jsxElement(
                                j.jsxOpeningElement(
                                    j.jsxIdentifier("ThemedLayoutV2"),
                                    [],
                                ),
                                j.jsxClosingElement(
                                    j.jsxIdentifier("ThemedLayoutV2"),
                                ),
                                [
                                    j.jsxElement(
                                        j.jsxOpeningElement(
                                            j.jsxIdentifier("Outlet"),
                                            [],
                                            true,
                                        ),
                                    ),
                                ],
                            ),
                        ),
                    ),
                ]),
                j.jsxClosingElement(j.jsxIdentifier("Route")),
                layoutChildren,
            );

            element.replace(
                j.jsxElement(
                    element.node.openingElement,
                    element.node.closingElement,
                    [antdLayout],
                ),
            );
        });
    }

    return await prettierFormat(source.toSource());
}

export const addAntDesignImports = (j: JSCodeshift, source: Collection) => {
    addOrUpdateImports(
        j,
        source,
        "@refinedev/antd",
        ["useNotificationProvider", "RefineThemes"],
        (sourceImports, targetImport) => {
            sourceImports.at(0).insertAfter(targetImport);
        },
    );
    addOrUpdateImports(
        j,
        source,
        "antd",
        ["ConfigProvider", "App as AntdApp"],
        (sourceImports, targetImport) => {
            sourceImports.at(-1).insertAfter(targetImport);
        },
    );
    addOrUpdateNamelessImport(
        j,
        source,
        "@refinedev/antd/dist/reset.css",
        (sourceImports, targetImport) => {
            sourceImports.at(-1).insertAfter(targetImport);
        },
    );
};

const addOutletImport = (j: JSCodeshift, source: Collection) => {
    addOrUpdateImports(j, source, "react-router-dom", ["Outlet"]);
};
