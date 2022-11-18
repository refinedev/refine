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

import { GuesserResultComponent, GuessField, ImportElement } from "@/types";

/**
 * @experimental This is an experimental component
 */
export const EditGuesser: GuesserResultComponent = createGuesser({
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
        const imports: Array<ImportElement> = [
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

                    let val = accessor(
                        recordName,
                        field.key,
                        field.accessor,
                        false,
                    );

                    if (field.multiple && field.accessor) {
                        val = `${accessor(
                            recordName,
                            field.key,
                        )}?.map((item) => ${accessor(
                            "item",
                            undefined,
                            field.accessor,
                        )})`;
                    }

                    return `
                    const { selectProps: ${
                        field.multiple
                            ? toPlural(field.resource.name)
                            : toSingular(field.resource.name)
                    }SelectProps } =
                    useSelect({
                        resource: "${field.resource.name}",
                        defaultValue: ${val},
                        ${
                            field.relationGuess
                                ? field.relationGuess.accessor
                                    ? typeof field.relationGuess.accessor ===
                                      "string"
                                        ? field.relationGuess.accessor !==
                                          "title"
                                            ? `optionLabel: "${field.relationGuess.accessor}",`
                                            : ""
                                        : `optionLabel: "${field.relationGuess.accessor[0]}",`
                                    : ""
                                : ""
                        }
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

        const basicInputFields = (field: GuessField) => {
            if (
                field.type === "text" ||
                field.type === "url" ||
                field.type === "email" ||
                field.type === "number"
            ) {
                if (field.multiple) {
                    const val = accessor(field.key, undefined, field.accessor)
                        .split("?.")
                        .map((el) => `"${el}"`)
                        .join(", ");

                    return `
                        <>
                            {${accessor(
                                recordName,
                                field.key,
                            )}?.map((item, index) => (
                                <Form.Item
                                    key={index}
                                    label={\`${prettyString(
                                        field.key,
                                    )} \${index+1}\`}
                                    name={[${val}, index]}
                                >
                                    <Input
                                        type="${field.type}"
                                    ${
                                        isIDKey(field.key)
                                            ? "readOnly disabled"
                                            : ""
                                    } />
                                </Form.Item>
                            ))}
                        </>
                    `;
                }
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

        const booleanFields = (field: GuessField) => {
            if (field.type === "boolean") {
                imports.push(["Checkbox", "@pankod/refine-antd"]);

                if (field.multiple) {
                    const val = accessor(field.key, undefined, field.accessor)
                        .split("?.")
                        .map((el) => `"${el}"`)
                        .join(", ");

                    return `
                        <>
                            {${accessor(
                                recordName,
                                field.key,
                            )}?.map((item, index) => (
                                <Form.Item
                                    key={index}
                                    label={\`${prettyString(
                                        field.key,
                                    )} \${index+1}\`}
                                    name={[${val}, index]}
                                >
                                    <Checkbox>${prettyString(
                                        field.key,
                                    )}</Checkbox>
                                </Form.Item>
                            ))}
                        </>
                    `;
                }
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
                    const val = accessor(field.key, undefined, field.accessor)
                        .split("?.")
                        .map((el) => `"${el}"`)
                        .join(", ");

                    return `
                        <>
                            {${accessor(
                                recordName,
                                field.key,
                            )}?.map((item, index) => (
                                <Form.Item
                                    key={index}
                                    label={\`${prettyString(
                                        field.key,
                                    )} \${index+1}\`}
                                    name={[${val}, index]}
                                    getValueProps={(value) => ({ value: dayjs(value) })}
                                >
                                    <DatePicker />
                                </Form.Item>
                            ))}
                        </>
                    `;
                }
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

        const renderedFields: Array<string | undefined> = fields.map(
            (field) => {
                switch (field?.type) {
                    case "text":
                    case "number":
                    case "email":
                    case "url":
                        return basicInputFields(field);
                    case "richtext":
                        return richtextFields(field);
                    case "image":
                        return imageFields(field);
                    case "date":
                        return dateFields(field);
                    case "boolean":
                        return booleanFields(field);
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
