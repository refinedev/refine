import * as RefineAntd from "@pankod/refine-antd";

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

import { GuessField } from "@/types";

/**
 * @experimental This is an experimental component
 */
export const ShowGuesser = createGuesser({
    type: "show",
    additionalScope: [["@pankod/refine-antd", "RefineAntd", RefineAntd]],
    codeViewerComponent: CodeViewerComponent,
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    renderer: ({ resource, fields }) => {
        const COMPONENT_NAME = componentName(resource.name, "show");
        const recordName = "record";
        const imports: Array<[element: string, module: string]> = [
            ["useShow", "@pankod/refine-core"],
            ["Show", "@pankod/refine-antd"],
            ["Typography", "@pankod/refine-antd"],
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
                    imports.push(["TagField", "@pankod/refine-antd"]);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${variableIsLoading} ? <>Loading...</> : (
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
                                        // return `Not Handled.`;
                                        const mapItemName = toSingular(
                                            field.resource?.name,
                                        );
                                        const val = accessor(
                                            mapItemName,
                                            undefined,
                                            field.relationGuess.accessor,
                                        );
                                        return `{${variableName}?.data?.map((${mapItemName}) => <TagField key={${val}} value={${val}} />)}`;
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
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${variableIsLoading} ? <>Loading...</> : (
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
                    ["TagField", "@pankod/refine-antd"],
                    ["TextField", "@pankod/refine-antd"],
                );
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
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
                imports.push(["ImageField", "@pankod/refine-antd"]);
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <ImageField style={{ maxWidth: 200 }} value={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {JSON.stringify(${accessor(recordName, field.key)})}
                    <ImageField style={{ maxWidth: 200 }} value={${accessor(
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
                    ["TagField", "@pankod/refine-antd"],
                    ["EmailField", "@pankod/refine-antd"],
                );
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
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
                    ["TagField", "@pankod/refine-antd"],
                    ["UrlField", "@pankod/refine-antd"],
                );
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
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
                    ["TagField", "@pankod/refine-antd"],
                    ["BooleanField", "@pankod/refine-antd"],
                );
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
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
                imports.push(["DateField", "@pankod/refine-antd"]);
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <DateField value={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
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
                imports.push(["MarkdownField", "@pankod/refine-antd"]);
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
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
                imports.push(["NumberField", "@pankod/refine-antd"]);
                if (field.multiple) {
                    const val = accessor("item", undefined, field.accessor);
                    return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
                    {${accessor(recordName, field.key)}?.map((item) => (
                        <TagField value={${val}} key={${val}} />
                    ))}
                `;
                }
                return jsx`
                    <Title level={5}>${prettyString(field.key)}</Title>
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
        
        const { Title } = Typography;

        export const ${COMPONENT_NAME} = () => {
            const { queryResult } = useShow();
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
