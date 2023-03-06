import { useShow } from "@refinedev/core";
import { Show } from "@refinedev/antd";
import { Typography } from "antd";
import dayjs from "dayjs";
import { HackathonType } from "interfaces";
const { Title, Text } = Typography;

export const HackathonsShow = () => {
    const { queryResult } = useShow<HackathonType>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Name</Title>
            <Text>{record?.name}</Text>
            <Title level={5}>Starts</Title>
            <Text>{dayjs(record?.start).format("DD/MMMM dddd")}</Text>
            <Title level={5}>Ends</Title>
            <Text>{dayjs(record?.end).format("DD/MMMM dddd")}</Text>
        </Show>
    );
};
