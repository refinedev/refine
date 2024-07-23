import { useShow } from "@refinedev/core";
import { Show, MarkdownField, RefreshButton } from "@refinedev/antd";
import type { GetFields } from "@refinedev/nestjs-query";

import { Typography } from "antd";

import { POST_SHOW_QUERY } from "./queries";
import type { PostShowQuery } from "graphql/types";

const { Title, Text } = Typography;

export const PostShow = () => {
  const { query } = useShow<GetFields<PostShowQuery>>({
    metaData: {
      gqlQuery: POST_SHOW_QUERY,
    },
  });

  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      headerProps={{
        extra: (
          <RefreshButton
            onClick={() => {
              query.refetch();
            }}
          />
        ),
      }}
    >
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Status</Title>
      <Text>{record?.status}</Text>

      <Title level={5}>Category</Title>
      <Text>{record?.category.title}</Text>

      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};
