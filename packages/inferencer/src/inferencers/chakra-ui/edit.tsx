import * as RefineCore from "@pankod/refine-core";
import * as RefineChakraUI from "@pankod/refine-chakra-ui";
import * as RefineReactHookForm from "@pankod/refine-react-hook-form";

import { createInferencer } from "@/create-inferencer";
import {
    jsx,
    componentName,
    prettyString,
    accessor,
    printImports,
    toSingular,
    isIDKey,
    dotAccessor,
    getOptionLabel,
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
export const EditInferencer: InferencerResultComponent = createInferencer({
    type: "edit",
    additionalScope: [
        ["@pankod/refine-core", "RefineCore", RefineCore],
        ["@pankod/refine-chakra-ui", "RefineChakraUI", RefineChakraUI],
        [
            "@pankod/refine-react-hook-form",
            "RefineReactHookForm",
            RefineReactHookForm,
        ],
    ],
    codeViewerComponent: CodeViewerComponent,
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    renderer: ({ resource, fields, isCustomPage, id }) => {
        const COMPONENT_NAME = componentName(
            resource.label ?? resource.name,
            "edit",
        );
        const recordName = getVariableName(
            resource.label ?? resource.name,
            "Data",
        );
        const imports: Array<ImportElement> = [
            ["React", "react", true],
            ["Edit", "@pankod/refine-chakra-ui"],
            ["FormControl", "@pankod/refine-chakra-ui"],
            ["FormLabel", "@pankod/refine-chakra-ui"],
            ["FormErrorMessage", "@pankod/refine-chakra-ui"],
            ["useForm", "@pankod/refine-react-hook-form"],
        ];

        const relationFields: (InferField | null)[] = fields.filter(
            (field) => field?.relation && !field?.fieldable && field?.resource,
        );

        const relationHooksCode = relationFields
            .filter(Boolean)
            .map((field) => {
                if (field?.relation && !field.fieldable && field.resource) {
                    imports.push(["useSelect", "@pankod/refine-core"]);
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
                        )}?.map((item: any) => ${accessor(
                            "item",
                            undefined,
                            field.accessor,
                        )})`;
                    }

                    return `
                    const { options: ${getVariableName(
                        field.key,
                        "Options",
                    )} } =
                    useSelect({
                        resource: "${field.resource.name}",
                        defaultValue: ${val},
                        ${getOptionLabel(field)}
                    });

                    React.useEffect(() => {
                        resetField("${dotAccessor(
                            field.key,
                            undefined,
                            field.accessor,
                        )}");
                    }, [${getVariableName(field.key, "Options")}]);
                `;
                }
                return undefined;
            })
            .filter(Boolean);

        const renderRelationFields = (field: InferField) => {
            if (field.relation && field.resource) {
                imports.push(["useSelect", "@pankod/refine-core"]);
                imports.push(["Select", "@pankod/refine-chakra-ui"]);

                const variableName = getVariableName(field.key, "Options");

                return jsx`
                <FormControl mb="3" isInvalid={!!errors?.${dotAccessor(
                    field.key,
                    undefined,
                )}}>
                    <FormLabel>${prettyString(field.key)}</FormLabel>
                    <Select
                        placeholder="Select ${toSingular(field.resource.name)}"
                        {...register("${dotAccessor(
                            field.key,
                            undefined,
                            field.accessor,
                        )}", {
                            required: "This field is required",
                        })}
                    >
                        {${variableName}?.map((option) => (
                            <option value={option.value} key={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                    <FormErrorMessage>
                        {${accessor(
                            "(errors as any)",
                            field.key,
                            field.accessor,
                            false,
                        )}?.message as string}
                    </FormErrorMessage>
                </FormControl>
                `;
            }
            return undefined;
        };

        const basicInputFields = (field: InferField) => {
            if (
                field.type === "text" ||
                field.type === "url" ||
                field.type === "email" ||
                field.type === "number" ||
                field.type === "date" ||
                field.type === "richtext"
            ) {
                imports.push(["Input", "@pankod/refine-chakra-ui"]);
                if (field.multiple) {
                    const val = dotAccessor(
                        field.key,
                        "${index}",
                        field.accessor,
                    );

                    const valError = accessor(
                        accessor(
                            "(errors as any)",
                            field.key,
                            undefined,
                            false,
                        ) + "?.[index]",
                        undefined,
                        field.accessor,
                    );

                    return `
                        <>
                            {${accessor(
                                recordName,
                                field.key,
                            )}?.map((item: any, index: number) => (
                                <FormControl key={index} mb="3" isInvalid={!!${valError}}>
                                    <FormLabel>${prettyString(
                                        field.key,
                                    )} #{index + 1}</FormLabel>
                                    <Input
                                        {...register(\`${val}\`, {
                                            required: "This field is required",
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {${accessor(
                                            valError,
                                            "message",
                                        )} as string}
                                    </FormErrorMessage>
                                </FormControl>
                            ))}
                        </>
                    `;
                }
                return jsx`
                    <FormControl mb="3" isInvalid={!!${accessor(
                        "(errors as any)",
                        field.key,
                        field.accessor,
                        false,
                    )}}>
                        <FormLabel>${prettyString(field.key)}</FormLabel>
                        <Input
                            ${isIDKey(field.key) ? "disabled" : ""}
                            ${
                                field.type !== "date" &&
                                field.type !== "richtext"
                                    ? `type="${field.type}"`
                                    : ""
                            }
                            {...register("${dotAccessor(
                                field.key,
                                undefined,
                                field.accessor,
                            )}", {
                                required: "This field is required",
                            })}
                        />
                        <FormErrorMessage>
                            {${accessor(
                                "(errors as any)",
                                field.key,
                                field.accessor,
                                false,
                            )}?.message as string}
                        </FormErrorMessage>
                    </FormControl>
                `;
            }
            return undefined;
        };

        const booleanFields = (field: InferField) => {
            if (field.type === "boolean") {
                imports.push(["Checkbox", "@pankod/refine-chakra-ui"]);

                if (field.multiple) {
                    const val = dotAccessor(
                        field.key,
                        undefined,
                        field.accessor,
                    );

                    const errorVal =
                        accessor(
                            "(errors as any)",
                            field.key,
                            undefined,
                            false,
                        ) + "?.[index]";

                    return `
                        <>
                            {${accessor(
                                recordName,
                                field.key,
                            )}?.map((item: any, index: number) => (
                                <FormControl key={index} mb="3" isInvalid={!!${errorVal}}>
                                    <FormLabel>${prettyString(
                                        field.key,
                                    )} #{index + 1}</FormLabel>
                                    <Checkbox
                                        {...register(\`${val}.\${index}\`, {
                                            required: "This field is required",
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {${errorVal}?.message as string}
                                    </FormErrorMessage>
                                </FormControl>
                            ))}
                        </>
                    `;
                }

                return jsx`
                    <FormControl mb="3" isInvalid={!!${accessor(
                        "errors",
                        field.key,
                        field.accessor,
                        false,
                    )}}>
                        <FormLabel>${prettyString(field.key)}</FormLabel>
                        <Checkbox
                            {...register("${dotAccessor(
                                field.key,
                                undefined,
                                field.accessor,
                            )}", {
                                required: "This field is required",
                            })}
                        />
                        <FormErrorMessage>
                            {${accessor(
                                "errors",
                                field.key,
                                field.accessor,
                                false,
                            )}?.message as string}
                        </FormErrorMessage>
                    </FormControl>
                   
                `;
            }
            return undefined;
        };

        const dateFields = (field: InferField) => {
            if (field.type === "date") {
                const basicRender = basicInputFields(field);

                return `
                    {/* 
                        DatePicker component is not included in "@pankod/refine-chakra-ui" package.
                        To use a <DatePicker> component, you can examine the following links:
                        
                        - https://github.com/aboveyunhai/chakra-dayzed-datepicker
                        - https://github.com/wojtekmaj/react-date-picker
                    */}
                    ${basicRender}
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
                    case "richtext":
                        return basicInputFields(field);
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

        noOp(imports);

        return jsx`
        ${printImports(imports)}
        
        export const ${COMPONENT_NAME} = () => {
            const {
                refineCore: { formLoading, queryResult },
                saveButtonProps,
                register,
                resetField,
                formState: { errors },
            } = useForm(
                ${
                    isCustomPage
                        ? `
                { 
                    refineCoreProps: {
                        resource: "${resource.name}",
                        id: ${id},
                        action: "edit",
                    }
                }`
                        : ""
                }
            );
        
            const ${recordName} = queryResult?.data?.data;
        
            ${relationHooksCode}

            return (
                <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
                    ${renderedFields.join("")}
                </Edit>
            );
        };
        `;
    },
});
