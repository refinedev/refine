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

const sortToSorters = (j: JSCodeshift, source: Collection) => {
    const sorts = source.find(j.Identifier, {
        name: "sort",
    });

    sorts.forEach((path) => {
        j(path).replaceWith(j.identifier("sorters"));
    });
};

const sorterToSorters = (j: JSCodeshift, source: Collection) => {
    const sorters = source.find(j.Identifier, {
        name: "sorter",
    });

    sorters.forEach((path) => {
        j(path).replaceWith(j.identifier("sorters"));
    });
};

const resourceNametoResource = (j: JSCodeshift, source: Collection) => {
    const resourceNames = source.find(j.Identifier, {
        name: "resourceName",
    });

    resourceNames.forEach((path) => {
        j(path).replaceWith(j.identifier("resource"));
    });
};

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

const deprecatedUseTableProps = [
    "initialCurrent",
    "initialPageSize",
    "hasPagination",
];

const deprecatedPropsToPagination = (j: JSCodeshift, source: Collection) => {
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

    if (refineReactTableImports.length !== 0) {
        return;
    }

    const useTableHooks = source.find(j.CallExpression, {
        callee: {
            name: "useTable",
        },
    });

    useTableHooks.replaceWith((p) => {
        const properties = (
            p.node.arguments[0] as ObjectExpression
        ).properties.filter(
            (p: Property) =>
                !deprecatedUseTableProps.includes((p.key as Identifier).name),
        );

        if (!properties.length) {
            return p.node;
        }

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

        const paginationProperty = j.property(
            "init",
            j.identifier("pagination"),
            j.objectExpression(paginationProperties.filter(Boolean)),
        );

        p.node.arguments = [
            j.objectExpression([...properties, paginationProperty]),
        ];

        return p.node;
    });
};

export default function transformer(file: FileInfo, api: API): string {
    const j = api.jscodeshift;
    const source = j(file.source);

    sortToSorters(j, source);
    sorterToSorters(j, source);
    resourceNametoResource(j, source);
    configToSpreadConfig(j, source);
    deprecatedPropsToPagination(j, source);

    return source.toSource();
}
