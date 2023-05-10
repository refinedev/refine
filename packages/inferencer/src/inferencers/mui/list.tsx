import {
    useDataGrid,
    EditButton,
    SaveButton,
    DeleteButton,
    List,
    TagField,
    EmailField,
    UrlField,
    DateField,
    MarkdownField,
    ShowButton,
} from "@refinedev/mui";
import { DataGrid } from "@mui/x-data-grid";
import { Checkbox } from "@mui/material";

import { createInferencer } from "@/create-inferencer";
import {
    jsx,
    componentName,
    prettyString,
    accessor,
    printImports,
    isIDKey,
    noOp,
    getVariableName,
} from "@/utilities";

import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { SharedCodeViewer } from "@/components/shared-code-viewer";

import {
    InferencerResultComponent,
    InferField,
    ImportElement,
    RendererContext,
} from "@/types";
import { getMetaProps } from "@/utilities/get-meta-props";

/**
 * a renderer function for list page in Material UI
 * @internal used internally from inferencer components
 */
export const renderer = ({
    resource,
    fields,
    meta,
    isCustomPage,
}: RendererContext) => {
    const COMPONENT_NAME = componentName(
        resource.label ?? resource.name,
        "list",
    );
    const recordName = "dataGridProps?.rows";
    const imports: Array<ImportElement> = [
        ["React", "react", true],
        ["useDataGrid", "@refinedev/mui"],
        ["DataGrid", "@mui/x-data-grid"],
        ["GridColumns", "@mui/x-data-grid"],
        ["EditButton", "@refinedev/mui"],
        ["ShowButton", "@refinedev/mui"],
        ["DeleteButton", "@refinedev/mui"],
        ["List", "@refinedev/mui"],
    ];

    const relationFields: (InferField | null)[] = fields.filter(
        (field) => field?.relation && !field?.fieldable && field?.resource,
    );

    const relationHooksCode = relationFields
        .filter(Boolean)
        .map((field) => {
            if (field?.relation && !field.fieldable && field.resource) {
                imports.push(["useMany", "@refinedev/core"]);

                let idsString = "";

                if (field.multiple) {
                    idsString = `[].concat(...(${recordName}?.map((item: any) => ${accessor(
                        "item",
                        field.key,
                        field.accessor,
                        false,
                    )}) ?? []))`;
                } else {
                    idsString = `${recordName}?.map((item: any) => ${accessor(
                        "item",
                        field.key,
                        field.accessor,
                        false,
                    )}) ?? []`;
                }

                return `
                const { data: ${getVariableName(
                    field.key,
                    "Data",
                )}, isLoading: ${getVariableName(field.key, "IsLoading")} } =
                useMany({
                    resource: "${field.resource.name}",
                    ids: ${idsString},
                    queryOptions: {
                        enabled: !!${recordName},
                    },
                    ${getMetaProps(
                        field?.resource?.identifier ?? field?.resource?.name,
                        meta,
                        "getMany",
                    )}
                });
                `;
            }
            return undefined;
        })
        .filter(Boolean);

    const relationVariableNames = relationFields
        ?.map((field) => {
            if (field && field.resource) {
                return `${getVariableName(field.key, "Data")}?.data`;
            }
            return undefined;
        })
        .filter(Boolean);

    const renderRelationFields = (field: InferField) => {
        if (field.relation && field.resource) {
            const variableName = `${getVariableName(field.key, "Data")}?.data`;
            const variableIsLoading = getVariableName(field.key, "IsLoading");

            if (Array.isArray(field.accessor)) {
                // not handled - not possible case
                return undefined;
            }

            const loadingCondition = `${variableIsLoading} ? <>Loading...</> : `;

            const fieldProperty = `field: "${field.key}"`;

            const valueGetterProperty =
                field.accessor &&
                !field.multiple &&
                !Array.isArray(field.accessor)
                    ? `valueGetter: ({ row }) => {
            const value = ${accessor("row", field.key, field.accessor, false)};

            return value;
        },`
                    : "";

            const headerProperty = `headerName: "${prettyString(field.key)}"`;

            let renderCell = "";

            // if multiple, then map it with tagfield
            // if not, then just show the value

            if (field.multiple) {
                imports.push(["TagField", "@refinedev/mui"]);

                let val = "item";

                // for multiple
                if (field?.relationInfer) {
                    const valSingle = `${variableName}?.find((resourceItems) => resourceItems.id === ${accessor(
                        "item",
                        undefined,
                        field.accessor,
                    )})`;
                    const valViewableSingle = accessor(
                        valSingle,
                        undefined,
                        field?.relationInfer?.accessor,
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
                            )}?.map((item: any, index: number) => (
                                <TagField key={index} value={${val}} />
                            ))}
                        </>
                    )
                }
                `;
            } else {
                if (field?.relationInfer) {
                    // for single
                    const valSingle = `${variableName}?.find((item) => item.id === value)`;
                    const valViewableSingle = accessor(
                        valSingle,
                        undefined,
                        field?.relationInfer?.accessor,
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
                    flex: 1,
                    ${headerProperty},${valueGetterProperty}
                    minWidth: 300,${renderCell}
                }
            `;
        }
        return undefined;
    };

    const imageFields = (field: InferField) => {
        if (field.type === "image") {
            const fieldProperty = `field: "${field.key}"`;

            const headerProperty = `headerName: "${prettyString(field.key)}"`;

            const valueGetterProperty =
                field.accessor &&
                !field.multiple &&
                !Array.isArray(field.accessor)
                    ? `valueGetter: ({ row }) => {
            const value = ${accessor("row", field.key, field.accessor, false)};

            return value;
        },`
                    : "";

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
                const val = accessor("item", undefined, field.accessor, " + ");

                renderCell = `
                    renderCell: function render({ value }) {
                        return (
                            <>
                            {value?.map((item: any, index: number) => (
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
                    flex: 1,
                    ${headerProperty},${valueGetterProperty}
                    minWidth: 100,${renderCell}
                }
            `;
        }
        return undefined;
    };

    const emailFields = (field: InferField) => {
        if (field.type === "email") {
            imports.push(["EmailField", "@refinedev/mui"]);

            const fieldProperty = `field: "${field.key}"`;

            const headerProperty = `headerName: "${prettyString(field.key)}"`;

            const valueGetterProperty =
                field.accessor &&
                !field.multiple &&
                !Array.isArray(field.accessor)
                    ? `valueGetter: ({ row }) => {
            const value = ${accessor("row", field.key, field.accessor, false)};

            return value;
        },`
                    : "";

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
                imports.push(["TagField", "@refinedev/mui"]);

                const val = accessor("item", undefined, field.accessor, " + ");

                renderCell = `
                renderCell: function render({ value }) {
                    return (
                        <>
                        {value?.map((item: any, index: number) => (
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
                flex: 1,
                ${headerProperty},${valueGetterProperty}
                minWidth: 250,${renderCell}
            }
        `;
        }
        return undefined;
    };

    const urlFields = (field: InferField) => {
        if (field.type === "url") {
            imports.push(["UrlField", "@refinedev/mui"]);

            const fieldProperty = `field: "${field.key}"`;

            const headerProperty = `headerName: "${prettyString(field.key)}"`;

            const valueGetterProperty =
                field.accessor &&
                !field.multiple &&
                !Array.isArray(field.accessor)
                    ? `valueGetter: ({ row }) => {
            const value = ${accessor("row", field.key, field.accessor, false)};

            return value;
        },`
                    : "";

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
                imports.push(["TagField", "@refinedev/mui"]);

                const val = accessor("item", undefined, field.accessor, " + ");

                renderCell = `
                    renderCell: function render({ value }) {
                        return (
                            <>
                            {value?.map((item: any, index: any) => (
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
                    flex: 1,
                    ${headerProperty},${valueGetterProperty}
                    minWidth: 250,${renderCell}
                }
            `;
        }
        return undefined;
    };

    const booleanFields = (field: InferField) => {
        if (field?.type) {
            imports.push(["Checkbox", "@mui/material"]);

            const fieldProperty = `field: "${field.key}"`;

            const headerProperty = `headerName: "${prettyString(field.key)}"`;

            const valueGetterProperty =
                field.accessor &&
                !field.multiple &&
                !Array.isArray(field.accessor)
                    ? `valueGetter: ({ row }) => {
            const value = ${accessor("row", field.key, field.accessor, false)};

            return value;
        },`
                    : "";

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
                const val = accessor("item", undefined, field.accessor, " && ");

                renderCell = `
                    renderCell: function render({ value }) {
                        return (
                            <>
                            {value?.map((item: any, index: number) => (
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
                    ${headerProperty},${valueGetterProperty}
                    minWidth: 100,${renderCell}
                }
            `;
        }

        return undefined;
    };

    const dateFields = (field: InferField) => {
        if (field.type === "date") {
            imports.push(["DateField", "@refinedev/mui"]);

            const fieldProperty = `field: "${field.key}"`;

            const headerProperty = `headerName: "${prettyString(field.key)}"`;

            const valueGetterProperty =
                field.accessor &&
                !field.multiple &&
                !Array.isArray(field.accessor)
                    ? `valueGetter: ({ row }) => {
            const value = ${accessor("row", field.key, field.accessor, false)};

            return value;
        },`
                    : "";

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
                            {value?.map((item: any, index: number) => (
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
                    flex: 1,
                    ${headerProperty},${valueGetterProperty}
                    minWidth: 250,${renderCell}
                }
            `;
        }
        return undefined;
    };

    const richtextFields = (field: InferField) => {
        if (field?.type === "richtext") {
            imports.push(["MarkdownField", "@refinedev/mui"]);

            const fieldProperty = `field: "${field.key}"`;

            const headerProperty = `headerName: "${prettyString(field.key)}"`;

            const valueGetterProperty =
                field.accessor &&
                !field.multiple &&
                !Array.isArray(field.accessor)
                    ? `valueGetter: ({ row }) => {
            const value = ${accessor("row", field.key, field.accessor, false)};

            return value;
        },`
                    : "";

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
                            {value?.map((item: any, index: number) => (
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
                    flex: 1,
                    ${headerProperty},${valueGetterProperty}
                    minWidth: 250,${renderCell}
                }
            `;
        }

        return undefined;
    };

    const basicFields = (field: InferField) => {
        if (field && (field.type === "text" || field.type === "number")) {
            const fieldProperty = `field: "${field.key}"`;

            const headerProperty = `headerName: "${prettyString(field.key)}"`;

            const valueGetterProperty =
                field.accessor &&
                !field.multiple &&
                !Array.isArray(field.accessor)
                    ? `valueGetter: ({ row }) => {
            const value = ${accessor("row", field.key, field.accessor, false)};

            return value;
        },`
                    : "";

            let renderCell = "";

            if (field.multiple) {
                imports.push(["TagField", "@refinedev/mui"]);

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
                            {(${accessor(
                                "row",
                                field.key,
                            )})?.map((item: any) => (
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
                    return (
                        <>{${accessor("row", field.key, field.accessor)}}</>
                    );
                }
                `;
            }

            return `
            {
                ${fieldProperty}, ${
                isIDKey(field.key)
                    ? ""
                    : `
                flex: 1,`
            }
                ${headerProperty},${valueGetterProperty}${
                field.type === "number" ? "type: 'number'," : ""
            }
                minWidth: ${isIDKey(field.key) ? 50 : 200},${renderCell}
            }
            `;
        }
        return undefined;
    };

    const { canEdit, canShow, canDelete } = resource ?? {};

    if (canEdit) {
        imports.push(["EditButton", "@refinedev/mui"]);
    }
    if (canShow) {
        imports.push(["ShowButton", "@refinedev/mui"]);
    }
    if (canDelete) {
        imports.push(["DeleteButton", "@refinedev/mui"]);
    }

    const actionButtons =
        canEdit || canShow || canDelete
            ? jsx`
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <>
                            ${
                                canEdit
                                    ? jsx`<EditButton hideText recordItemId={row.id} />`
                                    : ""
                            }
                            ${
                                canShow
                                    ? jsx`<ShowButton hideText recordItemId={row.id} />`
                                    : ""
                            }
                            ${
                                canDelete
                                    ? jsx`<DeleteButton hideText recordItemId={row.id} />`
                                    : ""
                            }
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
    `
            : "";

    const renderedFields: Array<string | undefined> = fields.map((field) => {
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
    });

    noOp(imports);

    return jsx`
    ${printImports(imports)}
    
    export const ${COMPONENT_NAME} = () => {
        const { dataGridProps } = useDataGrid(
            ${
                isCustomPage
                    ? `{ resource: "${resource.name}",
                        ${getMetaProps(
                            resource?.identifier ?? resource?.name,
                            meta,
                            "getList",
                        )}
                        }`
                    : getMetaProps(
                          resource?.identifier ?? resource?.name,
                          meta,
                          "getList",
                      )
                    ? `{ ${getMetaProps(
                          resource?.identifier ?? resource?.name,
                          meta,
                          "getList",
                      )} },`
                    : ""
            } 
        );
    
        ${relationHooksCode}

        const columns = React.useMemo<GridColumns<any>>(() => [
            ${[...renderedFields, actionButtons].filter(Boolean).join(",\r\n")}
        ], [${relationVariableNames.join(",")}]);

        return (
            <List>
                <DataGrid {...dataGridProps} columns={columns} autoHeight />
            </List>
        );
    };
    `;
};

/**
 * @experimental This is an experimental component
 */
export const ListInferencer: InferencerResultComponent = createInferencer({
    type: "list",
    additionalScope: [
        [
            "@refinedev/mui",
            "RefineMui",
            {
                useDataGrid,
                EditButton,
                SaveButton,
                DeleteButton,
                List,
                TagField,
                EmailField,
                UrlField,
                DateField,
                MarkdownField,
                ShowButton,
            },
        ],
        ["@mui/x-data-grid", "MuiXDataGrid", { DataGrid }],
        ["@mui/material", "MuiMaterial", { Checkbox }],
    ],
    codeViewerComponent: SharedCodeViewer,
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    renderer,
});
