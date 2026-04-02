import { List, useTable } from "@refinedev/antd";
import { Table } from "antd";

import type { GitHubCommit } from "../../types";
import { COMMITS_LIST_QUERY } from "./queries";

const githubRepositoryVariables = {
  owner: "refinedev",
  name: "refine",
};

export const PostList: React.FC = () => {
  const { tableProps } = useTable<GitHubCommit>({
    pagination: {
      mode: "cursor",
      pageSize: 5,
    },
    meta: {
      gqlQuery: COMMITS_LIST_QUERY,
      gqlVariables: githubRepositoryVariables,
    },
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="oid">
        <Table.Column
          dataIndex="oid"
          title="OID"
          width={100}
          render={(value: string) => {
            return value?.substring(0, 7);
          }}
        />
        <Table.Column dataIndex="message" title="Message" ellipsis />
        <Table.Column
          dataIndex={["author", "name"]}
          title="Author"
          width={150}
          render={(value: string | null) => {
            return value ?? "Unknown";
          }}
        />
        <Table.Column
          dataIndex="committedDate"
          title="Committed At"
          width={200}
        />
      </Table>
    </List>
  );
};
