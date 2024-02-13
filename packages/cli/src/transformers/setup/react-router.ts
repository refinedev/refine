import { prettierFormat } from "../../utils/swizzle/prettierFormat";
import execa from "execa";
import {
    API,
    Collection,
    FileInfo,
    JSCodeshift,
    JSXElement,
    JSXIdentifier,
} from "jscodeshift";
import decamelize from "decamelize";

export const parser = "tsx";

// runs .bin/jscodeshift with the default export transformer on the current directory
export const setupReactRouter = async () => {
    const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");
    const { stderr, stdout } = execa.sync(jscodeshiftExecutable, [
        "./",
        "--extensions=ts,tsx,js,jsx",
        "--parser=tsx",
        `--transform=${__dirname}/../src/transformers/setup/react-router.ts`,
        `--ignore-pattern=**/.cache/**`,
        `--ignore-pattern=**/node_modules/**`,
        `--ignore-pattern=**/build/**`,
        `--ignore-pattern=**/.next/**`,
    ]);

    if (stdout) {
        console.log(stdout);
    }

    if (stderr) {
        console.log(stderr);
    }
};

export default async function transformer(file: FileInfo, api: API) {
    const j = api.jscodeshift;
    const source = j(file.source);

    const hasRefineElement =
        source.find(j.JSXElement, {
            openingElement: {
                name: {
                    name: "Refine",
                },
            },
        }).length !== 0;

    if (!hasRefineElement) {
        return;
    }

    const functionDeclaration = source.find(j.FunctionDeclaration, {
        id: {
            name: "App",
        },
    });

    addReactRouterImports(j, source);

    // Find the first jsx element in the function and wrap it with `BrowserRouter` component.

    functionDeclaration.forEach((funcDec) => {
        const openerElements = j(funcDec).find(j.JSXElement).at(0);

        openerElements.forEach((openerElement) => {
            const routerElement = j.jsxElement(
                j.jsxOpeningElement(j.jsxIdentifier("BrowserRouter"), []),
                j.jsxClosingElement(j.jsxIdentifier("BrowserRouter")),
                [openerElement.node],
            );

            j(openerElement).replaceWith(routerElement);
        });
    });

    const refineElements = source.find(j.JSXElement, {
        openingElement: {
            name: {
                name: "Refine",
            },
        },
    });

    refineElements.forEach((refineElement) => {
        const routesElement = j.jsxElement(
            j.jsxOpeningElement(j.jsxIdentifier("Routes"), []),
            j.jsxClosingElement(j.jsxIdentifier("Routes")),
            refineElement.node.children,
        );

        refineElement.replace(
            j.jsxElement(
                refineElement.node.openingElement,
                refineElement.node.closingElement,
                [routesElement],
            ),
        );
    });

    const routesElements = source.find(j.JSXElement, {
        openingElement: {
            name: {
                name: "Routes",
            },
        },
    });

    routesElements.forEach((routesElement) => {
        let elementCount = 0;

        const newRouteElements: JSXElement[] = [];
        routesElement.node?.children?.forEach((child) => {
            if (child.type === "JSXElement") {
                elementCount++;
                const firstAttribute =
                    elementCount === 1
                        ? j.jsxAttribute(j.jsxIdentifier("index"))
                        : j.jsxAttribute(
                              j.jsxIdentifier("path"),
                              j.stringLiteral(
                                  `/${decamelize(
                                      (
                                          child.openingElement
                                              .name as JSXIdentifier
                                      ).name,
                                      { separator: "-" },
                                  )}`,
                              ),
                          );

                const routeElement = j.jsxElement(
                    j.jsxOpeningElement(
                        j.jsxIdentifier("Route"),
                        [
                            firstAttribute,
                            j.jsxAttribute(
                                j.jsxIdentifier("element"),
                                j.jsxExpressionContainer(
                                    j.jsxElement(child.openingElement),
                                ),
                                // j.jsxElement((child as JSXElement).openingElement),
                            ),
                        ],
                        true,
                    ),
                );

                newRouteElements.push(routeElement);
            }
        });

        const errorRoute = j.jsxElement(
            j.jsxOpeningElement(
                j.jsxIdentifier("Route"),
                [
                    j.jsxAttribute(j.jsxIdentifier("path"), j.literal("*")),
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

        newRouteElements.push(errorRoute);

        routesElement.replace(
            j.jsxElement(
                routesElement.node.openingElement,
                routesElement.node.closingElement,
                newRouteElements,
            ),
        );
    });

    // addAntDesignImports(j, source);

    // addOutletImport(j, source);

    // refineElement.forEach((element) => {
    //     element.node.openingElement.attributes?.push(
    //         j.jsxAttribute(
    //             j.jsxIdentifier("notificationProvider"),
    //             j.jsxExpressionContainer(
    //                 j.identifier("useNotificationProvider"),
    //             ),
    //         ),
    //     );

    //     const antdApp = j.jsxElement(
    //         j.jsxOpeningElement(j.jsxIdentifier("AntdApp"), []),
    //         j.jsxClosingElement(j.jsxIdentifier("AntdApp")),
    //         [element.value],
    //     );

    //     const configProvider = j.jsxElement(
    //         j.jsxOpeningElement(j.jsxIdentifier("ConfigProvider"), [
    //             j.jsxAttribute(
    //                 j.jsxIdentifier("theme"),
    //                 j.jsxExpressionContainer(j.identifier("RefineThemes.Blue")),
    //             ),
    //         ]),
    //         j.jsxClosingElement(j.jsxIdentifier("ConfigProvider")),
    //         [antdApp],
    //     );

    //     j(element).replaceWith(configProvider);
    // });

    // const routesElement = source.find(j.JSXElement, {
    //     openingElement: {
    //         name: {
    //             name: "Routes",
    //         },
    //     },
    // });

    // routesElement.forEach((element) => {
    //     const antdLayout = j.jsxElement(
    //         j.jsxOpeningElement(j.jsxIdentifier("Route"), [
    //             j.jsxAttribute(
    //                 j.jsxIdentifier("element"),
    //                 j.jsxExpressionContainer(
    //                     j.jsxElement(
    //                         j.jsxOpeningElement(
    //                             j.jsxIdentifier("ThemedLayoutV2"),
    //                             [],
    //                         ),
    //                         j.jsxClosingElement(
    //                             j.jsxIdentifier("ThemedLayoutV2"),
    //                         ),
    //                         [
    //                             j.jsxElement(
    //                                 j.jsxOpeningElement(
    //                                     j.jsxIdentifier("Outlet"),
    //                                     [],
    //                                     true,
    //                                 ),
    //                             ),
    //                         ],
    //                     ),
    //                 ),
    //             ),
    //         ]),
    //         j.jsxClosingElement(j.jsxIdentifier("Route")),
    //         element.node.children,
    //     );

    //     element.replace(
    //         j.jsxElement(
    //             element.node.openingElement,
    //             element.node.closingElement,
    //             [antdLayout],
    //         ),
    //     );
    // });

    return await prettierFormat(source.toSource());
}

export const addReactRouterImports = (j: JSCodeshift, source: Collection) => {
    const reactRouterDomImports = j.importDeclaration(
        [
            j.importSpecifier(j.identifier("BrowserRouter")),
            j.importSpecifier(j.identifier("Routes")),
            j.importSpecifier(j.identifier("Route")),
        ],
        j.literal("react-router-dom"),
    );

    source.find(j.ImportDeclaration).at(0).insertAfter(reactRouterDomImports);

    // const refineReactRouterImports = j.importDeclaration(
    //     [
    //         j.importDeclaration(j.identifier(""))
    //         j.importSpecifier(j.identifier("ConfigProvider")),
    //         j.importSpecifier(j.identifier("App as AntdApp")),
    //     ],
    //     j.literal("antd"),
    // );

    // source.find(j.ImportDeclaration).at(-1).insertAfter(antdImports);

    // const resetImport = j.importDeclaration(
    //     [],
    //     j.literal("@refinedev/antd/dist/reset.css"),
    // );

    // source.find(j.ImportDeclaration).at(-1).insertAfter(resetImport);
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
