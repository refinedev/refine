import * as RefineChakraUI from "@pankod/refine-chakra-ui";
import * as RefineReactTable from "@pankod/refine-react-table";
import * as TablerIcons from "@tabler/icons";

import { createInferencer } from "@/create-inferencer";
import {
    jsx,
    componentName,
    prettyString,
    accessor,
    printImports,
    dotAccessor,
    noOp,
    getVariableName,
} from "@/utilities";

import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { CodeViewerComponent } from "./code-viewer";

import { InferencerResultComponent, InferField } from "@/types";

const getAccessorKey = (field: InferField) => {
    return Array.isArray(field.accessor) || field.multiple
        ? `accessorKey: "${field.key}"`
        : field.accessor
        ? `accessorKey: "${dotAccessor(field.key, undefined, field.accessor)}"`
        : `accessorKey: "${field.key}"`;
};

/**
 * @experimental This is an experimental component
 */
export const ListInferencer: InferencerResultComponent = createInferencer({
    type: "list",
    additionalScope: [
        ["@pankod/refine-chakra-ui", "RefineChakraUI", RefineChakraUI],
        ["@pankod/refine-react-table", "RefineReactTable", RefineReactTable],
        ["@tabler/icons", "TablerIcons", TablerIcons],
    ],
    codeViewerComponent: CodeViewerComponent,
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    renderer: ({ resource, fields, isCustomPage }) => {
        const COMPONENT_NAME = componentName(
            resource.label ?? resource.name,
            "list",
        );
        const recordName = "tableData?.data";
        const imports: Array<[element: string, module: string]> = [
            ["IResourceComponentsProps", "@pankod/refine-core"],
            ["useTable", "@pankod/refine-react-table"],
            ["ColumnDef", "@pankod/refine-react-table"],
            ["flexRender", "@pankod/refine-react-table"],
            ["List", "@pankod/refine-chakra-ui"],
            ["TableContainer", "@pankod/refine-chakra-ui"],
            ["Table", "@pankod/refine-chakra-ui"],
            ["Thead", "@pankod/refine-chakra-ui"],
            ["Tr", "@pankod/refine-chakra-ui"],
            ["Th", "@pankod/refine-chakra-ui"],
            ["Tbody", "@pankod/refine-chakra-ui"],
            ["Tr", "@pankod/refine-chakra-ui"],
            ["Td", "@pankod/refine-chakra-ui"],
            ["HStack", "@pankod/refine-chakra-ui"],
            ["Button", "@pankod/refine-chakra-ui"],
            ["IconButton", "@pankod/refine-chakra-ui"],
            ["usePagination", "@pankod/refine-chakra-ui"],
            ["Box", "@pankod/refine-chakra-ui"],
            ["IconChevronRight", "@tabler/icons"],
            ["IconChevronLeft", "@tabler/icons"],
        ];

        const relationFields: (InferField | null)[] = fields.filter(
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
                    const { data: ${getVariableName(field.key, "Data")} } =
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

        const relationVariableNames = relationFields
            ?.map((field) => {
                if (field && field.resource) {
                    return getVariableName(field.key, "Data");
                }
                return undefined;
            })
            .filter(Boolean);

        const renderRelationFields = (field: InferField) => {
            if (field.relation && field.resource) {
                const variableName = `${getVariableName(
                    field.key,
                    "Data",
                )}?.data`;

                if (Array.isArray(field.accessor)) {
                    // not handled - not possible case
                    return undefined;
                }

                const id = `id: "${field.key}"`;
                const header = `header: "${prettyString(field.key)}"`;
                const accessorKey = getAccessorKey(field);

                let cell = "";

                // if multiple, then map it with tagfield
                // if not, then just show the value

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-chakra-ui"]);
                    let val = "item";

                    // for multiple
                    if (field?.relationInfer) {
                        val = accessor(
                            "item",
                            undefined,
                            field.relationInfer.accessor,
                        );
                    }

                    cell = `cell: function render({ getValue, table }) {
                        const meta = table.options.meta as {
                            ${getVariableName(
                                field.key,
                                "Data",
                            )}: GetManyResponse;
                        };

                        const ${getVariableName(
                            field.key,
                            "",
                        )} = getValue<any[]>()?.map((item) => {
                            return meta.${getVariableName(
                                field.key,
                                "Data",
                            )}?.data?.find(
                                (resourceItems) => resourceItems.id === ${accessor(
                                    "item",
                                    undefined,
                                    field.accessor,
                                )}
                            );
                        })


                        return (
                            <HStack>
                                {${getVariableName(
                                    field.key,
                                    "",
                                )}?.map((item, index) => (
                                    <TagField key={index} value={${val}} />
                                ))}
                            </HStack>
                        )
                    }
                `;
                } else {
                    if (field?.relationInfer) {
                        cell = `cell: function render({ getValue, table }) {
                            const meta = table.options.meta as {
                                ${getVariableName(
                                    field.key,
                                    "Data",
                                )}: GetManyResponse;
                            };

                            const ${getVariableName(
                                field.key,
                                "",
                            )} = meta.${variableName}?.find(
                                (item) => item.id === getValue<any>(),
                            );

                            return ${accessor(
                                getVariableName(field.key),
                                undefined,
                                field?.relationInfer?.accessor,
                            )} ?? "Loading...";
                        },`;
                    } else {
                        cell = "";
                    }
                }

                return `
                    {
                        ${id},
                        ${header},
                        ${accessorKey},
                        ${cell}
                    }
                `;
            }
            return undefined;
        };

        const imageFields = (field: InferField) => {
            if (field.type === "image") {
                imports.push(["Image", "@pankod/refine-chakra-ui"]);

                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = jsx`
                    cell: function render({ getValue }) {
                        ${field?.accessor ? "try {" : ""}
                            return <Image sx={{ maxWidth: "100px" }} src={${accessor(
                                "getValue<any>()",
                                undefined,
                                Array.isArray(field.accessor)
                                    ? field.accessor
                                    : undefined,
                                " + ",
                            )}} />
                        ${
                            field?.accessor
                                ? " } catch (error) { return null; }"
                                : ""
                        }
                    }
                `;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " + ",
                    );

                    cell = `
                        cell: function render({ getValue }) {
                            ${field?.accessor ? "try {" : ""}
                                return (
                                    <HStack>
                                        {getValue<any[]>()?.map((item, index) => (
                                            <Image src={${val}} key={index} sx={{ height: "50px", maxWidth: "100px" }} />
                                        ))}
                                    </HStack>
                                )
                            ${
                                field?.accessor
                                    ? " } catch (error) { return null; }"
                                    : ""
                            }
                        }
                    `;
                }

                return `
                    {
                        ${id},
                        ${accessorKey},
                        ${header},
                        ${cell}
                    }
                `;
            }
            return undefined;
        };

        const emailFields = (field: InferField) => {
            if (field.type === "email") {
                imports.push(["EmailField", "@pankod/refine-chakra-ui"]);

                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = jsx`
                    cell: function render({ getValue }) {
                        return <EmailField value={${accessor(
                            "getValue<any>()",
                            undefined,
                            Array.isArray(field.accessor)
                                ? field.accessor
                                : undefined,
                            ' + " " + ',
                        )}} />
                    }
                `;

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-chakra-ui"]);

                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " + ",
                    );

                    cell = `
                        cell: function render({ getValue }) {
                            return (
                                <HStack>
                                    {getValue<any[]>()?.map((item, index) => (
                                        <TagField value={${val}} key={index} />
                                    ))}
                                </HStack>
                            )
                        }
                    `;
                }

                return `
                    {
                        ${id},
                        ${accessorKey},
                        ${header},
                        ${cell}
                    }
                `;
            }
            return undefined;
        };

        const urlFields = (field: InferField) => {
            if (field.type === "url") {
                imports.push(["UrlField", "@pankod/refine-chakra-ui"]);

                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = jsx`
                    cell: function render({ getValue }) {
                        return <UrlField value={${accessor(
                            "getValue<any>()",
                            undefined,
                            Array.isArray(field.accessor)
                                ? field.accessor
                                : undefined,
                            " + ",
                        )}} />
                    }
                `;

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-chakra-ui"]);

                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " + ",
                    );

                    cell = `
                        cell: function render({ getValue }) {
                            return (
                                <HStack>
                                    {getValue<any[]>()?.map((item, index) => (
                                        <TagField value={${val}} key={index} />
                                    ))}
                                </HStack>
                            )
                        }
                    `;
                }

                return `
                    {
                        ${id},
                        ${accessorKey},
                        ${header},
                        ${cell}
                    }
                `;
            }
            return undefined;
        };

        const booleanFields = (field: InferField) => {
            if (field?.type === "boolean") {
                imports.push(["BooleanField", "@pankod/refine-chakra-ui"]);

                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = jsx`
                    cell: function render({ getValue }) {
                        return <BooleanField value={${accessor(
                            "getValue<any>()",
                            undefined,
                            Array.isArray(field.accessor)
                                ? field.accessor
                                : undefined,
                            " + ",
                        )}} />
                    }
                `;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " + ",
                    );

                    cell = `
                        cell: function render({ getValue }) {
                            return (
                                <HStack>
                                    {getValue<any[]>()?.map((item, index) => (
                                        <BooleanField value={${val}} key={index} />
                                    ))}
                                </HStack>
                            )
                        }
                    `;
                }

                return `
                    {
                        ${id},
                        ${accessorKey},
                        ${header},
                        ${cell}
                    }
                `;
            }

            return undefined;
        };

        const dateFields = (field: InferField) => {
            if (field.type === "date") {
                imports.push(["DateField", "@pankod/refine-chakra-ui"]);

                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = jsx`
                    cell: function render({ getValue }) {
                        return <DateField value={${accessor(
                            "getValue<any>()",
                            undefined,
                            Array.isArray(field.accessor)
                                ? field.accessor
                                : undefined,
                            ' + " " + ',
                        )}} />
                    }
                `;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " + ",
                    );

                    cell = `
                        cell: function render({ getValue }) {
                            return (
                                <HStack>
                                    {getValue<any[]>()?.map((item, index) => (
                                        <DateField value={${val}} key={index} />
                                    ))}
                                </HStack>
                            )
                        }
                    `;
                }

                return `
                    {
                        ${id},
                        ${accessorKey},
                        ${header},
                        ${cell}
                    }
                `;
            }
            return undefined;
        };

        const richtextFields = (field: InferField) => {
            if (field?.type === "richtext") {
                imports.push(["MarkdownField", "@pankod/refine-chakra-ui"]);

                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = jsx`
                    cell: function render({ getValue }) {
                        return <MarkdownField value={(${accessor(
                            "getValue<string>()",
                            undefined,
                            Array.isArray(field.accessor)
                                ? field.accessor
                                : undefined,
                        )})?.slice(0, 80) + "..." } />
                    }
                `;

                if (field.multiple) {
                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " + ",
                    );

                    cell = `
                        cell: function render({ getValue }) {
                            return (
                                <HStack>
                                    {getValue<string[]>()?.map((item, index) => (
                                        <MarkdownField value={${val}} key={index} />
                                    ))}
                                </HStack>
                            )
                        }
                    `;
                }

                return `
                    {
                        ${id},
                        ${accessorKey},
                        ${header},
                        ${cell}
                    }
                `;
            }

            return undefined;
        };

        const basicFields = (field: InferField) => {
            if (field && (field.type === "text" || field.type === "number")) {
                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = "";

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-chakra-ui"]);

                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        ' + " " + ',
                    );

                    cell = `
                        cell: function render({ getValue }) {
                            return (
                                <HStack>
                                    {getValue<any[]>()?.map((item, index) => (
                                        <TagField value={${val}} key={index} />
                                    ))}
                                </HStack>
                            )
                        }
                    `;
                }

                if (!field.multiple && Array.isArray(field.accessor)) {
                    cell = `
                        cell: function render({ getValue }) {
                            return (
                                <>{${accessor(
                                    "getValue<any>()",
                                    field.key,
                                    field.accessor,
                                )}}</>
                            );
                        }
                    `;
                }

                return `
                    {
                        ${id},
                        ${accessorKey},
                        ${header},
                        ${cell}
                    }
                `;
            }
            return undefined;
        };

        const { canEdit, canShow, canDelete } = resource ?? {};

        if (canEdit) {
            imports.push(["EditButton", "@pankod/refine-chakra-ui"]);
        }
        if (canShow) {
            imports.push(["ShowButton", "@pankod/refine-chakra-ui"]);
        }
        if (canDelete) {
            imports.push(["DeleteButton", "@pankod/refine-chakra-ui"]);
        }

        const actionButtons =
            canEdit || canShow || canDelete
                ? jsx`
        {
            id: "actions",
            accessorKey: "id",
            header: "Actions",
            cell: function render({ getValue }) {
                return (
                    <HStack>
                    ${
                        canShow
                            ? jsx`
                        <ShowButton
                            hideText
                            recordItemId={getValue() as string}
                        />
                        `
                            : ""
                    }
                        ${
                            canEdit
                                ? jsx`
                        <EditButton
                            hideText
                            recordItemId={getValue() as string}
                        />
                        `
                                : ""
                        }
                        ${
                            canDelete
                                ? jsx`
                        <DeleteButton
                            hideText
                            recordItemId={getValue() as string}
                        />
                        `
                                : ""
                        }
                    </HStack>
                );
            },
        },
            `
                : "";

        const renderedFields: Array<string | undefined> = fields.map(
            (field) => {
                switch (field?.type) {
                    case "text":
                    case "number":
                        return basicFields(field);
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

        noOp(imports);

        return jsx`
        import React from "react";
        ${printImports(imports)}
        
        export const ${COMPONENT_NAME}: React.FC<IResourceComponentsProps> = () => {
            const columns = React.useMemo<ColumnDef<any>[]>(() => [
                ${[...renderedFields, actionButtons].filter(Boolean).join(",")}
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
                ${
                    isCustomPage
                        ? `
                refineCoreProps: {
                    resource: "${resource.name}",
                }
                `
                        : ""
                }
                
            });

            ${relationHooksCode}

            setOptions((prev) => ({
                ...prev,
                meta: {
                    ...prev.meta,
                    ${relationVariableNames.join(", ")}
                },
            }));

            return (
                <List>
                    <TableContainer whiteSpace="pre-line">
                        <Table variant="simple">
                            <Thead>
                                {getHeaderGroups().map((headerGroup) => (
                                    <Tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <Th key={header.id}>
                                                {!header.isPlaceholder && (
                                                    flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )
                                                )}
                                            </Th>
                                        ))}
                                    </Tr>
                                ))}
                            </Thead>
                            <Tbody>
                                {getRowModel().rows.map((row) => (
                                    <Tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </Td>
                                        ))}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        current={current}
                        pageCount={pageCount}
                        setCurrent={setCurrent}
                    />
                </List>   
            );
        };

        type PaginationProps = {
            current: number;
            pageCount: number;
            setCurrent: (page: number) => void;
        };

        const Pagination: React.FC<PaginationProps> = ({
            current,
            pageCount,
            setCurrent,
        }) => {
            const pagination = usePagination({
                current,
                pageCount,
            });
        
            return (
                <Box display="flex" justifyContent="flex-end">
                    <HStack my="3" spacing="1">
                        {pagination?.prev && (
                            <IconButton
                                aria-label="previous page"
                                onClick={() => setCurrent(current - 1)}
                                disabled={!pagination?.prev}
                                variant="outline"
                            >
                                <IconChevronLeft size="18" />
                            </IconButton>
                        )}
        
                        {pagination?.items.map((page) => {
                            if (typeof page === "string")
                                return <span key={page}>...</span>;
        
                            return (
                                <Button
                                    key={page}
                                    onClick={() => setCurrent(page)}
                                    variant={page === current ? "solid" : "outline"}
                                >
                                    {page}
                                </Button>
                            );
                        })}
                        {pagination?.next && (
                            <IconButton
                                aria-label="next page"
                                onClick={() => setCurrent(current + 1)}
                                variant="outline"
                            >
                                <IconChevronRight size="18" />
                            </IconButton>
                        )}
                    </HStack>
                </Box>
            );
        };
        `;
    },
});
