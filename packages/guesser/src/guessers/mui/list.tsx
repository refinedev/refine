import * as RefineMui from "@pankod/refine-mui";

import { createGuesser } from "@/create-guesser";
import {
    jsx,
    componentName,
    prettyString,
    accessor,
    printImports,
    toPlural,
    isIDKey,
    dotAccessor,
} from "@/utilities";

import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { CodeViewerComponent } from "./code-viewer";

import { GuessField } from "@/types";

/**
 * @experimental This is an experimental component
 */
export const ListGuesser = createGuesser({
    type: "list",
    additionalScope: [["@pankod/refine-mui", "RefineMui", RefineMui]],
    codeViewerComponent: CodeViewerComponent,
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    renderer: ({ resource, fields }) => {
        const COMPONENT_NAME = componentName(resource.name, "list");
        const recordName = "dataGridProps?.rows";
        const imports: Array<[element: string, module: string]> = [
            ["useDataGrid", "@pankod/refine-mui"],
            ["DataGrid", "@pankod/refine-mui"],
            ["GridColumns", "@pankod/refine-mui"],
            ["EditButton", "@pankod/refine-mui"],
            ["ShowButton", "@pankod/refine-mui"],
            ["List", "@pankod/refine-mui"],
        ];

        const relationFields: (GuessField | null)[] = fields.filter(
            (field) => field?.relation && !field?.fieldable && field?.resource,
        );

        const relationHooksCode = relationFields
            .filter(Boolean)
            .map((field) => {
                if (field?.relation && !field.fieldable && field.resource) {
                    imports.push(["useMany", "@pankod/refine-core"]);

                    let idsString = "";

                    if (field.multiple) {
                        idsString = `[].concat(...(${recordName}?.map((item) => ${accessor(
                            "item",
                            field.key,
                            field.accessor,
                            false,
                        )}) ?? []))`;
                    } else {
                        idsString = `${recordName}?.map((item) => ${accessor(
                            "item",
                            field.key,
                            field.accessor,
                            false,
                        )}) ?? []`;
                    }

                    return `
                    const { data: ${toPlural(
                        field.resource.name,
                    )}Data, isLoading: ${toPlural(
                        field.resource.name,
                    )}IsLoading } =
                    useMany({
                        resource: "${field.resource.name}",
                        ids: ${idsString},
                        queryOptions: {
                            enabled: !!${recordName},
                        },
                    });
                    `;
                }
                return undefined;
            })
            .filter(Boolean);

        const relationVariableNames = relationFields
            ?.map((field) => {
                if (field && field.resource) {
                    return `${toPlural(field.resource.name)}Data?.data`;
                }
                return undefined;
            })
            .filter(Boolean);

        const renderRelationFields = (field: GuessField) => {
            if (field.relation && field.resource) {
                const variableName = `${toPlural(
                    field.resource.name,
                )}Data?.data`;
                const variableIsLoading = `${toPlural(
                    field.resource.name,
                )}IsLoading`;

                if (Array.isArray(field.accessor)) {
                    // not handled - not possible case
                    return undefined;
                }

                const loadingCondition = `${variableIsLoading} ? <>Loading...</> : `;

                const fieldProperty = `field: "${field.key}"`;

                const valueGetterProperty = field.accessor
                    ? `valueGetter: ({ row }) => {
                    const value = ${accessor(
                        "row",
                        field.key,
                        field.accessor,
                        false,
                    )};

                    return value;
                },`
                    : "";

                const headerProperty = `headerName: "${prettyString(
                    field.key,
                )}"`;

                let renderCell = "";

                // if multiple, then map it with tagfield
                // if not, then just show the value

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-mui"]);
                    let val = "item";

                    // for multiple
                    if (field?.relationGuess) {
                        const valSingle = `${variableName}?.find((resourceItems) => resourceItems.id === item)`;
                        const valViewableSingle = accessor(
                            valSingle,
                            undefined,
                            field?.relationGuess?.accessor,
                        );
                        val = valViewableSingle;
                    }

                    renderCell = `
                    renderCell: function render({ value }) {
                        return ${loadingCondition} (
                            <>
                                {${accessor(
                                    "value",
                                    undefined,
                                    field.accessor,
                                )}?.map((item, index) => (
                                    <TagField key={index} value={${val}} />
                                ))}
                            </>
                        )
                    }
                    `;
                } else {
                    if (field?.relationGuess) {
                        // for single
                        const valSingle = `${variableName}?.find((item) => item.id === value)`;
                        const valViewableSingle = accessor(
                            valSingle,
                            undefined,
                            field?.relationGuess?.accessor,
                        );

                        renderCell = `
                        renderCell: function render({ value }) {
                            return ${loadingCondition} ${valViewableSingle};
                        }
                        `;
                    } else {
                        renderCell = "";
                    }
                }

                return `
                    {
                        ${fieldProperty},
                        ${headerProperty},
                        ${valueGetterProperty}
                        minWidth: 300,
                        ${renderCell}
                    }
                `;
            }
            return undefined;
        };

        const imageFields = (field: GuessField) => {
            if (field.type === "image") {
                const fieldProperty =
                    Array.isArray(field.accessor) || field.multiple
                        ? `field: "${field.key}"`
                        : field.accessor
                        ? `field: "${dotAccessor(
                              field.key,
                              undefined,
                              field.accessor,
                          )}"`
                        : `field: "${field.key}"`;

                const headerProperty = `headerName: "${prettyString(
                    field.key,
                )}"`;

                let renderCell = `
                    renderCell: function render({ value }) {
                        return (
                            <img src={${accessor(
                                "value",
                                undefined,
                                Array.isArray(field.accessor)
                                    ? field.accessor
                                    : undefined,
                                " + ",
                            )}} style={{ height: "50px", maxWidth: "100px" }} />
                        )
                    }
                `;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " + ",
                    );

                    renderCell = `
                        renderCell: function render({ value }) {
                            return (
                                <>
                                {value?.map((item, index) => (
                                    <img src={${val}} key={index} style={{ height: "50px", maxWidth: "100px" }} />
                                ))}
                                </>
                            )
                        }
                    `;
                }

                return `
                    {
                        ${fieldProperty},
                        ${headerProperty},
                        minWidth: 250,
                        ${renderCell}
                    }
                `;
            }
            return undefined;
        };

        const emailFields = (field: GuessField) => {
            if (field.type === "email") {
                imports.push(
                    ["TagField", "@pankod/refine-antd"],
                    ["EmailField", "@pankod/refine-antd"],
                );

                const fieldProperty =
                    Array.isArray(field.accessor) || field.multiple
                        ? `field: "${field.key}"`
                        : field.accessor
                        ? `field: "${dotAccessor(
                              field.key,
                              undefined,
                              field.accessor,
                          )}"`
                        : `field: "${field.key}"`;

                const headerProperty = `headerName: "${prettyString(
                    field.key,
                )}"`;

                let renderCell = `
                renderCell: function render({ value }) {
                    return (
                        <EmailField value={${accessor(
                            "value",
                            undefined,
                            Array.isArray(field.accessor)
                                ? field.accessor
                                : undefined,
                            " + ",
                        )}} />
                    )
                }
            `;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " + ",
                    );

                    renderCell = `
                    renderCell: function render({ value }) {
                        return (
                            <>
                            {value?.map((item, index) => (
                                <TagField value={${val}} key={index} />
                            ))}
                            </>
                        )
                    }
                `;
                }

                return `
                {
                    ${fieldProperty},
                    ${headerProperty},
                    minWidth: 250,
                    ${renderCell}
                }
            `;
            }
            return undefined;
        };

        const urlFields = (field: GuessField) => {
            if (field.type === "url") {
                imports.push(
                    ["UrlField", "@pankod/refine-mui"],
                    ["TagField", "@pankod/refine-mui"],
                );

                const fieldProperty =
                    Array.isArray(field.accessor) || field.multiple
                        ? `field: "${field.key}"`
                        : field.accessor
                        ? `field: "${dotAccessor(
                              field.key,
                              undefined,
                              field.accessor,
                          )}"`
                        : `field: "${field.key}"`;

                const headerProperty = `headerName: "${prettyString(
                    field.key,
                )}"`;

                let renderCell = `
                    renderCell: function render({ value }) {
                        return (
                            <UrlField value={${accessor(
                                "value",
                                undefined,
                                Array.isArray(field.accessor)
                                    ? field.accessor
                                    : undefined,
                                " + ",
                            )}} />
                        )
                    }
                `;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " + ",
                    );

                    renderCell = `
                        renderCell: function render({ value }) {
                            return (
                                <>
                                {value?.map((item, index) => (
                                    <TagField value={${val}} key={index} />
                                ))}
                                </>
                            )
                        }
                    `;
                }

                return `
                    {
                        ${fieldProperty},
                        ${headerProperty},
                        minWidth: 250,
                        ${renderCell}
                    }
                `;
            }
            return undefined;
        };

        const booleanFields = (field: GuessField) => {
            if (field?.type) {
                imports.push(["Checkbox", "@pankod/refine-mui"]);

                const fieldProperty =
                    Array.isArray(field.accessor) || field.multiple
                        ? `field: "${field.key}"`
                        : field.accessor
                        ? `field: "${dotAccessor(
                              field.key,
                              undefined,
                              field.accessor,
                          )}"`
                        : `field: "${field.key}"`;

                const headerProperty = `headerName: "${prettyString(
                    field.key,
                )}"`;

                let renderCell = `
                    renderCell: function render({ value }) {
                        return (
                            <Checkbox checked={!!${accessor(
                                "value",
                                undefined,
                                Array.isArray(field.accessor)
                                    ? field.accessor
                                    : undefined,
                                " && ",
                            )}} />
                        );
                    }
                `;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " && ",
                    );

                    renderCell = `
                        renderCell: function render({ value }) {
                            return (
                                <>
                                {value.map((item, index) => (
                                    <Checkbox checked={!!${val}} key={index} />
                                ))}
                                </>
                            )
                        }
                    `;
                }

                return `
                    {
                        ${fieldProperty},
                        ${headerProperty},
                        minWidth: 250,
                        ${renderCell}
                    }
                `;
            }

            return undefined;
        };

        const dateFields = (field: GuessField) => {
            if (field.type === "date") {
                imports.push(["DateField", "@pankod/refine-mui"]);

                const fieldProperty =
                    Array.isArray(field.accessor) || field.multiple
                        ? `field: "${field.key}"`
                        : field.accessor
                        ? `field: "${dotAccessor(
                              field.key,
                              undefined,
                              field.accessor,
                          )}"`
                        : `field: "${field.key}"`;

                const headerProperty = `headerName: "${prettyString(
                    field.key,
                )}"`;

                let renderCell = `
                    renderCell: function render({ value }) {
                        return <DateField value={value} />;
                    }
                `;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        ' + " " + ',
                    );
                    renderCell = `
                        renderCell: function render({ value }) {
                            return (
                                <>
                                {value?.map((item, index) => (
                                    <DateField value={${val}} key={index} />
                                ))}
                                </>
                            )
                        }
                    `;
                }

                return `
                    {
                        ${fieldProperty},
                        ${headerProperty},
                        minWidth: 250,
                        ${renderCell}
                    }
                `;
            }
            return undefined;
        };

        const richtextFields = (field: GuessField) => {
            if (field?.type === "richtext") {
                imports.push(["MarkdownField", "@pankod/refine-mui"]);

                const fieldProperty =
                    Array.isArray(field.accessor) || field.multiple
                        ? `field: "${field.key}"`
                        : field.accessor
                        ? `field: "${dotAccessor(
                              field.key,
                              undefined,
                              field.accessor,
                          )}"`
                        : `field: "${field.key}"`;

                const headerProperty = `headerName: "${prettyString(
                    field.key,
                )}"`;

                let renderCell = `
                    renderCell: function render({ value }) {
                        return <MarkdownField value={(value ?? "").slice(0, 80) + "..."} />;
                    }
                `;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        ' + " " + ',
                    );
                    renderCell = `
                        renderCell: function render({ value }) {
                            return (
                                <>
                                {value?.map((item, index) => (
                                    <MarkdownField value={(${val}).slice(0, 80) + "..."} key={index} />
                                ))}
                                </>
                            )
                        }
                    `;
                }

                return `
                    {
                        ${fieldProperty},
                        ${headerProperty},
                        minWidth: 250,
                        ${renderCell}
                    }
                `;
            }

            return undefined;
        };

        const basicFields = (field: GuessField) => {
            if (field && (field.type === "text" || field.type === "number")) {
                const fieldProperty =
                    field.accessor &&
                    !Array.isArray(field.accessor) &&
                    !field.multiple
                        ? `field: "${field.key}.${field.accessor}"`
                        : `field: "${field.key}"`;

                const headerProperty = `headerName: "${prettyString(
                    field.key,
                )}"`;

                let renderCell = "";

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-mui"]);

                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        ' + " " + ',
                    );
                    renderCell = `
                    renderCell: function render({ row }) {
                        return (
                            <>
                                {${accessor("row", field.key)}.map((item) => (
                                    <TagField value={${val}} key={${val}} />
                                ))}
                            </>
                        )
                    }
                    `;
                }
                if (!field.multiple && Array.isArray(field.accessor)) {
                    renderCell = `
                    renderCell: function render({ row }) {
                        return 
                            <>{${accessor("row", field.key, field.accessor)}}</>
                        );
                    }
                    `;
                }

                return `
                {
                    ${fieldProperty},
                    ${headerProperty},
                    ${field.type === "number" ? "type: 'number'," : ""}
                    minWidth: ${isIDKey(field.key) ? 50 : 200},
                    ${renderCell}
                }
                `;
            }
            return undefined;
        };

        const actionButtons = `
                {
                    field: "actions",
                    headerName: "Actions",
                    renderCell: function render({ row }) {
                        return (
                            <>
                                <EditButton hideText recordItemId={row.id} />
                                <ShowButton hideText recordItemId={row.id} />
                            </>
                        );
                    },
                    align: "center",
                    headerAlign: "center",
                    minWidth: 80,
                },
        `;

        const renderedFields: Array<string | undefined> = fields.map(
            (field) => {
                switch (field?.type) {
                    case "text":
                    case "number":
                        return basicFields(field);
                    case "richtext":
                        return richtextFields(field);
                    case "email":
                        return emailFields(field);
                    case "image":
                        return imageFields(field);
                    case "date":
                        return dateFields(field);
                    case "boolean":
                        return booleanFields(field);
                    case "url":
                        return urlFields(field);
                    case "relation":
                        return renderRelationFields(field);
                    default:
                        return undefined;
                }
            },
        );

        return jsx`
        ${printImports(imports)}
        
        export const ${COMPONENT_NAME} = () => {
            const { dataGridProps } = useDataGrid();
        
            ${relationHooksCode}

            const columns = React.useMemo<GridColumns<any>>(() => [
                ${[...renderedFields, actionButtons].join(",\r\n")}
            ], [${relationVariableNames.join(",")}]);

            return (
                <List>
                    <DataGrid {...dataGridProps} columns={columns} autoHeight />
                </List>
            );
        };
        `;
    },
});
