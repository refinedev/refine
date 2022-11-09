import * as RefineAntd from "@pankod/refine-antd";
import dayjs from "dayjs";

import { createGuesser } from "@/create-guesser";
import {
    jsx,
    componentName,
    prettyString,
    accessor,
    printImports,
    toPlural,
    toSingular,
    isIDKey,
} from "@/utilities";

import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { CodeViewerComponent } from "./code-viewer";

import { GuessField } from "@/types";

/**
 * @experimental This is an experimental component
 */
export const EditGuesser = createGuesser({
    type: "edit",
    additionalScope: [
        ["@pankod/refine-antd", "RefineAntd", RefineAntd],
        ["dayjs", "dayjs", dayjs, true],
    ],
    codeViewerComponent: CodeViewerComponent,
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    renderer: ({ resource, fields }) => {
        const COMPONENT_NAME = componentName(resource.name, "edit");
        const recordName = `${toSingular(resource.name)}Data`;
        const imports: Array<
            [element: string, module: string, isDefaultImport?: boolean]
        > = [
            ["Edit", "@pankod/refine-antd"],
            ["Form", "@pankod/refine-antd"],
            ["useForm", "@pankod/refine-antd"],
            ["Input", "@pankod/refine-antd"],
        ];

        const relationFields: (GuessField | null)[] = fields.filter(
            (field) => field?.relation && !field?.fieldable && field?.resource,
        );

        const relationHooksCode = relationFields
            .filter(Boolean)
            .map((field) => {
                if (field?.relation && !field.fieldable && field.resource) {
                    imports.push(["useSelect", "@pankod/refine-antd"]);
                    return `
                    const { selectProps: ${
                        field.multiple
                            ? toPlural(field.resource.name)
                            : toSingular(field.resource.name)
                    }SelectProps } =
                    useSelect({
                        resource: "${field.resource.name}",
                        defaultValue: ${accessor(
                            recordName,
                            field.key,
                            field.accessor,
                            false,
                        )},
                    });
                `;
                }
                return undefined;
            })
            .filter(Boolean);

        const renderRelationFields = (field: GuessField) => {
            if (field.relation && field.resource) {
                imports.push(["Select", "@pankod/refine-antd"]);
                const variableName = `${
                    field.multiple
                        ? toPlural(field.resource.name)
                        : toSingular(field.resource.name)
                }SelectProps`;

                return jsx`
                    <Form.Item
                        label="${prettyString(field.key)}"
                        name={["${field.key}"${
                    field.accessor ? ', "' + field.accessor + '"' : ""
                }]}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select ${
                            field.multiple ? 'mode="multiple"' : ""
                        } {...${variableName}} />
                    </Form.Item>             
                    `;
            }
            return undefined;
        };

        const textFields = (field: GuessField) => {
            if (field.type === "text") {
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
                    <Form.Item
                        label="${prettyString(field.key)}"
                        name="${field.key}"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input ${
                            isIDKey(field.key) ? "readOnly disabled" : ""
                        } />
                    </Form.Item>
                `;
            }
            return undefined;
        };

        const imageFields = (field: GuessField) => {
            if (field.type === "image") {
                imports.push(
                    ["Upload", "@pankod/refine-antd"],
                    ["getValueFromEvent", "@pankod/refine-antd"],
                );
                return jsx`
                    <Form.Item label="${prettyString(field.key)}">
                        <Form.Item
                            name="${field.key}"
                            valuePropName="fileList"
                            getValueFromEvent={getValueFromEvent}
                            noStyle
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Upload.Dragger
                                listType="picture"
                                ${field.multiple ? "multiple" : ""}
                                beforeUpload={() => false}
                            >
                                <p className="ant-upload-text">
                                    Drag & drop a file in this area
                                </p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
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
                <Form.Item
                    label="${prettyString(field.key)}"
                    name="${field.key}"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type="email" />
                </Form.Item>
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
                    <Form.Item
                        label="${prettyString(field.key)}"
                        name="${field.key}"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input type="url" />
                    </Form.Item>
                `;
            }
            return undefined;
        };

        const booleanFields = (field: GuessField) => {
            if (field.type === "boolean") {
                imports.push(["Checkbox", "@pankod/refine-antd"]);
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
                    <Form.Item
                        label="${prettyString(field.key)}"
                        name="${field.key}"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Checkbox>${prettyString(field.key)}</Checkbox>
                    </Form.Item>
                `;
            }
            return undefined;
        };

        const dateFields = (field: GuessField) => {
            if (field.type === "date") {
                imports.push(
                    ["DatePicker", "@pankod/refine-antd"],
                    ["dayjs", "dayjs", true],
                );
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
                    <Form.Item
                        label="${prettyString(field.key)}"
                        name="${field.key}"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        getValueProps={(value) => ({ value: dayjs(value) })}
                    >
                        <DatePicker />
                    </Form.Item>
                `;
            }
            return undefined;
        };

        const richtextFields = (field: GuessField) => {
            if (field.type === "richtext") {
                return jsx`
                <Form.Item
                    label="${prettyString(field.key)}"
                    name="${field.key}"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea rows={5} />
                </Form.Item>
                `;
            }

            return undefined;
        };

        const numberFields = (field: GuessField) => {
            if (field.type === "number") {
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
                <Form.Item
                    label="${prettyString(field.key)}"
                    name="${field.key}"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type="number" ${
                        isIDKey(field.key) ? "readOnly disabled" : ""
                    } />
                </Form.Item>
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

        return jsx`
        ${printImports(imports)}
        
        export const ${COMPONENT_NAME} = () => {
            const { formProps, saveButtonProps, queryResult } = useForm();
        
            const ${recordName} = queryResult?.data?.data;
        
            ${relationHooksCode}

            return (
                <Edit saveButtonProps={saveButtonProps}>
                    <Form {...formProps} layout="vertical">
                        ${renderedFields.join("")}
                    </Form>
                </Edit>
            );
        };
        `;
    },
});
