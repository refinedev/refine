import * as RefineMantine from "@pankod/refine-mantine";
import * as RefineReactTable from "@pankod/refine-react-table";
import * as TablerIcons from "@tabler/icons";

import { createGuesser } from "@/create-guesser";
import {
    jsx,
    componentName,
    prettyString,
    accessor,
    printImports,
    toPlural,
    toSingular,
    dotAccessor,
} from "@/utilities";

import { ErrorComponent } from "./error";
import { LoadingComponent } from "./loading";
import { CodeViewerComponent } from "./code-viewer";

import { GuesserResultComponent, GuessField } from "@/types";

const getAccessorKey = (field: GuessField) => {
    return Array.isArray(field.accessor) || field.multiple
        ? `accessorKey: "${field.key}"`
        : field.accessor
        ? `accessorKey: "${dotAccessor(field.key, undefined, field.accessor)}"`
        : `accessorKey: "${field.key}"`;
};

/**
 * @experimental This is an experimental component
 */
export const ListGuesser: GuesserResultComponent = createGuesser({
    type: "list",
    additionalScope: [
        ["@pankod/refine-mantine", "RefineMantine", RefineMantine],
        ["@pankod/refine-react-table", "RefineReactTable", RefineReactTable],
        ["@tabler/icons", "TablerIcons", TablerIcons],
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
            ["Column", "@pankod/refine-react-table"],
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
            ["ActionIcon", "@pankod/refine-mantine"],
            ["TextInput", "@pankod/refine-mantine"],
            ["Menu", "@pankod/refine-mantine"],
            ["Stack", "@pankod/refine-mantine"],
            ["IconChevronDown", "@tabler/icons"],
            ["IconSelector", "@tabler/icons"],
            ["IconFilter", "@tabler/icons"],
            ["IconX", "@tabler/icons"],
            ["IconCheck", "@tabler/icons"],
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
                    const { data: ${toPlural(field.resource.name)}Data } =
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
                    return `${toPlural(field.resource.name)}Data`;
                }
                return undefined;
            })
            .filter(Boolean);

        const renderRelationFields = (field: GuessField) => {
            if (field.relation && field.resource) {
                const variableName = `${toPlural(
                    field.resource.name,
                )}Data?.data`;

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
                    imports.push(["TagField", "@pankod/refine-mantine"]);
                    let val = "item";

                    // for multiple
                    if (field?.relationGuess) {
                        const valSingle = `${variableName}?.find((resourceItems) => resourceItems.id === item)`;
                        const valViewableSingle = accessor(
                            valSingle,
                            undefined,
                            field?.relationGuess?.accessor,
                        );
                        val = valViewableSingle;
                    }

                    cell = `cell: function render({ getValue }) {
                        return (
                            <Group>
                                {${accessor(
                                    "getValue()",
                                    undefined,
                                    field.accessor,
                                )}?.map((item, index) => (
                                    <TagField key={index} value={${val}} />
                                ))}
                            </Group>
                        )
                    }
                `;
                } else {
                    if (field?.relationGuess) {
                        cell = `cell: function render({ getValue, table }) {
                            const meta = table.options.meta as {
                                ${toPlural(
                                    field.resource.name,
                                )}Data: GetManyResponse;
                            };

                            const ${toSingular(
                                field.resource.name,
                            )} = meta.${variableName}?.find(
                                (item) => item.id === getValue(),
                            );

                            return ${accessor(
                                toSingular(field.resource.name),
                                undefined,
                                field?.relationGuess?.accessor,
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

        const imageFields = (field: GuessField) => {
            if (field.type === "image") {
                imports.push(["Image", "@pankod/refine-mantine"]);

                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = jsx`
                    cell: function render({ getValue }) {
                        return <Image sx={{ maxWidth: "100px" }} src={${accessor(
                            "getValue()",
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
                                <Group>
                                    {getValue()?.map((item, index) => (
                                        <Image src={${val}} key={index} sx={{ height: "50px", maxWidth: "100px" }} />
                                    ))}
                                </Group>
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

        const emailFields = (field: GuessField) => {
            if (field.type === "email") {
                imports.push(["EmailField", "@pankod/refine-mantine"]);

                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = jsx`
                    cell: function render({ getValue }) {
                        return <EmailField value={${accessor(
                            "getValue()",
                            undefined,
                            Array.isArray(field.accessor)
                                ? field.accessor
                                : undefined,
                            ' + " " + ',
                        )}} />
                    }
                `;

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-mantine"]);

                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " + ",
                    );

                    cell = `
                        cell: function render({ getValue }) {
                            return (
                                <Group>
                                    {getValue()?.map((item, index) => (
                                        <TagField value={${val}} key={index} />
                                    ))}
                                </Group>
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

        const urlFields = (field: GuessField) => {
            if (field.type === "url") {
                imports.push(["UrlField", "@pankod/refine-mantine"]);

                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = jsx`
                    cell: function render({ getValue }) {
                        return <UrlField value={${accessor(
                            "getValue()",
                            undefined,
                            Array.isArray(field.accessor)
                                ? field.accessor
                                : undefined,
                            " + ",
                        )}} />
                    }
                `;

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-mantine"]);

                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        " + ",
                    );

                    cell = `
                        cell: function render({ getValue }) {
                            return (
                                <Group>
                                    {getValue()?.map((item, index) => (
                                        <TagField value={${val}} key={index} />
                                    ))}
                                </Group>
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

        const booleanFields = (field: GuessField) => {
            if (field?.type === "boolean") {
                imports.push(["BooleanField", "@pankod/refine-mantine"]);

                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = jsx`
                    cell: function render({ getValue }) {
                        return <BooleanField value={${accessor(
                            "getValue()",
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
                                <Group>
                                    {getValue()?.map((item, index) => (
                                        <BooleanField value={${val}} key={index} />
                                    ))}
                                </Group>
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

        const dateFields = (field: GuessField) => {
            if (field.type === "date") {
                imports.push(["DateField", "@pankod/refine-mantine"]);

                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = jsx`
                    cell: function render({ getValue }) {
                        return <DateField value={${accessor(
                            "getValue()",
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
                                <Group>
                                    {getValue()?.map((item, index) => (
                                        <DateField value={${val}} key={index} />
                                    ))}
                                </Group>
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

        const richtextFields = (field: GuessField) => {
            if (field?.type === "richtext") {
                imports.push(["MarkdownField", "@pankod/refine-mantine"]);

                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = jsx`
                    cell: function render({ getValue }) {
                        return <MarkdownField value={(${accessor(
                            "getValue()",
                            undefined,
                            Array.isArray(field.accessor)
                                ? field.accessor
                                : undefined,
                        )}).slice(0, 80) + "..." } />
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
                                <Group>
                                    {getValue()?.map((item, index) => (
                                        <MarkdownField value={${val}} key={index} />
                                    ))}
                                </Group>
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

        const basicFields = (field: GuessField) => {
            if (field && (field.type === "text" || field.type === "number")) {
                const id = `id: "${field.key}"`;
                const accessorKey = getAccessorKey(field);
                const header = `header: "${prettyString(field.key)}"`;

                let cell = "";

                if (field.multiple) {
                    imports.push(["TagField", "@pankod/refine-mantine"]);

                    const val = accessor(
                        "item",
                        undefined,
                        field.accessor,
                        ' + " " + ',
                    );

                    cell = `
                        cell: function render({ getValue }) {
                            return (
                                <Group>
                                    {{${accessor(
                                        "getValue()",
                                        field.key,
                                    )}?.map((item, index) => (
                                        <TagField value={${val}} key={index} />
                                    ))}
                                </Group>
                            )
                        }
                    `;
                }

                if (!field.multiple && Array.isArray(field.accessor)) {
                    cell = `
                        cell: function render({ getValue }) {
                            return (
                                <>{${accessor(
                                    "getValue()",
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

        const actionButtons = jsx`
        {
            id: "actions",
            accessorKey: "id",
            header: "Actions",
            enableColumnFilter: false,
            enableSorting: false,
            cell: function render({ getValue }) {
                return (
                    <Group spacing="xs" noWrap>
                        <ShowButton
                            hideText
                            recordItemId={getValue() as string}
                        />
                        <EditButton
                            hideText
                            recordItemId={getValue() as string}
                        />
                        <DeleteButton
                            hideText
                            recordItemId={getValue() as string}
                        />
                    </Group>
                );
            },
        },
            `;

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

        return jsx`
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

        interface ColumnButtonProps {
            column: Column<any, any>; // eslint-disable-line
        }

        const ColumnSorter: React.FC<ColumnButtonProps> = ({ column }) => {
            if (!column.getCanSort()) {
                return null;
            }
        
            const sorted = column.getIsSorted();
        
            return (
                <ActionIcon
                    size="xs"
                    onClick={column.getToggleSortingHandler()}
                    style={{
                        transition: "transform 0.25s",
                        transform: \`rotate(\${
                            sorted === "asc" ? "180" : "0"
                        }deg)\`,
                    }}
                    variant={sorted ? "light" : "transparent"}
                    color={sorted ? "primary" : "gray"}
                >
                    {sorted ? (
                        <IconChevronDown size={18} />
                    ) : (
                        <IconSelector size={18} />
                    )}
                </ActionIcon>
            );
        };

        const ColumnFilter: React.FC<ColumnButtonProps> = ({ column }) => {
            // eslint-disable-next-line
            const [state, setState] = React.useState(null as null | { value: any });
        
            if (!column.getCanFilter()) {
                return null;
            }
        
            const open = () =>
                setState({
                    value: column.getFilterValue(),
                });
        
            const close = () => setState(null);
        
            // eslint-disable-next-line
            const change = (value: any) => setState({ value });
        
            const clear = () => {
                column.setFilterValue(undefined);
                close();
            };
        
            const save = () => {
                if (!state) return;
                column.setFilterValue(state.value);
                close();
            };
        
            const renderFilterElement = () => {
                // eslint-disable-next-line
                const FilterComponent = (column.columnDef?.meta as any)?.filterElement;
        
                if (!FilterComponent && !!state) {
                    return (
                        <TextInput
                            autoComplete="off"
                            value={state.value}
                            onChange={(e) => change(e.target.value)}
                        />
                    );
                }
        
                return <FilterComponent value={state?.value} onChange={change} />;
            };
        
            return (
                <Menu
                    opened={!!state}
                    position="bottom"
                    withArrow
                    transition="scale-y"
                    shadow="xl"
                    onClose={close}
                    width="256px"
                    withinPortal
                >
                    <Menu.Target>
                        <ActionIcon
                            size="xs"
                            onClick={open}
                            variant={column.getIsFiltered() ? "light" : "transparent"}
                            color={column.getIsFiltered() ? "primary" : "gray"}
                        >
                            <IconFilter size={18} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {!!state && (
                            <Stack p="xs" spacing="xs">
                                {renderFilterElement()}
                                <Group position="right" spacing={6} noWrap>
                                    <ActionIcon
                                        size="md"
                                        color="gray"
                                        variant="outline"
                                        onClick={clear}
                                    >
                                        <IconX size={18} />
                                    </ActionIcon>
                                    <ActionIcon
                                        size="md"
                                        onClick={save}
                                        color="primary"
                                        variant="outline"
                                    >
                                        <IconCheck size={18} />
                                    </ActionIcon>
                                </Group>
                            </Stack>
                        )}
                    </Menu.Dropdown>
                </Menu>
            );
        };
        
        `;
    },
});
