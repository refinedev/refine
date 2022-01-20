import { useShow, useOne } from "@pankod/refine-core";
import { Show, Typography, Tag } from "@pankod/refine-antd";
import { CriteriaType, HackathonType } from "interfaces";
const { Title, Text } = Typography;

export const CriteriasShow = () => {
    const { queryResult } = useShow<CriteriaType>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: hackathonData } = useOne<HackathonType>({
        resource: "hackathons",
        id: record?.hackathon_id || "",
        queryOptions: {
            enabled: !!record?.hackathon_id,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Name</Title>
            <Text>{record?.name}</Text>
            <Title level={5}>Hackathon</Title>
            <Text>{hackathonData?.data.name}</Text>
        </Show>
    );
};
