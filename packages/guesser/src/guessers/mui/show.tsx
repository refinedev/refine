import * as RefineMui from "@pankod/refine-mui";

import { createGuesser } from "@/create-guesser";
import {
    jsx,
    componentName,
    prettyString,
    accessor,
    printImports,
    toPlural,
    toSingular,
} from "@/utilities";

import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { CodeViewerComponent } from "./code-viewer";

import { GuesserResultComponent, GuessField, ImportElement } from "@/types";

/**
 * @experimental This is an experimental component
 */
export const ShowGuesser: GuesserResultComponent = createGuesser({
    type: "show",
    additionalScope: [["@pankod/refine-mui", "RefineMui", RefineMui]],
    codeViewerComponent: CodeViewerComponent,
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    renderer: ({ resource, fields }) => {
        const COMPONENT_NAME = componentName(resource.name, "show");
        const recordName = "record";
        const imports: Array<ImportElement> = [
            ["useShow", "@pankod/refine-core"],
            ["Show", "@pankod/refine-mui"],
            ["Typography", "@pankod/refine-mui"],
            ["Stack", "@pankod/refine-mui"],
        ];

        const relationFields: (GuessField | null)[] = fields.filter(
            (field) => field?.relation && !field?.fieldable && field?.resource,
        );

        const relationHooksCode = relationFields
            .filter(Boolean)
            .map((field) => {
                if (field?.relation && !field.fieldable && field.resource) {
                    if (field.multiple) {
                        imports.push(["useMany", "@pankod/refine-core"]);
                        return `
                    const { data: ${toPlural(
                        field.resource.name,
                    )}Data, isLoading: ${toPlural(
                            field.resource.name,
                        )}IsLoading } =
                    useMany({
                        resource: "${field.resource.name}",
                        ids: ${accessor(
                            recordName,
                            field.key,
                            field.accessor,
                            false,
                        )} || [],
                        queryOptions: {
                            enabled: !!${recordName},
                        },
                    });
                    `;
                    }
                    imports.push(["useOne", "@pankod/refine-core"]);
                    return `
                    const { data: ${toSingular(
                        field.resource.name,
                    )}Data, isLoading: ${toSingular(
                        field.resource.name,
                    )}IsLoading } =
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

        const renderRelationFields = (field: GuessField) => {
            if (field.relation && field.resource) {
                const variableName = `${
                    field.multiple
                        ? toPlural(field.resource.name)
                        : toSingular(field.resource.name)
                }Data`;
                const variableIsLoading = `${
                    field.multiple
                        ? toPlural(field.resource.name)
                        : toSingular(field.resource.name)
                }IsLoading`;

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
                            if (field.relationGuess) {
                                if (field.relationGuess?.accessor) {
                                    if (
                                        Array.isArray(
                                            field.relationGuess.accessor,
                                        )
                                    ) {
                                        return `Not Handled.`;
                                        // return `{${multipleAccessor(
                                        //     `${variableName}?.data`,
                                        //     field.relationGuess.accessor,
                                        // ).join(' + " " + ')}}`;
                                    } else {
                                        imports.push([
                                            "Box",
                                            "@pankod/refine-mui",
                                        ]);
                                        // return `Not Handled.`;
                                        const mapItemName = toSingular(
                                            field.resource?.name,
                                        );
                                        const val = accessor(
                                            mapItemName,
                                            undefined,
                                            field.relationGuess.accessor,
                                        );
                                        return `
                                            <Box style={{ display: "flex", gap: "1rem" }}>
                                                {${variableName}?.data?.map((${mapItemName}) => (
                                                    <TagField key={${val}} value={${val}} />
                                                ))}
                                            </Box>
                                        `;
                                    }
                                } else {
                                    return `Not Handled.`;
                                    return `{${variableName}?.data}`;
                                }
                            } else {
                                return `not-handled - relation with multiple but no resource`;
                            }
                        })()}
                        </>
                    )}
                    `;
                    // {${accessorString(variableName, {
                    //     key: field.key,
                    // })}?.map((item) => (
                    //     <TagField value={${
                    //         field.accessor ? `item?.${field.accessor}` : `item`
                    //     }} key={${
                    //     field.accessor ? `item?.${field.accessor}` : `item`
                    // }} />
                    // ))}
                    // `;
                }
                return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    {${variableIsLoading} ? (
                        <p>
                            Loading...
                        </p>
                    ) : (
                        <>

                        ${(() => {
                            if (field.relationGuess) {
                                if (field.relationGuess?.accessor) {
                                    if (
                                        Array.isArray(
                                            field.relationGuess.accessor,
                                        )
                                    ) {
                                        return `{${accessor(
                                            `${variableName}?.data`,
                                            undefined,
                                            field.relationGuess.accessor,
                                            ' + " " + ',
                                        )}}`;
                                    } else {
                                        return `{${variableName}?.data?.${field.relationGuess.accessor}}`;
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

        const textFields = (field: GuessField) => {
            if (field.type === "text") {
                imports.push(
                    ["TagField", "@pankod/refine-mui"],
                    ["TextFieldComponent as TextField", "@pankod/refine-mui"],
                );
                if (field.multiple) {
                    imports.push(["Box", "@pankod/refine-mui"]);
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <Box style={{ display: "flex", gap: "1rem" }}>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </Box>
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

        const imageFields = (field: GuessField) => {
            if (field.type === "image") {
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <img style={{ maxWidth: 200, width: "100%", height: 200 }} src={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    {JSON.stringify(${accessor(recordName, field.key)})}
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

        const emailFields = (field: GuessField) => {
            if (field.type === "email") {
                imports.push(
                    ["TagField", "@pankod/refine-mui"],
                    ["EmailField", "@pankod/refine-mui"],
                );
                if (field.multiple) {
                    imports.push(["Box", "@pankod/refine-mui"]);
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <Box style={{ display: "flex", gap: "1rem" }}>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </Box>
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

        const urlFields = (field: GuessField) => {
            if (field.type === "url") {
                imports.push(
                    ["TagField", "@pankod/refine-mui"],
                    ["UrlField", "@pankod/refine-mui"],
                );
                if (field.multiple) {
                    imports.push(["Box", "@pankod/refine-mui"]);
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <Box style={{ display: "flex", gap: "1rem" }}>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </Box>
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

        const booleanFields = (field: GuessField) => {
            if (field.type === "boolean") {
                imports.push(
                    ["TagField", "@pankod/refine-mui"],
                    ["BooleanField", "@pankod/refine-mui"],
                );
                if (field.multiple) {
                    imports.push(["Box", "@pankod/refine-mui"]);

                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <Box style={{ display: "flex", gap: "1rem" }}>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </Box>
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

        const dateFields = (field: GuessField) => {
            if (field.type === "date") {
                imports.push(["DateField", "@pankod/refine-mui"]);
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <DateField value={${val}} key={${val}} />
                    ))}
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

        const richtextFields = (field: GuessField) => {
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

        const numberFields = (field: GuessField) => {
            if (field.type === "number") {
                imports.push(["NumberField", "@pankod/refine-mui"]);
                if (field.multiple) {
                    imports.push(["Box", "@pankod/refine-mui"]);
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Typography variant="body1" fontWeight="bold">
                        ${prettyString(field.key)}
                    </Typography>
                    <Box style={{ display: "flex", gap: "1rem" }}>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </Box>
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

        return jsx`
        ${printImports(imports)}

        export const ${COMPONENT_NAME} = () => {
            const { queryResult } = useShow();
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
