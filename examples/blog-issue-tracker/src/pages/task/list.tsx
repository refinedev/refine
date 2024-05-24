import React from "react";
import { useMany, type HttpError, type CrudFilters } from "@refinedev/core";

import {
  useTable,
  List,
  TextField,
  TagField,
  DateField,
  ShowButton,
  EditButton,
  DeleteButton,
} from "@refinedev/antd";

import { Table, Space, Row, Col, Card } from "antd";

import type {
  ILabel,
  IPriority,
  ITask,
  ITaskFilterVariables,
  IStatus,
  IAuthUser,
} from "interfaces";

import { Filter } from "../task";

export const TaskList = () => {
  const { tableProps, searchFormProps } = useTable<
    ITask,
    HttpError,
    ITaskFilterVariables
  >({
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { title, label, priority, users, status, start_time, end_time } =
        params;

      filters.push(
        {
          field: "title",
          operator: "eq",
          value: title,
        },

        {
          field: "label",
          operator: "eq",
          value: label,
        },

        {
          field: "priority",
          operator: "eq",
          value: priority,
        },

        {
          field: "users",
          operator: "eq",
          value: users,
        },

        {
          field: "status",
          operator: "eq",
          value: status,
        },

        {
          field: "start_time",
          operator: "gte",
          value: start_time ? start_time[0].toISOString() : undefined,
        },

        {
          field: "start_time",
          operator: "lte",
          value: start_time ? start_time[1].toISOString() : undefined,
        },

        {
          field: "end_time",
          operator: "gte",
          value: end_time ? end_time[0].toISOString() : undefined,
        },

        {
          field: "end_time",
          operator: "lte",
          value: end_time ? end_time[1].toISOString() : undefined,
        },
      );
      return filters;
    },
  });

  const labelIds = tableProps?.dataSource?.map((item) => item.label) ?? [];
  const priorityIds =
    tableProps?.dataSource?.map((item) => item.priority) ?? [];
  const assignedIds = tableProps?.dataSource?.map((item) => item.users) ?? [];
  const statusIds = tableProps?.dataSource?.map((item) => item.status) ?? [];

  const { data: labels } = useMany<ILabel>({
    resource: "label",
    ids: labelIds,
  });

  const { data: priority } = useMany<IPriority>({
    resource: "priority",
    ids: priorityIds,
  });

  const { data: assigned } = useMany<IAuthUser>({
    resource: "users",
    ids: assignedIds,
  });

  const { data: status } = useMany<IStatus>({
    resource: "status",
    ids: statusIds,
  });

  return (
    <Row gutter={[16, 16]}>
      <Col lg={6} xs={24}>
        <Card title="Task Filter">
          <Filter formProps={searchFormProps} />
        </Card>
      </Col>
      <Col lg={18} xs={24}>
        <List>
          <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="title" title="Title" />
            <Table.Column
              dataIndex="label"
              title="Label"
              render={(value) => {
                return (
                  <TagField
                    color={
                      labels?.data.find((item) => item.id === value)?.color
                    }
                    value={
                      labels?.data.find((item) => item.id === value)?.title
                    }
                  />
                );
              }}
            />
            <Table.Column
              dataIndex="priority"
              title="Priority"
              render={(value) => {
                return (
                  <TextField
                    value={
                      priority?.data.find((item) => item.id === value)?.title
                    }
                  />
                );
              }}
            />
            <Table.Column
              dataIndex="users"
              title="Assigned"
              render={(value) => {
                return (
                  <TagField
                    value={
                      assigned?.data.find((item) => item.id === value)?.email
                    }
                  />
                );
              }}
            />
            <Table.Column
              dataIndex="status"
              title="Status"
              render={(value) => {
                return (
                  <TextField
                    value={
                      status?.data.find((item) => item.id === value)?.title
                    }
                  />
                );
              }}
            />
            <Table.Column
              dataIndex="start_time"
              title="Start Date"
              render={(value) => (
                <DateField format="DD/MM/YYYY" value={value} />
              )}
            />
            <Table.Column
              dataIndex="end_time"
              title="Due Date"
              render={(value) => (
                <DateField format="DD/MM/YYYY" value={value} />
              )}
            />
            <Table.Column<ITask>
              title="Actions"
              dataIndex="actions"
              render={(_, record): React.ReactNode => {
                return (
                  <Space>
                    <ShowButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    />
                    <EditButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    />
                    <DeleteButton
                      size="small"
                      recordItemId={record.id}
                      hideText
                    />
                  </Space>
                );
              }}
            />
          </Table>
        </List>
      </Col>
    </Row>
  );
};
