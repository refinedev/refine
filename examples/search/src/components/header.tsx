import { useState, useEffect } from "react";
import {
    AntdLayout,
    AutoComplete,
    Input,
    Icons,
    Typography,
    useList,
    Link,
} from "@pankod/refine";
import debounce from "lodash/debounce";

const { Text } = Typography;
const { SearchOutlined } = Icons;

import { ICategory, IOptions, IPost } from "interfaces";

const renderTitle = (title: string) => {
    return (
        <Text strong style={{ fontSize: "16px" }}>
            {title}
        </Text>
    );
};

const renderItem = (title: string, resource: string, id: string) => {
    return {
        value: title,
        label: (
            <Link to={`/${resource}/show/${id}`}>
                <Text>{title}</Text>
            </Link>
        ),
    };
};

export const Header: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const [options, setOptions] = useState<IOptions[]>([]);

    const { refetch: refetchProducts } = useList<IPost>(
        "posts",
        {
            filters: [{ field: "q", operator: "contains", value }],
        },
        {
            enabled: false,
            onSuccess: (data) => {
                const orderOptionGroup = data.data.map((item) =>
                    renderItem(item.title, "posts", item.id),
                );
                if (orderOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Posts"),
                            options: orderOptionGroup,
                        },
                    ]);
                }
            },
        },
    );

    const { refetch: refetchCategories } = useList<ICategory>(
        "categories",
        {
            filters: [{ field: "q", operator: "contains", value }],
        },
        {
            enabled: false,
            onSuccess: (data) => {
                const storeOptionGroup = data.data.map((item) =>
                    renderItem(item.title, "categories", item.id),
                );
                if (storeOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Categories"),
                            options: storeOptionGroup,
                        },
                    ]);
                }
            },
        },
    );

    useEffect(() => {
        setOptions([]);
        refetchProducts();
        refetchCategories();
    }, [value]);

    return (
        <AntdLayout.Header
            style={{
                padding: "0px 24px",
                backgroundColor: "#FFF",
            }}
        >
            <AutoComplete
                style={{ width: "100%", maxWidth: "550px" }}
                options={options}
                filterOption={false}
                onSearch={debounce((value: string) => setValue(value), 500)}
            >
                <Input
                    size="large"
                    placeholder="Search products or categories"
                    suffix={<SearchOutlined />}
                />
            </AutoComplete>
        </AntdLayout.Header>
    );
};
