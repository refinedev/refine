import * as RefineMui from "@pankod/refine-mui";

import { createInferencer } from "@/create-inferencer";
import {
    jsx,
    componentName,
    prettyString,
    accessor,
    printImports,
    noOp,
    getVariableName,
} from "@/utilities";

import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { CodeViewerComponent } from "./code-viewer";

import { InferencerResultComponent, InferField, ImportElement } from "@/types";

/**
 * @experimental This is an experimental component
 */
export const ShowInferencer: InferencerResultComponent = createInferencer({
    type: "show",
    additionalScope: [["@pankod/refine-mui", "RefineMui", RefineMui]],
    codeViewerComponent: CodeViewerComponent,
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    renderer: ({ resource, fields, isCustomPage, id }) => {
        const COMPONENT_NAME = componentName(
            resource.label ?? resource.name,
            "show",
        );
        const recordName = "record";
        const imports: Array<ImportElement> = [
            ["useShow", "@pankod/refine-core"],
            ["Show", "@pankod/refine-mui"],
            ["Typography", "@pankod/refine-mui"],
            ["Stack", "@pankod/refine-mui"],
        ];

        const relationFields: (InferField | null)[] = fields.filter(
            (field) => field?.relation && !field?.fieldable && field?.resource,
        );

        const relationHooksCode = relationFields
            .filter(Boolean)
            .map((field) => {
                if (field?.relation && !field.fieldable && field.resource) {
                    if (field.multiple) {
                        imports.push(["useMany", "@pankod/refine-core"]);

                        let ids = accessor(recordName, field.key);

                        if (field.accessor) {
                            ids = `${accessor(
                                recordName,
                                field.key,
                            )}?.map((item: any) => ${accessor(
                                "item",
                                undefined,
                                field.accessor,
                            )})`;
                        }

                        return `
                    const { data: ${getVariableName(
                        field.key,
                        "Data",
                    )}, isLoading: ${getVariableName(
                            field.key,
                            "IsLoading",
                        )} } =
                    useMany({
                        resource: "${field.resource.name}",
                        ids: ${ids} || [],
                        queryOptions: {
                            enabled: !!${recordName},
                        },
                    });
                    `;
                    }

                    imports.push(["useOne", "@pankod/refine-core"]);

                    return `
                    const { data: ${getVariableName(
                        field.key,
                        "Data",
                    )}, isLoading: ${getVariableName(
                        field.key,
                        "IsLoading",
                    )} } =
                    useOne({
                        resource: "${field.resource.name}",
                        id: ${accessor(
                            recordName,
                            field.key,
                            field.accessor,
                            false,
                        )} || "",
                        queryOptions: {
                            enabled: !!${recordName},
                        },
                    });
                `;
                }
                return undefined;
            })
            .filter(Boolean);

        const renderRelationFields = (field: InferField) => {
            if (field.relation && field.resource) {
                const variableName = getVariableName(field.key, "Data");
                const variableIsLoading = getVariableName(
                    field.key,
                    "IsLoading",
                );

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-mui"]);

                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    {${variableIsLoading} ? (
                        <>
                            Loading...
                        </>
                        ) : (
                        <>
                        ${(() => {
                            if (field.relationInfer) {
                                if (field.relationInfer?.accessor) {
                                    if (
                                        Array.isArray(
                                            field.relationInfer.accessor,
                                        )
                                    ) {
                                        return `Not Handled.`;
                                    } else {
                                        const mapItemName = getVariableName(
                                            field.key,
                                        );
                                        const val = accessor(
                                            mapItemName,
                                            undefined,
                                            field.relationInfer.accessor,
                                        );
                                        return `
                                            <Stack direction="row" spacing={1}>
                                                {${variableName}?.data?.map((${mapItemName}: any) => (
                                                    <TagField key={${val}} value={${val}} />
                                                ))}
                                            </Stack>
                                        `;
                                    }
                                } else {
                                    return `Not Handled.`;
                                }
                            } else {
                                return `not-handled - relation with multiple but no resource`;
                            }
                        })()}
                        </>
                    )}
                    `;
                }

                return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>

                    {${variableIsLoading} ? (
                        <>Loading...</>
                    ) : (
                        <>
                        ${(() => {
                            if (field.relationInfer) {
                                if (field.relationInfer?.accessor) {
                                    if (
                                        Array.isArray(
                                            field.relationInfer.accessor,
                                        )
                                    ) {
                                        return `{${accessor(
                                            `${variableName}?.data`,
                                            undefined,
                                            field.relationInfer.accessor,
                                            ' + " " + ',
                                        )}}`;
                                    } else {
                                        return `{${variableName}?.data?.${field.relationInfer.accessor}}`;
                                    }
                                } else {
                                    return `{${variableName}?.data}`;
                                }
                            } else {
                                return `{${variableName}?.data?.id}`;
                            }
                        })()}
                        </>
                    )}
                    `;
            }
            return undefined;
        };

        const textFields = (field: InferField) => {
            if (field.type === "text") {
                imports.push([
                    "TextFieldComponent as TextField",
                    "@pankod/refine-mui",
                ]);

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-mui"]);

                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </Stack>
                `;
                }

                return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <TextField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                    )}} />
                `;
            }
            return undefined;
        };

        const imageFields = (field: InferField) => {
            if (field.type === "image") {
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <img style={{ maxWidth: 200, width: "100%", height: 200 }} src={${val}} key={${val}} />
                    ))}
                    </Stack>
                `;
                }

                return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <img style={{ maxWidth: 200, width: "100%", height: 200 }} src={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        " + ",
                    )}} />
                    `;
            }
            return undefined;
        };

        const emailFields = (field: InferField) => {
            if (field.type === "email") {
                imports.push(["EmailField", "@pankod/refine-mui"]);

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-mui"]);

                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </Stack>
                `;
                }
                return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <EmailField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        " + ",
                    )}} />
                `;
            }
            return undefined;
        };

        const urlFields = (field: InferField) => {
            if (field.type === "url") {
                imports.push(["UrlField", "@pankod/refine-mui"]);

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-mui"]);

                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </Stack>
                `;
                }
                return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <UrlField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        " + ",
                    )}} />
                `;
            }
            return undefined;
        };

        const booleanFields = (field: InferField) => {
            if (field.type === "boolean") {
                imports.push(["BooleanField", "@pankod/refine-mui"]);

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-mui"]);

                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                    {${accessor(
                        recordName,
                        field.key,
                    )}?.map((item: any, index: number) => (
                        <TagField value={${val}} key={index} />
                    ))}
                    </Stack>
                `;
                }

                return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <BooleanField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        " && ",
                    )}} />
                `;
            }
            return undefined;
        };

        const dateFields = (field: InferField) => {
            if (field.type === "date") {
                imports.push(["DateField", "@pankod/refine-mui"]);

                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <DateField value={${val}} key={${val}} />
                    ))}
                    </Stack>
                `;
                }

                return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <DateField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        " + ' ' + ",
                    )}} />
                `;
            }
            return undefined;
        };

        const richtextFields = (field: InferField) => {
            if (field.type === "richtext") {
                imports.push(["MarkdownField", "@pankod/refine-mui"]);

                return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <MarkdownField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        ' + " " + ',
                    )}} />
                `;
            }

            return undefined;
        };

        const numberFields = (field: InferField) => {
            if (field.type === "number") {
                imports.push(["NumberField", "@pankod/refine-mui"]);

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-mui"]);

                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </Stack>
                `;
                }

                return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <NumberField value={${accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        ' + " " + ',
                    )} ?? ""} />
                `;
            }
            return undefined;
        };

        const renderedFields: Array<string | undefined> = fields.map(
            (field) => {
                switch (field?.type) {
                    case "text":
                        return textFields(field);
                    case "number":
                        return numberFields(field);
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

        noOp(imports);

        return jsx`
        ${printImports(imports)}

        export const ${COMPONENT_NAME} = () => {
            const { queryResult } = useShow(${
                isCustomPage
                    ? `{ 
                        resource: "${resource.name}", 
                        id: ${id}
                    }`
                    : ""
            });
            const { data, isLoading } = queryResult;
        
            const ${recordName} = data?.data;
        
            ${relationHooksCode}

            return (
                <Show isLoading={isLoading}>
                    <Stack gap={1}>
                        ${renderedFields.join("")}
                    </Stack>
                </Show>
            );
        };
        `;
    },
});
