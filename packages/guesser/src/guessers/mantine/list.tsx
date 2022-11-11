import * as RefineMantine from "@pankod/refine-mantine";
import * as RefineReactTable from "@pankod/refine-react-table";

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
export const ListGuesser = createGuesser({
    type: "list",
    additionalScope: [
        ["@pankod/refine-mantine", "RefineMantine", RefineMantine],
        ["@pankod/refine-react-table", "RefineReactTable", RefineReactTable],
    ],
    codeViewerComponent: CodeViewerComponent,
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    renderer: ({ resource, fields }) => {
        const COMPONENT_NAME = componentName(resource.name, "list");
        const recordName = "tableData?.data";
        const imports: Array<[element: string, module: string]> = [
            ["IResourceComponentsProps", "@pankod/refine-core"],
            ["useTable", "@pankod/refine-react-table"],
            ["ColumnDef", "@pankod/refine-react-table"],
            ["flexRender", "@pankod/refine-react-table"],
            ["ScrollArea", "@pankod/refine-mantine"],
            ["List", "@pankod/refine-mantine"],
            ["Table", "@pankod/refine-mantine"],
            ["Pagination", "@pankod/refine-mantine"],
            ["Group", "@pankod/refine-mantine"],
            ["Box", "@pankod/refine-mantine"],
            ["EditButton", "@pankod/refine-mantine"],
            ["ShowButton", "@pankod/refine-mantine"],
            ["DeleteButton", "@pankod/refine-mantine"],
        ];

        const relationFields: (GuessField | null)[] = fields.filter(
            (field) => field?.relation && !field?.fieldable && field?.resource,
        );

        const relationHooksCode = relationFields
            .filter(Boolean)
            .map((field) => {
                if (field?.relation && !field.fieldable && field.resource) {
                    imports.push(["GetManyResponse", "@pankod/refine-core"]);
                    imports.push(["useMany", "@pankod/refine-core"]);

                    let idsString = "";

                    if (field.multiple) {
                        idsString = `[].concat(...(${recordName}?.map((item) => ${accessor(
                            "item",
                            field.key,
                            field.accessor,
                            false,
                        )}) ?? []))`;
                    } else {
                        idsString = `${recordName}?.map((item) => ${accessor(
                            "item",
                            field.key,
                            field.accessor,
                            false,
                        )}) ?? []`;
                    }

                    return `
                    const { data: ${toPlural(
                        field.resource.name,
                    )}Data, isLoading: ${toPlural(
                        field.resource.name,
                    )}IsLoading } =
                    useMany({
                        resource: "${field.resource.name}",
                        ids: ${idsString},
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
                const variableName = `${toPlural(
                    field.resource.name,
                )}Data?.data`;
                const variableIsLoading = `${toPlural(
                    field.resource.name,
                )}IsLoading`;

                if (Array.isArray(field.accessor)) {
                    // not handled - not possible case
                    return undefined;
                }

                const loadingCondition = `${variableIsLoading} ? <>Loading...</> : `;

                const dataIndex = field.multiple
                    ? `dataIndex="${field.key}"`
                    : `dataIndex={["${field.key}", ${
                          field.accessor ? `"${field.accessor}"` : ""
                      }]}`;

                const title = `title="${prettyString(field.key)}"`;

                let render = "";

                // if multiple, then map it with tagfield
                // if not, then just show the value

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-mantine"]);
                    let val = "item";

                    if (field?.relationGuess) {
                        const valSingle = `${variableName}?.find((resourceItems) => resourceItems.id === item)`;
                        const valViewableSingle = accessor(
                            valSingle,
                            undefined,
                            field?.relationGuess?.accessor,
                        );
                        val = valViewableSingle;
                    }

                    render = `render={(value) => ${loadingCondition} (
                        <>
                            {${accessor(
                                "value",
                                undefined,
                                field.accessor,
                            )}?.map((item, index) => (
                                <TagField key={index} value={${val}} />
                            ))}
                        </>
                    )}`;
                } else {
                    if (field?.relationGuess) {
                        const valSingle = `${variableName}?.find((item) => item.id === value)`;
                        const valViewableSingle = accessor(
                            valSingle,
                            undefined,
                            field?.relationGuess?.accessor,
                        );

                        render = `render={(value) => ${loadingCondition} ${valViewableSingle}}`;
                    } else {
                        render = "";
                    }
                }

                return jsx`<Table.Column ${dataIndex} ${title} ${render} />`;
            }
            return undefined;
        };

        const imageFields = (field: GuessField) => {
            if (field.type === "image") {
                imports.push(["ImageField", "@pankod/refine-mantine"]);

                const dataIndex =
                    Array.isArray(field.accessor) || field.multiple
                        ? `dataIndex="${field.key}"`
                        : `dataIndex={["${field.key}", ${
                              field.accessor ? `"${field.accessor}"` : ""
                          }]}`;

                const title = `title="${prettyString(field.key)}"`;

                let render = jsx`render={(value: any) => <ImageField style={{ maxWidth: "100px" }} value={${accessor(
                    "value",
                    undefined,
                    Array.isArray(field.accessor) ? field.accessor : undefined,
                    " + ",
                )}} />}`;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " + ",
                    );
                    render = jsx`render={(value: any) => (<>{value.map((item, index) => (
                        <ImageField style={{ maxWidth: "100px" }} value={${val}} key={index} />
                    ))}</>)}`;
                }

                return jsx`<Table.Column ${dataIndex} ${title} ${render} />`;
            }
            return undefined;
        };

        const emailFields = (field: GuessField) => {
            if (field.type === "email") {
                imports.push(
                    ["TagField", "@pankod/refine-mantine"],
                    ["EmailField", "@pankod/refine-mantine"],
                );
                const dataIndex =
                    Array.isArray(field.accessor) || field.multiple
                        ? `dataIndex="${field.key}"`
                        : `dataIndex={["${field.key}", ${
                              field.accessor ? `"${field.accessor}"` : ""
                          }]}`;

                const title = `title="${prettyString(field.key)}"`;

                let render = jsx`render={(value: any) => <EmailField value={${accessor(
                    "value",
                    undefined,
                    Array.isArray(field.accessor) ? field.accessor : undefined,
                    ' + " " + ',
                )}} />}`;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        ' + " " + ',
                    );
                    render = jsx`render={(value: any) => (<>{value.map((item, index) => (
                        <TagField value={${val}} key={index} />
                    ))}</>)}`;
                }

                return jsx`<Table.Column ${dataIndex} ${title} ${render} />`;
            }
            return undefined;
        };

        const urlFields = (field: GuessField) => {
            if (field.type === "url") {
                imports.push(
                    ["UrlField", "@pankod/refine-mantine"],
                    ["TagField", "@pankod/refine-mantine"],
                );

                const dataIndex =
                    Array.isArray(field.accessor) || field.multiple
                        ? `dataIndex="${field.key}"`
                        : `dataIndex={["${field.key}", ${
                              field.accessor ? `"${field.accessor}"` : ""
                          }]}`;

                const title = `title="${prettyString(field.key)}"`;

                let render = jsx`render={(value: any) => <UrlField value={${accessor(
                    "value",
                    undefined,
                    Array.isArray(field.accessor) ? field.accessor : undefined,
                    " + ",
                )}} />}`;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " + ",
                    );
                    render = jsx`render={(value: any) => (<>{value.map((item, index) => (
                        <TagField value={${val}} key={index} />
                    ))}</>)}`;
                }

                return jsx`<Table.Column ${dataIndex} ${title} ${render} />`;
            }
            return undefined;
        };

        const booleanFields = (field: GuessField) => {
            if (field?.type === "boolean") {
                imports.push(["Checkbox", "@pankod/refine-mantine"]);

                const dataIndex =
                    Array.isArray(field.accessor) || field.multiple
                        ? `dataIndex="${field.key}"`
                        : `dataIndex={["${field.key}", ${
                              field.accessor ? `"${field.accessor}"` : ""
                          }]}`;

                const title = `title="${prettyString(field.key)}"`;

                let render = jsx`render={(value: any) => <Checkbox checked={!!${accessor(
                    "value",
                    undefined,
                    Array.isArray(field.accessor) ? field.accessor : undefined,
                    " && ",
                )}} />}`;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " && ",
                    );
                    render = jsx`render={(value: any) => (<>{value.map((item, index) => (
                        <Checkbox key={!!${val}} key={index} />
                    ))}</>)}`;
                }

                return jsx`<Table.Column ${dataIndex} ${title} ${render} />`;
            }

            return undefined;
        };

        const dateFields = (field: GuessField) => {
            if (field.type === "date") {
                imports.push(["DateField", "@pankod/refine-mantine"]);

                const dataIndex =
                    Array.isArray(field.accessor) || field.multiple
                        ? `dataIndex="${field.key}"`
                        : `dataIndex={["${field.key}", ${
                              field.accessor ? `"${field.accessor}"` : ""
                          }]}`;

                const title = `title="${prettyString(field.key)}"`;

                let render = jsx`render={(value: any) => <DateField value={${accessor(
                    "value",
                    undefined,
                    Array.isArray(field.accessor) ? field.accessor : undefined,
                    ' + " " + ',
                )}} />}`;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        ' + " " + ',
                    );
                    render = jsx`render={(value: any) => (<>{value.map((item, index) => (
                        <DateField value={${val}} key={index} />
                    ))}</>)}`;
                }

                return jsx`<Table.Column ${dataIndex} ${title} ${render} />`;
            }
            return undefined;
        };

        const richtextFields = (field: GuessField) => {
            if (field?.type === "richtext") {
                imports.push(["MarkdownField", "@pankod/refine-mantine"]);

                const dataIndex =
                    Array.isArray(field.accessor) || field.multiple
                        ? `dataIndex="${field.key}"`
                        : field.accessor
                        ? `dataIndex={["${field.key}", "${field.accessor}"]}`
                        : `dataIndex="${field.key}"`;

                const title = `title="${prettyString(field.key)}"`;

                let render = jsx`render={(value: any) => <MarkdownField value={(${accessor(
                    "value",
                    undefined,
                    Array.isArray(field.accessor) ? field.accessor : undefined,
                )}).slice(0, 80) + "..."} />}`;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        ' + " " + ',
                    );
                    render = jsx`render={(value: any) => (<>{value.map((item, index) => (
                        <MarkdownField value={(${val}).slice(0, 80) + "..."} key={index} />
                    ))}</>)}`;
                }

                return jsx`<Table.Column ${dataIndex} ${title} ${render} />`;
            }

            return undefined;
        };

        const basicFields = (field: GuessField) => {
            if (field && (field.type === "text" || field.type === "number")) {
                // const dataIndex =
                //     field.accessor &&
                //     !Array.isArray(field.accessor) &&
                //     !field.multiple
                //         ? `dataIndex={["${field.key}", "${field.accessor}"]}`
                //         : `dataIndex="${field.key}"`;
                // const title = `title="${prettyString(field.key)}"`;
                // let render = "";
                // if (field.multiple) {
                //     imports.push(["TagField", "@pankod/refine-mantine"]);
                //     const val = accessor(
                //         "item",
                //         undefined,
                //         field.accessor,
                //         ' + " " + ',
                //     );
                //     render = `render={(value: any) => (<>{value.map((item) => (
                //         <TagField value={${val}} key={${val}} />
                //     ))}</>)}`;
                // }
                // if (!field.multiple && Array.isArray(field.accessor)) {
                //     render = `render={(value: any) => (<>{${accessor(
                //         "value",
                //         undefined,
                //         field.accessor,
                //     )}}</>)}`;
                // }
                // return `<Table.Column ${dataIndex} ${title} ${render} />`;

                return jsx`{
                    accessorKey: "title",
                }`;
            }
            return undefined;
        };

        const actionButtons = jsx`
                // <Table.Column
                //     title="Actions"
                //     dataIndex="actions"
                //     render={(_, record) => (
                //         <Space>
                //             <EditButton
                //                 hideText
                //                 size="small"
                //                 recordItemId={record.id}
                //             />
                //             <ShowButton
                //                 hideText
                //                 size="small"
                //                 recordItemId={record.id}
                //             />
                //             <ShowButton
                //                 hideText
                //                 size="small"
                //                 recordItemId={record.id}
                //             />
                //         </Space>
                //     )}
                // />
            `;

        const renderedFields: Array<string | undefined> = fields.map(
            (field) => {
                switch (field?.type) {
                    case "text":
                    case "number":
                        return basicFields(field);
                    case "richtext":
                        // return richtextFields(field);
                        return undefined;
                    case "email":
                        // return emailFields(field);
                        return undefined;
                    case "image":
                        // return imageFields(field);
                        return undefined;
                    case "date":
                        // return dateFields(field);
                        return undefined;
                    case "boolean":
                        // return booleanFields(field);
                        return undefined;
                    case "url":
                        // return urlFields(field);
                        return undefined;
                    case "relation":
                        // return renderRelationFields(field);
                        return undefined;
                    default:
                        return undefined;
                }
            },
        );

        return jsx`
        ${printImports(imports)}
        
        export const ${COMPONENT_NAME}: React.FC<IResourceComponentsProps> = () => {
            const columns = React.useMemo<ColumnDef[]>(() => [
                ${renderedFields.join(",")}
                ${actionButtons}
            ], []);

            const {
                getHeaderGroups,
                getRowModel,
                setOptions,
                refineCore: {
                    setCurrent,
                    pageCount,
                    current,
                    tableQueryResult: { data: tableData },
                },
            } = useTable({
                columns,
            });

            ${relationHooksCode}

            setOptions((prev) => ({
                ...prev,
                meta: {
                    ...prev.meta,
                    categoriesData,
                },
            }));

            return (
                <ScrollArea>
                    <List>
                        <Table highlightOnHover>
                            <thead>
                                {getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <th key={header.id}>
                                                    {!header.isPlaceholder && (
                                                        <Group spacing="xs" noWrap>
                                                            <Box>
                                                                {flexRender(
                                                                    header.column
                                                                        .columnDef
                                                                        .header,
                                                                    header.getContext(),
                                                                )}
                                                            </Box>
                                                            <Group spacing="xs" noWrap>
                                                                <ColumnSorter
                                                                    column={
                                                                        header.column
                                                                    }
                                                                />
                                                                <ColumnFilter
                                                                    column={
                                                                        header.column
                                                                    }
                                                                />
                                                            </Group>
                                                        </Group>
                                                    )}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {getRowModel().rows.map((row) => {
                                    return (
                                        <tr key={row.id}>
                                            {row.getVisibleCells().map((cell) => {
                                                return (
                                                    <td key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <br />
                        <Pagination
                            position="right"
                            total={pageCount}
                            page={current}
                            onChange={setCurrent}
                        />
                    </List>
                </ScrollArea>    
            );
        };
        `;
    },
});
