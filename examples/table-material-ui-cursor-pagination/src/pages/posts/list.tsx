import { List, useDataGrid } from "@refinedev/mui";
import React from "react";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import type { GitHubCommit } from "../../types";
import { COMMITS_LIST_QUERY } from "./queries";

const githubRepositoryVariables = {
  owner: "refinedev",
  name: "refine",
};

export const PostList: React.FC = () => {
  const { dataGridProps } = useDataGrid<GitHubCommit>({
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

  const columns: GridColDef<GitHubCommit>[] = [
    {
      field: "oid",
      headerName: "OID",
      type: "string",
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: ({ value }) => {
        return typeof value === "string" ? value.substring(0, 7) : "";
      },
    },
    {
      field: "message",
      headerName: "Message",
      minWidth: 400,
      flex: 1,
      filterable: false,
      sortable: false,
      display: "flex",
    },
    {
      field: "author",
      headerName: "Author",
      minWidth: 140,
      flex: 1,
      filterable: false,
      sortable: false,
      display: "flex",
      renderCell: ({ row }) => {
        return row.author?.name ?? "Unknown";
      },
    },
    {
      field: "committedDate",
      headerName: "Committed At",
      minWidth: 140,
      flex: 1,
      filterable: false,
      sortable: false,
    },
  ];

  return (
    <List>
      <DataGrid
        getRowId={(row) => {
          return row.oid;
        }}
        {...dataGridProps}
        columns={columns}
      />
    </List>
  );
};
