import { IResourceComponentsProps, useMany } from "@pankod/refine-core";

import {
    List,
    Table,
    TextField,
    useTable,
    Space,
    EditButton,
    ShowButton,
    FilterDropdown,
    Select,
    useSelect,
    SelectProps,
} from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";
import { useEffect, useState } from "react";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>();
    const [page, setPage] = useState<number>(1);
    const [options, setOptions] = useState<SelectProps["options"]>();
    const [search, setSearch] = useState<string>("");

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];

    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
        fetchSize: 20,
        pagination: { current: page },
        queryOptions: { keepPreviousData: true },
        onSearch: (value) => {
            setPage(1);
            setSearch(value);
            return [
                {
                    field: "title",
                    operator: "contains",
                    value,
                },
            ];
        },
    });

    useEffect(() => {
        // query pagination (infinite loading)
        if (page === 1 && search && search.length) {
            setOptions(categorySelectProps.options);
        } else if (page === 1 && (!search || (search && !search.length))) {
            setOptions(categorySelectProps.options);
        } else if (page > 1) {
            setOptions((prevOptions) => {
                const prevOptionsChecked =
                    (Array.isArray(prevOptions) && prevOptions) || [];
                const newOptionsChecked =
                    (Array.isArray(categorySelectProps.options) &&
                        categorySelectProps.options) ||
                    [];

                return [...prevOptionsChecked, ...newOptionsChecked];
            });
        }
    }, [page, categorySelectProps.options, search]);

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.title
                                }
                            />
                        );
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                mode="multiple"
                                style={{ minWidth: 200 }}
                                {...categorySelectProps}
                                // need to add options with searchValue and onPopupScroll
                                options={options}
                                onPopupScroll={(event) => {
                                    if (
                                        event.target instanceof HTMLDivElement
                                    ) {
                                        const target = event.target;
                                        if (
                                            target.scrollTop +
                                                target.offsetHeight ===
                                            target.scrollHeight
                                        ) {
                                            if (categorySelectProps.options) {
                                                setPage((curr) => curr + 1);
                                            }
                                        }
                                    }
                                }}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
