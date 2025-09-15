import { useShow, useOne } from "@refinedev/core";

import { Show, MarkdownField, ImageField } from "@refinedev/antd";

import { Typography, Space } from "antd";

import type { IPost, ICategory } from "../../interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
  const { query: queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const {
    result: categoryData,
    query: { isLoading: categoryIsLoading },
  } = useOne<ICategory>({
    resource: "categories",
    id: record?.category.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
      <Title level={5}>Category</Title>
      <Text>{categoryIsLoading ? "Loading..." : categoryData?.title}</Text>
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
      <Title level={5}>Images</Title>
      <Space wrap>
        {record?.image.map((img) => (
          <ImageField
            key={img.name}
            value={img.url}
            title={img.name}
            width={200}
          />
        ))}
      </Space>
    </Show>
  );
};
