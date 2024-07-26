import { useShow } from "@refinedev/core";

import { Show, MarkdownField } from "@refinedev/antd";
import { Typography } from "antd";
import type { IPost } from "../../interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};
