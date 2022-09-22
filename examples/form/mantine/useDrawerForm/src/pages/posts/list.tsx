import React, { useState } from "react";
import {
    useTable,
    ColumnDef,
    flexRender,
    Column,
} from "@pankod/refine-react-table";
import {
    ActionIcon,
    Box,
    Group,
    List,
    Menu,
    ScrollArea,
    Select,
    Stack,
    Table,
    TextInput,
    SelectProps,
    Pagination,
    EditButton,
    DeleteButton,
    useModalForm as useDrawerForm,
} from "@pankod/refine-mantine";
import { ChevronDown, Selector, Filter, X, Check } from "tabler-icons-react";

import { IPost } from "../../interfaces";
import { CreatePostDrawer, EditPostDrawer } from "../../components";

interface ColumnButtonProps {
    column: Column<any, any>;
}

const SelectFilter: React.FC<SelectProps> = (props) => {
    return <Select {...props} />;
};

const ColumnFilter: React.FC<ColumnButtonProps> = ({ column }) => {
    if (!column.getCanFilter()) {
        return null;
    }

    const [state, setState] = useState(null as null | { value: any });

    const open = () =>
        setState({
            value: column.getFilterValue(),
        });

    const close = () => setState(null);

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
                    <Filter size={16} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                {!!state && (
                    <Stack p="xs" spacing="xs">
                        {renderFilterElement()}
                        <Group position="right" spacing="xs" noWrap>
                            <ActionIcon
                                size="sm"
                                color="gray"
                                variant="outline"
                                onClick={clear}
                            >
                                <X />
                            </ActionIcon>
                            <ActionIcon
                                size="sm"
                                onClick={save}
                                color="primary"
                                variant="outline"
                            >
                                <Check />
                            </ActionIcon>
                        </Group>
                    </Stack>
                )}
            </Menu.Dropdown>
        </Menu>
    );
};

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
                transform: `rotate(${sorted === "asc" ? "180" : "0"}deg)`,
            }}
            variant={sorted ? "light" : "transparent"}
            color={sorted ? "primary" : "gray"}
        >
            {sorted ? <ChevronDown size={16} /> : <Selector size={16} />}
        </ActionIcon>
    );
};

export const PostList: React.FC = () => {
    const initialValues = {
        title: "",
        status: "",
        category: {
            id: "",
        },
        content: "",
    };

    const createDrawerForm = useDrawerForm({
        refineCoreProps: { action: "create" },
        initialValues,
    });
    const {
        modal: { show: showCreateDrawer },
    } = createDrawerForm;

    const editDrawerForm = useDrawerForm({
        refineCoreProps: { action: "edit" },
        initialValues,
    });
    const {
        modal: { show: showEditDrawer },
    } = editDrawerForm;

    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                meta: {
                    filterElement: function render(props: any) {
                        return (
                            <SelectFilter
                                defaultValue="published"
                                data={[
                                    { label: "Published", value: "published" },
                                    { label: "Draft", value: "draft" },
                                    { label: "Rejected", value: "rejected" },
                                ]}
                                {...props}
                            />
                        );
                    },
                    filterOperator: "eq",
                },
            },
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        <Group spacing="xs" noWrap>
                            <EditButton
                                hideText
                                size="xs"
                                onClick={() =>
                                    showEditDrawer(getValue() as number)
                                }
                            />
                            <DeleteButton
                                hideText
                                size="xs"
                                recordItemId={getValue() as number}
                            />
                        </Group>
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        refineCore: { setCurrent, pageCount, current },
    } = useTable({
        columns,
    });

    return (
        <>
            <CreatePostDrawer {...createDrawerForm} />
            <EditPostDrawer {...editDrawerForm} />
            <ScrollArea>
                <List createButtonProps={{ onClick: () => showCreateDrawer() }}>
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
                                                        <Group
                                                            spacing="xs"
                                                            noWrap
                                                        >
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
                                                        cell.column.columnDef
                                                            .cell,
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
        </>
    );
};
