import { useShow, useOne } from "@pankod/refine-core";
import { Show, Typography } from "@pankod/refine-antd";
import { HackathonerType, HackathonType, ProjectType } from "interfaces";
const { Title, Text } = Typography;

export const ProjectsShow = () => {
    const { queryResult } = useShow<ProjectType>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: hackathonData } = useOne<HackathonType>({
        resource: "teams",
        id: record?.hackathon_id || "",
        queryOptions: {
            enabled: !!record?.hackathon_id,
        },
    });
    const { data: hackathonerData } = useOne<HackathonerType>({
        resource: "teams",
        id: record?.hackathoner_id || "",
        queryOptions: {
            enabled: !!record?.hackathoner_id,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Name</Title>
            <Text>{record?.name}</Text>
            <Title level={5}>Description</Title>
            <Text>{record?.description}</Text>
            <Title level={5}>Url</Title>
            <Text>{record?.url}</Text>
            <Title level={5}>Hackathon</Title>
            <Text>{hackathonData?.data.name}</Text>
            <Title level={5}>Hackathoner</Title>
            <Text>{hackathonerData?.data.name}</Text>
        </Show>
    );
};
