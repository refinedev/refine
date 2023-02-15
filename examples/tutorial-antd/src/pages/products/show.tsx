import React from "react";
import { IResourceComponentsProps, useShow, useOne } from "@pankod/refine-core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    MarkdownField,
} from "@pankod/refine-antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } = useOne({
        resource: "categories",
        id: record?.category?.id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Name</Title>
            <TextField value={record?.name} />
            <Title level={5}>Material</Title>
            <TextField value={record?.material} />
            <Title level={5}>Description</Title>
            <MarkdownField value={record?.description} />
            <Title level={5}>Price</Title>
            <TextField value={record?.price} />
            <Title level={5}>Category</Title>
            {categoryIsLoading ? (
                <>Loading...</>
            ) : (
                <>{categoryData?.data?.title}</>
            )}
        </Show>
    );
};
