import * as RefineChakraUI from "@pankod/refine-chakra-ui";

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

import { InferencerResultComponent, InferField } from "@/types";

/**
 * @experimental This is an experimental component
 */
export const ShowInferencer: InferencerResultComponent = createInferencer({
    type: "show",
    additionalScope: [
        ["@pankod/refine-chakra-ui", "RefineChakraUI", RefineChakraUI],
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
            ["Show", "@pankod/refine-chakra-ui"],
            ["Heading", "@pankod/refine-chakra-ui"],
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
                        ["TagField", "@pankod/refine-chakra-ui"],
                        ["HStack", "@pankod/refine-chakra-ui"],
                    );
                    return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
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
                                        // return `{${multipleAccessor(
                                        //     `${variableName}?.data`,
                                        //     field.relationInfer.accessor,
                                        // ).join(' + " " + ')}}`;
                                    } else {
                                        // return `Not Handled.`;
                                        const mapItemName = getVariableName(
                                            field.key,
                                        );
                                        const val = accessor(
                                            mapItemName,
                                            undefined,
                                            field.relationInfer.accessor,
                                        );
                                        return `<HStack spacing="12px">{${variableName}?.data?.map((${mapItemName}: any) => <TagField key={${val}} value={${val}} />)}</HStack>`;
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
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
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
                imports.push(
                    ["TagField", "@pankod/refine-chakra-ui"],
                    ["TextField", "@pankod/refine-chakra-ui"],
                    ["HStack", "@pankod/refine-chakra-ui"],
                );
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
                    <HStack spacing="12px">
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </HStack>
                `;
                }
                return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
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
                imports.push(["Image", "@pankod/refine-chakra-ui"]);
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <Image sx={{ maxWidth: 200 }} src={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
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
                imports.push(
                    ["TagField", "@pankod/refine-chakra-ui"],
                    ["EmailField", "@pankod/refine-chakra-ui"],
                    ["HStack", "@pankod/refine-chakra-ui"],
                );
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
                    <HStack spacing="12px">
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </HStack>
                `;
                }
                return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
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
                imports.push(
                    ["TagField", "@pankod/refine-chakra-ui"],
                    ["UrlField", "@pankod/refine-chakra-ui"],
                    ["HStack", "@pankod/refine-chakra-ui"],
                );
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
                    <HStack spacing="12px">
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </HStack>
                `;
                }
                return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
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
                imports.push(
                    ["TagField", "@pankod/refine-chakra-ui"],
                    ["BooleanField", "@pankod/refine-chakra-ui"],
                    ["HStack", "@pankod/refine-chakra-ui"],
                );
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
                    <HStack spacing="12px">
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </HStack>
                `;
                }
                return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
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
                imports.push(["DateField", "@pankod/refine-chakra-ui"]);
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <DateField value={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
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
                imports.push(["MarkdownField", "@pankod/refine-chakra-ui"]);
                return jsx`
                    <Heading as="h5" size="sm" mt={4}>${prettyString(
                        field.key,
                    )}</Heading>
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
                imports.push(
                    ["NumberField", "@pankod/refine-chakra-ui"],
                    ["TagField", "@pankod/refine-chakra-ui"],
                    ["HStack", "@pankod/refine-chakra-ui"],
                );
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
                    <HStack spacing="12px">
                    {${accessor(recordName, field.key)}?.map((item: any) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                    </HStack>
                `;
                }
                return jsx`
                    <Heading as="h5" size="sm" mt={4} >${prettyString(
                        field.key,
                    )}</Heading>
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
