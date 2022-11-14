import * as RefineMantine from "@pankod/refine-mantine";

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
    getOptionLabel,
    dotAccessor,
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
        ["@pankod/refine-mantine", "RefineMantine", RefineMantine],
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
            ["Edit", "@pankod/refine-mantine"],
            ["useForm", "@pankod/refine-mantine"],
        ];
        let initialValues: Record<string, any> = {};

        const relationFields: (GuessField | null)[] = fields.filter(
            (field) => field?.relation && !field?.fieldable && field?.resource,
        );

        const relationHooksCode = relationFields
            .filter(Boolean)
            .map((field) => {
                if (field?.relation && !field.fieldable && field.resource) {
                    imports.push(["useSelect", "@pankod/refine-mantine"]);
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
                        ${getOptionLabel(field)}
                    });
                `;
                }
                return undefined;
            })
            .filter(Boolean);

        const renderRelationFields = (field: GuessField) => {
            if (field.relation && field.resource) {
                initialValues = {
                    ...initialValues,
                    [field.key]: field.multiple
                        ? []
                        : field.accessor
                        ? {
                              [typeof field.accessor === "string"
                                  ? field.accessor
                                  : field.accessor[0]]: "",
                          }
                        : "",
                };

                const variableName = `${
                    field.multiple
                        ? toPlural(field.resource.name)
                        : toSingular(field.resource.name)
                }SelectProps`;

                if (field.multiple) {
                    imports.push(["MultiSelect", "@pankod/refine-mantine"]);

                    return jsx`
                        <MultiSelect mt="sm" label="${prettyString(
                            field.key,
                        )}" {...getInputProps("${dotAccessor(
                        field.key,
                        undefined,
                        field.accessor,
                    )}")} {...${variableName}} filterDataOnExactSearchMatch={undefined} />
                    `;
                }

                imports.push(["Select", "@pankod/refine-mantine"]);

                return jsx`
                    <Select mt="sm" label="${prettyString(
                        field.key,
                    )}" {...getInputProps("${dotAccessor(
                    field.key,
                    undefined,
                    field.accessor,
                )}")} {...${variableName}} />
                `;
            }
            return undefined;
        };

        const textFields = (field: GuessField) => {
            if (
                field.type === "text" ||
                field.type === "email" ||
                field.type === "url"
            ) {
                imports.push(["TextInput", "@pankod/refine-mantine"]);

                initialValues = {
                    ...initialValues,
                    [field.key]: field.multiple ? [] : "",
                };

                if (field.multiple) {
                    const val = dotAccessor(
                        field.key,
                        undefined,
                        field.accessor,
                    );

                    return `
                    {${accessor(recordName, field.key)}?.map((item, index) => (
                        <TextInput mt="sm" label="${prettyString(
                            field.key,
                        )}" {...getInputProps(\`${val}.\${index}\`)} />
                    ))}
                    `;
                }

                return jsx`
                    <TextInput mt="sm" ${
                        isIDKey(field.key) ? "disabled" : ""
                    } label="${prettyString(
                    field.key,
                )}" {...getInputProps("${dotAccessor(
                    field.key,
                    undefined,
                    field.accessor,
                )}")} />
                `;
            }
            return undefined;
        };

        const imageFields = (field: GuessField) => {
            if (field.type === "image") {
                return jsx`
                {/* 
                    Dropzone component is not included in "@pankod/refine-mantine" package.
                    To use a <Dropzone> component, you can follow the official documentation for Mantine.
                    
                    Docs: https://mantine.dev/others/dropzone/
                */}
                `;
            }
            return undefined;
        };

        const booleanFields = (field: GuessField) => {
            if (field.type === "boolean") {
                imports.push(["Checkbox", "@pankod/refine-mantine"]);

                initialValues = {
                    ...initialValues,
                    [field.key]: field.multiple ? [] : "",
                };

                if (field.multiple) {
                    const val = dotAccessor(
                        field.key,
                        undefined,
                        field.accessor,
                    );

                    return `
                    {${accessor(recordName, field.key)}?.map((item, index) => (
                        <Checkbox mt="sm" label="${prettyString(
                            field.key,
                        )}" {...getInputProps(\`${val}.\${index}\`)} />
                    ))}
                    `;
                }

                return jsx`
                    <Checkbox mt="sm" label="${prettyString(
                        field.key,
                    )}" {...getInputProps("${dotAccessor(
                    field.key,
                    undefined,
                    field.accessor,
                )}")} />
                `;
            }
            return undefined;
        };

        const dateFields = (field: GuessField) => {
            if (field.type === "date") {
                const textInputRender = textFields(field);

                return `
                    {/* 
                        DatePicker component is not included in "@pankod/refine-mantine" package.
                        To use a <DatePicker> component, you can follow the official documentation for Mantine.
                        
                        Docs: https://mantine.dev/dates/date-picker/
                    */}
                    ${textInputRender}
                `;
            }
            return undefined;
        };

        const richtextFields = (field: GuessField) => {
            if (field.type === "richtext") {
                imports.push(["Textarea", "@pankod/refine-mantine"]);

                initialValues = {
                    ...initialValues,
                    [field.key]: field.multiple ? [] : "",
                };

                if (field.multiple) {
                    const val = dotAccessor(
                        field.key,
                        undefined,
                        field.accessor,
                    );

                    return `
                    {${accessor(recordName, field.key)}?.map((item, index) => (
                        <Textarea mt="sm" label="${prettyString(
                            field.key,
                        )}" {...getInputProps(\`${val}.\${index}\`)} />
                    ))}
                    `;
                }

                return jsx`
                    <Textarea mt="sm" label="${prettyString(
                        field.key,
                    )}" autosize {...getInputProps("${dotAccessor(
                    field.key,
                    undefined,
                    field.accessor,
                )}")} />
                `;
            }

            return undefined;
        };

        const numberFields = (field: GuessField) => {
            if (field.type === "number") {
                imports.push(["NumberInput", "@pankod/refine-mantine"]);

                initialValues = {
                    ...initialValues,
                    [field.key]: field.multiple ? [] : "",
                };

                if (field.multiple) {
                    const val = dotAccessor(
                        field.key,
                        undefined,
                        field.accessor,
                    );

                    return `
                    {${accessor(recordName, field.key)}?.map((item, index) => (
                        <NumberInput mt="sm" label="${prettyString(
                            field.key,
                        )}" {...getInputProps(\`${val}.\${index}\`)} />
                    ))}
                    `;
                }

                return jsx`
                    <NumberInput mt="sm" ${
                        isIDKey(field.key) ? "disabled" : ""
                    } label="${prettyString(
                    field.key,
                )}" {...getInputProps("${dotAccessor(
                    field.key,
                    undefined,
                    field.accessor,
                )}")}/>
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
                    case "url":
                    case "text":
                    case "email":
                        return wrapper(textFields(field));
                    case "number":
                        return wrapper(numberFields(field));
                    case "richtext":
                        return wrapper(richtextFields(field));
                    case "image":
                        return wrapper(imageFields(field));
                    case "date":
                        return wrapper(dateFields(field));
                    case "boolean":
                        return wrapper(booleanFields(field));
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
            const { getInputProps, saveButtonProps, refineCore: { queryResult } } = useForm({
                initialValues: ${JSON.stringify(initialValues)},
            });
        
            const ${recordName} = queryResult?.data?.data;
        
            ${relationHooksCode}

            return (
                <Edit saveButtonProps={saveButtonProps}>
                    ${renderedFields.join("")}
                </Edit>
            );
        };
        `;
    },
});
