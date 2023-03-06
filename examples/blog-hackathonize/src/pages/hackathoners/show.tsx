import { useShow, useOne } from "@refinedev/core";
import { Show } from "@refinedev/antd";
import { Typography } from "antd";
import { HackathonerType, TeamType } from "interfaces";
const { Title, Text } = Typography;

export const HackathonersShow = () => {
    const { queryResult } = useShow<HackathonerType>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: teamsData } = useOne<TeamType>({
        resource: "teams",
        id: record?.team_id || "",
        queryOptions: {
            enabled: !!record?.team_id,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Name</Title>
            <Text>{record?.name}</Text>
            <Title level={5}>Team</Title>
            <Text>{teamsData?.data.name}</Text>
        </Show>
    );
};
