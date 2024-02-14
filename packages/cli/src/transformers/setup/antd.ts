import { wrapElement } from "@utils/codeshift";
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
        element.node.openingElement.attributes?.push(
            j.jsxAttribute(
                j.jsxIdentifier("notificationProvider"),
                j.jsxExpressionContainer(
                    j.identifier("useNotificationProvider"),
                ),
            ),
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
        updateImports(j, source, "@refinedev/antd", [
            "ThemedLayoutV2",
            "ErrorComponent",
        ]);

        routesElement.forEach((element) => {
            source
                .find(j.ImportDeclaration)
                .filter((path) => path.node.source.value === "@refinedev/core")
                .find(j.ImportSpecifier)
                .filter((path) => path.node.imported.name === "ErrorComponent")
                .remove();

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
    const refineDevAntdImports = j.importDeclaration(
        [
            j.importSpecifier(j.identifier("useNotificationProvider")),
            j.importSpecifier(j.identifier("RefineThemes")),
        ],
        j.literal("@refinedev/antd"),
    );

    source.find(j.ImportDeclaration).at(0).insertAfter(refineDevAntdImports);

    const antdImports = j.importDeclaration(
        [
            j.importSpecifier(j.identifier("ConfigProvider")),
            j.importSpecifier(j.identifier("App as AntdApp")),
        ],
        j.literal("antd"),
    );

    source.find(j.ImportDeclaration).at(-1).insertAfter(antdImports);

    const resetImport = j.importDeclaration(
        [],
        j.literal("@refinedev/antd/dist/reset.css"),
    );

    source.find(j.ImportDeclaration).at(-1).insertAfter(resetImport);
};

const addOutletImport = (j: JSCodeshift, source: Collection) => {
    const reactRouterDomImport = source.find(j.ImportDeclaration, {
        source: {
            value: "react-router-dom",
        },
    });

    reactRouterDomImport.forEach((path) => {
        path.node.specifiers?.push(
            j.importSpecifier(j.identifier("Outlet"), j.identifier("Outlet")),
        );
    });
};

const updateImports = (
    j: JSCodeshift,
    source: Collection,
    packageName: string,
    imports: string[],
) => {
    const packageImport = source
        .find(j.ImportDeclaration)
        .filter((path) => path.node.source.value === packageName);

    const importSpecifiers = imports.map((importName) => {
        return j.importSpecifier(j.identifier(importName));
    });

    packageImport.forEach((importDeclaration) => {
        importDeclaration.node.specifiers = [
            ...(importDeclaration.node.specifiers ?? []),
            ...importSpecifiers,
        ];
    });
};
