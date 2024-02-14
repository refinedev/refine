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
import { wrapElement } from "@utils/codeshift";

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
            wrapElement(j, openerElement, "BrowserRouter");
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
        refineElement.node.openingElement.attributes?.push(
            j.jsxAttribute(
                j.jsxIdentifier("routerProvider"),
                j.jsxExpressionContainer(j.identifier("routerProvider")),
            ),
        );

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

        const refineDevCoreImport = source
            .find(j.ImportDeclaration)
            .filter((path) => path.node.source.value === "@refinedev/core");

        const errorComponentImportSpecifier = j.importSpecifier(
            j.identifier("ErrorComponent"),
        );

        refineDevCoreImport.forEach((importDeclaration) => {
            importDeclaration.node.specifiers?.push(
                errorComponentImportSpecifier,
            );
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

    const routerProviderImport = j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier("routerProvider"))],
        j.literal("@refinedev/react-router-v6"),
    );

    source.find(j.ImportDeclaration).at(0).insertAfter(routerProviderImport);
};
