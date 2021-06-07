import { useState, useEffect } from "react";
import {
    AntdLayout,
    AutoComplete,
    Input,
    useList,
    CrudFilters,
    useNavigation,
} from "@pankod/refine";

import { IPost, IUser } from "interfaces";
export interface IOptionGroup {
    value: string;
    label: string | React.ReactNode;
    resource: string;
    id: string;
}

interface IOptions {
    label: string | React.ReactNode;
    options: IOptionGroup[];
}

const renderTitle = (title: string, count: number) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ textTransform: "capitalize" }}>
            {title} ({count})
        </span>
        <a href={`/resources/${title}`}>more</a>
    </div>
);
const renderItem = (resource: string, id: string, title: string) => ({
    value: title + id,
    label: title,
    resource,
    id,
});

export const Header: React.FC = () => {
    const [options, setOptions] = useState<IOptions[]>([]);
    const [search, setSearch] = useState<Record<string, CrudFilters>>({});
    const [value, setValue] = useState<string>();

    const { show } = useNavigation();

    const postQueryResult = useList<IPost>(
        "posts",
        {
            sort: [{ order: "asc", field: "title" }],
            filters: search["posts"],
        },
        {
            enabled: false,
            onSuccess: (data) => {
                const postOptionGroup = data.data.map((item) =>
                    renderItem("posts", item.id, item.title),
                );
                if (postOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("posts", data.total),
                            options: postOptionGroup,
                        },
                    ]);
                }
            },
        },
    );
    const { refetch: refetchPostList } = postQueryResult;

    const userQueryResult = useList<IUser>(
        "users",
        {
            sort: [{ order: "asc", field: "firstName" }],
            filters: search["users"],
        },
        {
            enabled: false,
            onSuccess: (data) => {
                const userOptionGroup = data.data.map((item) =>
                    renderItem("users", item.id, item.firstName),
                );
                if (userOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("users", data.total),
                            options: userOptionGroup,
                        },
                    ]);
                }
            },
        },
    );
    const { refetch: refetchUserList } = userQueryResult;

    useEffect(() => {
        setOptions([]);
        Promise.all([refetchPostList(), refetchUserList()]);
    }, [search]);

    const onSearch = (value: string) => {
        setSearch({
            posts: [
                {
                    field: "title",
                    operator: "contains",
                    value,
                },
            ],
            users: [
                {
                    field: "firstName",
                    operator: "contains",
                    value,
                },
            ],
        });
        setValue(value);
    };

    const onSelect = (value: string, options: any) => {
        setValue(options.label);
        show(options.resource, "push", options.id);
    };

    return (
        <AntdLayout.Header
            style={{
                padding: "0px 0px 0px 24px",
                height: "55px",
                backgroundColor: "#FFF",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    height: "100%",
                    alignItems: "center",
                }}
            >
                <AutoComplete
                    dropdownMatchSelectWidth={600}
                    style={{ width: 500 }}
                    options={options}
                    onSelect={onSelect}
                    value={value}
                    onSearch={onSearch}
                    filterOption={false}
                >
                    <Input
                        size="large"
                        placeholder="Search resources"
                        allowClear
                    />
                </AutoComplete>
            </div>
        </AntdLayout.Header>
    );
};
