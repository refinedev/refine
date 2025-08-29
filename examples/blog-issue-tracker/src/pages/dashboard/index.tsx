import React from "react";
import { useList, useMany } from "@refinedev/core";
import { Row, Col, Card } from "antd";
import type { ITask, ILabel, IPriority, IStatus, IAuthUser } from "interfaces";
import { TaskChart } from "components/task/pie";
import { groupBy } from "helper";

export const Dashboard = () => {
  const migratedMigratedMigratedMigratedMigratedMigratedTaskList =
    useList<ITask>({
      resource: "tasks",
    });

  const migratedMigratedMigratedMigratedMigratedTaskList = {
    ...migratedMigratedMigratedMigratedMigratedMigratedTaskList.result,
    ...migratedMigratedMigratedMigratedMigratedMigratedTaskList.query,
    ...migratedMigratedMigratedMigratedMigratedMigratedTaskList,
  };

  const migratedMigratedMigratedMigratedTaskList = {
    ...migratedMigratedMigratedMigratedMigratedTaskList.result,
    ...migratedMigratedMigratedMigratedMigratedTaskList.query,
    ...migratedMigratedMigratedMigratedMigratedTaskList,
  };

  const migratedMigratedMigratedTaskList = {
    ...migratedMigratedMigratedMigratedTaskList.result,
    ...migratedMigratedMigratedMigratedTaskList.query,
    ...migratedMigratedMigratedMigratedTaskList,
  };

  const migratedMigratedTaskList = {
    ...migratedMigratedMigratedTaskList.result,
    ...migratedMigratedMigratedTaskList.query,
    ...migratedMigratedMigratedTaskList,
  };

  const migratedTaskList = {
    ...migratedMigratedTaskList.result,
    ...migratedMigratedTaskList.query,
    ...migratedMigratedTaskList,
  };

  const taskList = {
    ...migratedTaskList.result,
    ...migratedTaskList.query,
    ...migratedTaskList,
  };

  const labelIds =
    taskList.data?.data.map((item) => item.label).filter(Boolean) ?? [];
  const priorityIds =
    taskList.data?.data.map((item) => item.priority).filter(Boolean) ?? [];
  const assignedIds =
    taskList.data?.data.map((item) => item.users).filter(Boolean) ?? [];
  const statusIds =
    taskList.data?.data.map((item) => item.status).filter(Boolean) ?? [];

  const { result: labels } = useMany<ILabel>({
    resource: "label",
    ids: labelIds || [],
  });

  const { result: priority } = useMany<IPriority>({
    resource: "priority",
    ids: priorityIds || [],
  });

  const { result: assigned } = useMany<IAuthUser>({
    resource: "users",
    ids: assignedIds || [],
  });

  const { result: status } = useMany<IStatus>({
    resource: "status",
    ids: statusIds || [],
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xl={7} lg={12} md={24} sm={24} xs={24}>
        <Card>
          <TaskChart
            data={
              labels?.data.map((i) => {
                return {
                  type: i.title,
                  value: groupBy(labelIds)[i.id],
                };
              }) ?? []
            }
          />
        </Card>
      </Col>
      <Col xl={7} lg={12} md={24} sm={24} xs={24}>
        <Card>
          <TaskChart
            data={
              priority?.data.map((i) => {
                return {
                  type: i.title,
                  value: groupBy(priorityIds)[i.id],
                };
              }) ?? []
            }
          />
        </Card>
      </Col>
      <Col xl={7} lg={12} md={24} sm={24} xs={24}>
        <Card>
          <TaskChart
            data={
              status?.data.map((i) => {
                return {
                  type: i.title,
                  value: groupBy(statusIds)[i.id],
                };
              }) ?? []
            }
          />
        </Card>
      </Col>
      <Col xl={7} lg={12} md={24} sm={24} xs={24}>
        <Card>
          <TaskChart
            data={
              assigned?.data.map((i) => {
                return {
                  type: i.email,
                  value: groupBy(assignedIds)[i.id],
                };
              }) ?? []
            }
          />
        </Card>
      </Col>
    </Row>
  );
};
