import { useShow, useOne } from "@refinedev/core";
import { Show, DateField } from "@refinedev/antd";
import { Typography, Tag } from "antd";
import type { ITask, ILabel, IPriority, IStatus, IAuthUser } from "interfaces";

const { Title, Text } = Typography;

export const TaskShow: React.FC = () => {
  const { query: queryResult } = useShow<ITask>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { result: assigned } = useOne<IAuthUser>({
    resource: "users",
    id: record?.users || "",
  });

  const { result: label } = useOne<ILabel>({
    resource: "label",
    id: record?.label || "",
  });

  const { result: priority } = useOne<IPriority>({
    resource: "priority",
    id: record?.priority || "",
  });

  const { result: status } = useOne<IStatus>({
    resource: "status",
    id: record?.status || "",
  });

  console.log(status);

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Task:</Title>
      <Text>{record?.title || "-"}</Text>
      <Title level={5}>Task Desciption:</Title>
      <Text>{record?.description}</Text>
      <Title level={5}>Assigned To:</Title>
      <Text>
        <Tag>{assigned?.email ?? "-"}</Tag>
      </Text>
      <Title level={5}>Label:</Title>
      <Text>
        <Tag>{label?.title ?? "-"}</Tag>
      </Text>
      <Title level={5}>Priority:</Title>
      <Text>{priority?.title ?? "-"}</Text>
      <Title level={5}>Status:</Title>
      <Text>{status?.title ?? "-"}</Text>
      <Title level={5}>Start Date:</Title>
      <DateField format="DD/MM/YYYY" value={record?.start_time ?? "-"} />
      <Title level={5}>Due Date:</Title>
      <DateField format="DD/MM/YYYY" value={record?.end_time ?? "-"} />
    </Show>
  );
};
