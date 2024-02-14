import { prettierFormat } from "../../utils/swizzle/prettierFormat";
import execa from "execa";
import {
    API,
    Collection,
    FileInfo,
    JSCodeshift,
    JSXIdentifier,
} from "jscodeshift";
import decamelize from "decamelize";
import {
    addAttributeIfNotExist,
    addOrUpdateImports,
    wrapChildren,
    wrapElement,
} from "@utils/codeshift";

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
            wrapElement(j, source, openerElement, "BrowserRouter");
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
        addAttributeIfNotExist(
            j,
            source,
            refineElement,
            "routerProvider",
            j.jsxExpressionContainer(j.identifier("routerProvider")),
        );

        wrapChildren(j, source, refineElement, "Routes");
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

        const newRouteElements = [];

        routesElement.node?.children
            ?.filter((value) => {
                return (
                    value.type === "JSXElement" &&
                    (value.openingElement.name as any)?.name !== "Route"
                );
            })
            ?.forEach((child) => {
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
                                ),
                            ],
                            true,
                        ),
                    );

                    newRouteElements.push(routeElement);
                }
            });

        addOrUpdateImports(j, source, "@refinedev/core", ["ErrorComponent"]);

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

        if (newRouteElements.length === 0) {
            newRouteElements.push(...(routesElement.node.children ?? []));
        } else {
            newRouteElements.push(errorRoute);
        }

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
    addOrUpdateImports(
        j,
        source,
        "react-router-dom",
        ["BrowserRouter", "Routes", "Route"],
        (sourceDeclarations, targetDeclaration) => {
            sourceDeclarations.at(0).insertAfter(targetDeclaration);
        },
    );

    addOrUpdateImports(
        j,
        source,
        "@refinedev/react-router-v6",
        ["routerProvider"],
        (sourceDeclarations, targetDeclaration) => {
            sourceDeclarations.at(0).insertAfter(targetDeclaration);
        },
        true,
    );
};
