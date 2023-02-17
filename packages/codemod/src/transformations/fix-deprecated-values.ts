import {
    API,
    JSCodeshift,
    Collection,
    FileInfo,
    ObjectExpression,
    Property,
    Identifier,
    ObjectProperty,
    BooleanLiteral,
} from "jscodeshift";

export const parser = "tsx";

const configToSpreadConfig = (j: JSCodeshift, source: Collection) => {
    const useListHooks = source.find(j.CallExpression, {
        callee: {
            name: "useList",
        },
    });

    useListHooks.replaceWith((p) => {
        const configProperty = (
            p.node.arguments[0] as unknown as ObjectExpression
        ).properties.find(
            (p: Property) => (p.key as Identifier).name === "config",
        );

        if (!configProperty) {
            return p.node;
        }

        const propertiesWithoutConfig = (
            p.node.arguments[0] as unknown as ObjectExpression
        ).properties.filter(
            (p: Property) => (p.key as Identifier).name !== "config",
        );

        const configProperties = (
            (configProperty as ObjectProperty).value as ObjectExpression
        ).properties;

        p.node.arguments = [
            j.objectExpression([
                ...propertiesWithoutConfig,
                ...configProperties,
            ]),
        ];

        return p.node;
    });
};

const sortToSorters = (j: JSCodeshift, source: Collection) => {
    const willCheckHooks = [
        "useCheckboxGroup",
        "useRadioGroup",
        "useSelect",
        "useAutocomplete",
        "useList",
    ];

    willCheckHooks.forEach((hookName) => {
        const useListHooks = source.find(j.CallExpression, {
            callee: {
                name: hookName,
            },
        });

        useListHooks.replaceWith((p) => {
            if (p.node.arguments.length === 0) {
                return p.node;
            }

            const sortProperty = (
                p.node.arguments[0] as unknown as ObjectExpression
            ).properties.find(
                (p: Property) => (p.key as Identifier).name === "sort",
            );

            if (!sortProperty) {
                return p.node;
            }

            const propertiesWithoutSort = (
                p.node.arguments[0] as unknown as ObjectExpression
            ).properties.filter(
                (p: Property) => (p.key as Identifier).name !== "sort",
            );

            p.node.arguments = [
                j.objectExpression([
                    ...propertiesWithoutSort,
                    j.objectProperty(
                        j.identifier("sorters"),
                        (sortProperty as any).value,
                    ),
                ]),
            ];

            return p.node;
        });
    });
};

const sorterToSorters = (j: JSCodeshift, source: Collection) => {
    const willCheckHooks = ["useExport"];

    willCheckHooks.forEach((hookName) => {
        const useListHooks = source.find(j.CallExpression, {
            callee: {
                name: hookName,
            },
        });

        useListHooks.replaceWith((p) => {
            if (p.node.arguments.length === 0) {
                return p.node;
            }

            const sortProperty = (
                p.node.arguments[0] as unknown as ObjectExpression
            ).properties.find(
                (p: Property) => (p.key as Identifier).name === "sorter",
            );

            if (!sortProperty) {
                return p.node;
            }

            const propertiesWithoutSort = (
                p.node.arguments[0] as unknown as ObjectExpression
            ).properties.filter(
                (p: Property) => (p.key as Identifier).name !== "sorter",
            );

            p.node.arguments = [
                j.objectExpression([
                    ...propertiesWithoutSort,
                    j.objectProperty(
                        j.identifier("sorters"),
                        (sortProperty as any).value,
                    ),
                ]),
            ];

            return p.node;
        });
    });
};

const resourceNametoResource = (j: JSCodeshift, source: Collection) => {
    const willCheckHooks = ["useExport", "useImport"];

    willCheckHooks.forEach((hookName) => {
        const useListHooks = source.find(j.CallExpression, {
            callee: {
                name: hookName,
            },
        });

        useListHooks.replaceWith((p) => {
            if (p.node.arguments.length === 0) {
                return p.node;
            }

            const resourceNameProperty = (
                p.node.arguments[0] as unknown as ObjectExpression
            ).properties.find(
                (p: Property) => (p.key as Identifier).name === "resourceName",
            );

            if (!resourceNameProperty) {
                return p.node;
            }

            const propertiesWithoutResourceName = (
                p.node.arguments[0] as unknown as ObjectExpression
            ).properties.filter(
                (p: Property) => (p.key as Identifier).name !== "resourceName",
            );

            p.node.arguments = [
                j.objectExpression([
                    ...propertiesWithoutResourceName,
                    j.objectProperty(
                        j.identifier("resource"),
                        (resourceNameProperty as any).value,
                    ),
                ]),
            ];

            return p.node;
        });
    });
};

const deprecatedUseTableProps = [
    "initialCurrent",
    "initialPageSize",
    "hasPagination",
];

const fixDeprecatedReactTableProps = (j: JSCodeshift, source: Collection) => {
    const refineReactTableImports = source.find(j.ImportDeclaration, {
        source: {
            value: "@pankod/refine-react-table",
        },
        specifiers: [
            {
                imported: {
                    name: "useTable",
                },
            },
        ],
    });

    if (refineReactTableImports.length === 0) {
        return;
    }

    const useTableHooks = source.find(j.CallExpression, {
        callee: {
            name: "useTable",
        },
    });

    useTableHooks.replaceWith((p) => {
        const hasRefineCoreProps = (
            p.node.arguments[0] as ObjectExpression
        ).properties.find(
            (p: Property) => (p.key as Identifier).name === "refineCoreProps",
        );

        if (!hasRefineCoreProps) {
            return p.node;
        }

        const otherProperties = (
            p.node.arguments[0] as ObjectExpression
        ).properties.filter(
            (p: Property) => (p.key as Identifier).name !== "refineCoreProps",
        );

        const paginationProperties = deprecatedUseTableProps.map((prop) => {
            const property = (
                (hasRefineCoreProps as ObjectProperty).value as ObjectExpression
            ).properties.find(
                (p: Property) => (p.key as Identifier).name === prop,
            );

            if (!property) {
                return null;
            }

            if (prop === "hasPagination") {
                return j.property(
                    "init",
                    j.identifier("mode"),
                    j.literal(
                        ((property as ObjectProperty).value as BooleanLiteral)
                            .value
                            ? "server"
                            : "off",
                    ),
                );
            }

            if (prop === "initialCurrent") {
                return j.property(
                    "init",
                    j.identifier("current"),
                    (property as ObjectProperty).value,
                );
            }

            if (prop === "initialPageSize") {
                return j.property(
                    "init",
                    j.identifier("pageSize"),
                    (property as ObjectProperty).value,
                );
            }

            return null;
        });

        if (paginationProperties.filter(Boolean).length === 0) {
            return p.node;
        }

        const paginationProperty = j.property(
            "init",
            j.identifier("pagination"),
            j.objectExpression(paginationProperties.filter(Boolean)),
        );

        const refineCorePropsProperty = j.property(
            "init",
            j.identifier("refineCoreProps"),
            j.objectExpression([paginationProperty]),
        );

        p.node.arguments = [
            j.objectExpression([...otherProperties, refineCorePropsProperty]),
        ];

        return p.node;
    });
};

const fixDeprecatedUseTableProps = (j: JSCodeshift, source: Collection) => {
    const willCheckImports = ["useTable", "useDataGrid"];

    willCheckImports.forEach((hook) => {
        const useTableHooks = source.find(j.CallExpression, {
            callee: {
                name: hook,
            },
        });

        useTableHooks.replaceWith((p) => {
            const otherProperties = (
                p.node.arguments[0] as ObjectExpression
            ).properties.filter(
                (p: Property) =>
                    !deprecatedUseTableProps.includes(
                        (p.key as Identifier).name,
                    ),
            );

            const paginationProperties = deprecatedUseTableProps.map((prop) => {
                const property = (
                    p.node.arguments[0] as ObjectExpression
                ).properties.find(
                    (p: Property) => (p.key as Identifier).name === prop,
                );

                if (!property) {
                    return null;
                }

                if (prop === "hasPagination") {
                    return j.property(
                        "init",
                        j.identifier("mode"),
                        j.literal(
                            (
                                (property as ObjectProperty)
                                    .value as BooleanLiteral
                            ).value
                                ? "server"
                                : "off",
                        ),
                    );
                }

                if (prop === "initialCurrent") {
                    return j.property(
                        "init",
                        j.identifier("current"),
                        (property as ObjectProperty).value,
                    );
                }

                if (prop === "initialPageSize") {
                    return j.property(
                        "init",
                        j.identifier("pageSize"),
                        (property as ObjectProperty).value,
                    );
                }

                return null;
            });

            if (paginationProperties.filter(Boolean).length === 0) {
                return p.node;
            }

            const paginationProperty = j.property(
                "init",
                j.identifier("pagination"),
                j.objectExpression(paginationProperties.filter(Boolean)),
            );

            p.node.arguments = [
                j.objectExpression([...otherProperties, paginationProperty]),
            ];

            return p.node;
        });
    });
};

const fixUseListHasPaginationToPaginationMode = (
    j: JSCodeshift,
    source: Collection,
) => {
    const useListHooks = source.find(j.CallExpression, {
        callee: {
            name: "useList",
        },
    });

    useListHooks.replaceWith((p) => {
        const hasPaginationProperty = (
            p.node.arguments[0] as ObjectExpression
        ).properties.find(
            (p: Property) => (p.key as Identifier).name === "hasPagination",
        );

        if (!hasPaginationProperty) {
            return p.node;
        }

        const paginationProperty = (
            p.node.arguments[0] as ObjectExpression
        ).properties.find(
            (p: Property) => (p.key as Identifier).name === "pagination",
        );

        if (paginationProperty) {
            (paginationProperty as any).value.properties.push(
                j.property(
                    "init",
                    j.identifier("mode"),
                    j.literal(
                        (
                            (hasPaginationProperty as ObjectProperty)
                                .value as BooleanLiteral
                        ).value
                            ? "server"
                            : "off",
                    ),
                ),
            );
        } else {
            (p.node.arguments[0] as ObjectExpression).properties.push(
                j.property(
                    "init",
                    j.identifier("pagination"),
                    j.objectExpression([
                        j.property(
                            "init",
                            j.identifier("mode"),
                            j.literal(
                                (
                                    (hasPaginationProperty as ObjectProperty)
                                        .value as BooleanLiteral
                                ).value
                                    ? "server"
                                    : "off",
                            ),
                        ),
                    ]),
                ),
            );
        }

        (p.node.arguments[0] as ObjectExpression).properties = (
            p.node.arguments[0] as ObjectExpression
        ).properties.filter(
            (p: Property) => (p.key as Identifier).name !== "hasPagination",
        );

        return p.node;
    });
};

const useCustomConfigSortToSorters = (j: JSCodeshift, source: Collection) => {
    const useCustomHooks = source.find(j.CallExpression, {
        callee: {
            name: "useCustom",
        },
    });

    useCustomHooks.replaceWith((p) => {
        const configProperty = (
            p.node.arguments[0] as ObjectExpression
        ).properties.find(
            (p: Property) => (p.key as Identifier).name === "config",
        );

        if (!configProperty) {
            return p.node;
        }

        const sortProperty = (
            (configProperty as ObjectProperty).value as any
        ).properties.find(
            (p: Property) => (p.key as Identifier).name === "sort",
        );

        if (!sortProperty) {
            return p.node;
        }

        ((configProperty as ObjectProperty).value as any).properties.push(
            j.property(
                "init",
                j.identifier("sorters"),
                (sortProperty as ObjectProperty).value,
            ),
        );

        ((configProperty as ObjectProperty).value as any).properties = (
            (configProperty as ObjectProperty).value as any
        ).properties.filter(
            (p: Property) => (p.key as Identifier).name !== "sort",
        );

        return p.node;
    });
};

export default function transformer(file: FileInfo, api: API): string {
    const j = api.jscodeshift;
    const source = j(file.source);

    configToSpreadConfig(j, source);
    sortToSorters(j, source);
    sorterToSorters(j, source);
    resourceNametoResource(j, source);
    fixDeprecatedReactTableProps(j, source);
    fixDeprecatedUseTableProps(j, source);
    fixUseListHasPaginationToPaginationMode(j, source);
    useCustomConfigSortToSorters(j, source);

    return source.toSource();
}
