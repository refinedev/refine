import * as RefineMui from "@pankod/refine-mui";
import * as RefineReactHookForm from "@pankod/refine-react-hook-form";
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
        ["@pankod/refine-mui", "RefineMui", RefineMui],
        [
            "@pankod/refine-react-hook-form",
            "RefineReactHookForm",
            RefineReactHookForm,
        ],
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
            ["Edit", "@pankod/refine-mui"],
            ["Box", "@pankod/refine-mui"],
            ["useForm", "@pankod/refine-react-hook-form"],
        ];

        const relationFields: (GuessField | null)[] = fields.filter(
            (field) => field?.relation && !field?.fieldable && field?.resource,
        );

        const relationHooksCode = relationFields
            .filter(Boolean)
            .map((field) => {
                if (field?.relation && !field.fieldable && field.resource) {
                    imports.push(["useAutocomplete", "@pankod/refine-mui"]);
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
                    const { autocompleteProps: ${
                        field.multiple
                            ? toPlural(field.resource.name)
                            : toSingular(field.resource.name)
                    }AutocompleteProps } =
                    useAutocomplete({
                        resource: "${field.resource.name}",
                        defaultValue: ${val},
                    });
                `;
                }
                return undefined;
            })
            .filter(Boolean);

        const renderRelationFields = (field: GuessField) => {
            if (field.relation && field.resource) {
                imports.push(
                    ["Autocomplete", "@pankod/refine-mui"],
                    ["Controller", "@pankod/refine-react-hook-form"],
                );
                const variableName = `${
                    field.multiple
                        ? toPlural(field.resource.name)
                        : toSingular(field.resource.name)
                }AutocompleteProps`;

                const optionLabelProperty = field.relationGuess
                    ? field.relationGuess.accessor
                        ? typeof field.relationGuess.accessor === "string"
                            ? field.relationGuess.accessor
                            : field.relationGuess.accessor[0]
                        : "title"
                    : "title";

                // check optionLabelProperty can be accessed via dot notation
                const isBracketNotation =
                    optionLabelProperty.includes(".") ||
                    optionLabelProperty.includes("[") ||
                    optionLabelProperty.includes("]") ||
                    optionLabelProperty.includes("-");

                return jsx`
                    <Controller
                        control={control}
                        name="${dotAccessor(field.key, undefined)}"
                        rules={{ required: "This field is required" }}
                        // eslint-disable-next-line
                        ${
                            field.multiple
                                ? "defaultValue={[] as any}"
                                : "defaultValue={null as any}"
                        } 
                        render={({ field }) => (
                            <Autocomplete
                                {...${variableName}}
                                {...field}
                                ${field.multiple ? "multiple" : ""}
                                onChange={(_, value) => {
                                    field.onChange(value);
                                }}
                                getOptionLabel={(item) => {
                                    return (
                                        ${variableName}?.options?.find(
                                            (p) =>
                                                p?.id?.toString() ===
                                                ${accessor(
                                                    "item",
                                                    undefined,
                                                    field.accessor,
                                                    false,
                                                )}.toString(),
                                        )?.${
                                            isBracketNotation
                                                ? `["${optionLabelProperty}"]`
                                                : optionLabelProperty
                                        } ?? ""
                                    );
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    value === undefined ||
                                    option.id.toString() === value.toString()
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="${prettyString(field.key)}"
                                        margin="normal"
                                        variant="outlined"
                                        error={!!${accessor(
                                            "errors",
                                            field.key,
                                            field.accessor,
                                            false,
                                        )}}
                                        helperText={${accessor(
                                            "errors",
                                            field.key,
                                            field.accessor,
                                            false,
                                        )}?.message}
                                        required
                                    />
                                )}
                            />
                        )}
                    />
                `;
            }
            return undefined;
        };

        const basicInputFields = (field: GuessField) => {
            if (
                field.type === "text" ||
                field.type === "url" ||
                field.type === "email" ||
                field.type === "number" ||
                field.type === "date" ||
                field.type === "richtext"
            ) {
                imports.push(["TextField", "@pankod/refine-mui"]);
                if (field.multiple) {
                    const val = dotAccessor(
                        field.key,
                        undefined,
                        field.accessor,
                    );

                    return `
                        <>
                            {${accessor(
                                recordName,
                                field.key,
                            )}?.map((item, index) => (
                                <TextField
                                    {...register(\`${val}.\${index}\`, {
                                        required: "This field is required",
                                    })}
                                    error={!!${accessor(
                                        "errors",
                                        field.key,
                                        field.accessor,
                                        false,
                                    )}?.[index]}
                                    helperText={${accessor(
                                        "errors",
                                        field.key,
                                        field.accessor,
                                        false,
                                    )}?.[index]?.message}
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    ${
                                        field.type !== "date" &&
                                        field.type !== "richtext"
                                            ? `type="${field.type}"`
                                            : ""
                                    }
                                    ${
                                        field.type === "richtext"
                                            ? "multiline"
                                            : ""
                                    }
                                    label={\`${prettyString(
                                        field.key,
                                    )} \${index+1}\`}
                                    name={\`${dotAccessor(
                                        field.key,
                                        undefined,
                                        field.accessor,
                                    )}.\${index}\`}
                                />
                            ))}
                        </>
                    `;
                }
                return jsx`
                    <TextField
                        {...register("${dotAccessor(
                            field.key,
                            undefined,
                            field.accessor,
                        )}", {
                            required: "This field is required",
                        })}
                        error={!!${accessor(
                            "errors",
                            field.key,
                            field.accessor,
                            false,
                        )}}
                        helperText={${accessor(
                            "errors",
                            field.key,
                            field.accessor,
                            false,
                        )}?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        ${
                            field.type !== "date" && field.type !== "richtext"
                                ? `type="${field.type}"`
                                : ""
                        }
                        ${field.type === "richtext" ? "multiline" : ""}
                        label="${prettyString(field.key)}"
                        name="${dotAccessor(
                            field.key,
                            undefined,
                            field.accessor,
                        )}"
                        ${isIDKey(field.key) ? "disabled" : ""}
                    />
                `;
            }
            return undefined;
        };

        const booleanFields = (field: GuessField) => {
            if (field.type === "boolean") {
                imports.push(
                    ["Checkbox", "@pankod/refine-mui"],
                    ["FormControlLabel", "@pankod/refine-mui"],
                    ["Controller", "@pankod/refine-react-hook-form"],
                );

                if (field.multiple) {
                    const val = dotAccessor(
                        field.key,
                        undefined,
                        field.accessor,
                    );

                    return `
                        <>
                            {${accessor(
                                recordName,
                                field.key,
                            )}?.map((item, index) => (
                                <Controller
                                    control={control}
                                    name={\`${val}.\${index}\`}
                                    // eslint-disable-next-line
                                    defaultValue={null as any}
                                    render={({ field }) => (
                                        <FormControlLabel label={\`${prettyString(
                                            field.key,
                                        )} \${index+1}\`} control={
                                            <Checkbox
                                                {...field}
                                                label
                                                checked={field.value}
                                                onChange={(event) => {
                                                    field.onChange(event.target.checked);
                                                }}
                                            />
                                        } />
                                    )}
                                />
                            ))}
                        </>
                    `;
                }

                return jsx`
                    <Controller
                        control={control}
                        name="${dotAccessor(
                            field.key,
                            undefined,
                            field.accessor,
                        )}"
                        // eslint-disable-next-line
                        defaultValue={null as any}
                        render={({ field }) => (
                            <FormControlLabel label="${prettyString(
                                field.key,
                            )}" control={
                                <Checkbox
                                    {...field}
                                    label
                                    checked={field.value}
                                    onChange={(event) => {
                                        field.onChange(event.target.checked);
                                    }}
                                />
                            } />
                        )}
                    />
                `;
            }
            return undefined;
        };

        const dateFields = (field: GuessField) => {
            if (field.type === "date") {
                const basicRender = basicInputFields(field);

                return `
                    {/* 
                        DatePicker component is not included in "@pankod/refine-mui" package.
                        To use a <DatePicker> component, you can follow the official documentation for Material UI.
                        
                        Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
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

        return jsx`
        ${printImports(imports)}
        
        export const ${COMPONENT_NAME} = () => {
            const {
                saveButtonProps,
                ${
                    relationFields?.length > 0
                        ? "refineCore: { queryResult },"
                        : ""
                }
                register,
                control,
                formState: { errors },
            } = useForm();
        
            const ${recordName} = queryResult?.data?.data;
        
            ${relationHooksCode}

            return (
                <Edit saveButtonProps={saveButtonProps}>
                    <Box
                        component="form"
                        sx={{ display: "flex", flexDirection: "column" }}
                        autoComplete="off"
                    >
                        ${renderedFields.join("")}
                    </Box>
                </Edit>
            );
        };
        `;
    },
});
