import * as RefineMantine from "@pankod/refine-mantine";

import { createInferencer } from "@/create-inferencer";
import {
    jsx,
    componentName,
    prettyString,
    accessor,
    printImports,
    toSingular,
    noOp,
    getVariableName,
} from "@/utilities";

import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { CodeViewerComponent } from "./code-viewer";

import { InferencerResultComponent, InferField } from "@/types";

/**
 * @experimental This is an experimental component
 */
export const ShowInferencer: InferencerResultComponent = createInferencer({
    type: "show",
    additionalScope: [
        ["@pankod/refine-mantine", "RefineMantine", RefineMantine],
    ],
    codeViewerComponent: CodeViewerComponent,
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    renderer: ({ resource, fields, isCustomPage, id }) => {
        const COMPONENT_NAME = componentName(
            resource.label ?? resource.name,
            "show",
        );
        const recordName = "record";
        const imports: Array<[element: string, module: string]> = [
            ["useShow", "@pankod/refine-core"],
            ["Show", "@pankod/refine-mantine"],
            ["Title", "@pankod/refine-mantine"],
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
                    imports.push(
                        ["TagField", "@pankod/refine-mantine"],
                        ["Group", "@pankod/refine-mantine"],
                    );

                    return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
                    {${variableIsLoading} ? <>Loading...</> : (
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
                                        const mapItemName = toSingular(
                                            field.resource?.name,
                                        );
                                        const val = accessor(
                                            mapItemName,
                                            undefined,
                                            field.relationInfer.accessor,
                                        );
                                        return `
                                        <Group spacing="xs">
                                            {${variableName}?.data?.map((${mapItemName}: any) => <TagField key={${val}} value={${val}} />)}
                                        </Group>
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
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
                    {${variableIsLoading} ? <>Loading...</> : (
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
                imports.push(["TextField", "@pankod/refine-mantine"]);

                if (field.multiple) {
                    imports.push(
                        ["TagField", "@pankod/refine-mantine"],
                        ["Group", "@pankod/refine-mantine"],
                    );

                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
                    <Group spacing="xs">
                        {${accessor(
                            recordName,
                            field.key,
                        )}?.map((item: any) => (
                            <TagField value={${val}} key={${val}} />
                        ))}
                    </Group>
                `;
                }
                return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
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
                imports.push(["Image", "@pankod/refine-mantine"]);

                if (field.multiple) {
                    imports.push(["Group", "@pankod/refine-mantine"]);

                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
                    <Group spacing="xs">
                        {${accessor(
                            recordName,
                            field.key,
                        )}?.map((item: any) => (
                            <Image sx={{ maxWidth: 200 }} src={${val}} key={${val}} />
                        ))}
                    </Group>
                `;
                }
                return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
                    <Image sx={{ maxWidth: 200 }} src={${accessor(
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
                imports.push(["EmailField", "@pankod/refine-mantine"]);

                if (field.multiple) {
                    imports.push(
                        ["TagField", "@pankod/refine-mantine"],
                        ["Group", "@pankod/refine-mantine"],
                    );

                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
                    <Group spacing="xs">
                        {${accessor(
                            recordName,
                            field.key,
                        )}?.map((item: any) => (
                            <TagField value={${val}} key={${val}} />
                        ))}
                    </Group>
                `;
                }
                return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
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
                imports.push(["UrlField", "@pankod/refine-mantine"]);

                if (field.multiple) {
                    imports.push(
                        ["TagField", "@pankod/refine-mantine"],
                        ["Group", "@pankod/refine-mantine"],
                    );

                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
                    <Group spacing="xs">
                        {${accessor(
                            recordName,
                            field.key,
                        )}?.map((item: any) => (
                            <TagField value={${val}} key={${val}} />
                        ))}
                    </Group>
                `;
                }
                return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
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
                imports.push(["BooleanField", "@pankod/refine-mantine"]);

                if (field.multiple) {
                    imports.push(
                        ["TagField", "@pankod/refine-mantine"],
                        ["Group", "@pankod/refine-mantine"],
                    );

                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
                    <Group spacing="xs">
                        {${accessor(
                            recordName,
                            field.key,
                        )}?.map((item: any, index: number) => (
                            <TagField value={${val}} key={index} />
                        ))}
                    </Group>
                `;
                }
                return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
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
                imports.push(["DateField", "@pankod/refine-mantine"]);

                if (field.multiple) {
                    imports.push(["Group", "@pankod/refine-mantine"]);

                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
                    <Group spacing="xs">
                        {${accessor(
                            recordName,
                            field.key,
                        )}?.map((item: any) => (
                            <DateField value={${val}} key={${val}} />
                        ))}
                    </Group>
                `;
                }
                return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
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
                imports.push(["MarkdownField", "@pankod/refine-mantine"]);

                return jsx`
                    <Title mt="xs" order={5}>${prettyString(field.key)}</Title>
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
                imports.push(["NumberField", "@pankod/refine-mantine"]);

                if (field.multiple) {
                    imports.push(
                        ["TagField", "@pankod/refine-mantine"],
                        ["Group", "@pankod/refine-mantine"],
                    );

                    const val = accessor("item", undefined, field.accessor);

                    return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
                    <Group spacing="xs">
                        {${accessor(
                            recordName,
                            field.key,
                        )}?.map((item: any) => (
                            <TagField value={${val}} key={${val}} />
                        ))}
                    </Group>
                `;
                }
                return jsx`
                    <Title my="xs" order={5}>${prettyString(field.key)}</Title>
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

        const wrapper = (code?: string) => {
            if (code) {
                return jsx`
                    ${code}
                `;
            }
            return undefined;
        };

        const renderedFields: Array<string | undefined> = fields.map(
            (field) => {
                switch (field?.type) {
                    case "text":
                        return wrapper(textFields(field));
                    case "number":
                        return wrapper(numberFields(field));
                    case "richtext":
                        return wrapper(richtextFields(field));
                    case "email":
                        return wrapper(emailFields(field));
                    case "image":
                        return wrapper(imageFields(field));
                    case "date":
                        return wrapper(dateFields(field));
                    case "boolean":
                        return wrapper(booleanFields(field));
                    case "url":
                        return wrapper(urlFields(field));
                    case "relation":
                        return wrapper(renderRelationFields(field));
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
                    ${renderedFields.join("")}
                </Show>
            );
        };
        `;
    },
});
