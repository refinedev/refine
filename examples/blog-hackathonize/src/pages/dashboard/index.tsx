import { useList, useCreate } from "@refinedev/core";
import {
    List as AntdList,
    Card,
    Form,
    Rate,
    Button,
    Typography,
    Row,
} from "antd";
import dayjs from "dayjs";
import {
    CriteriaType,
    HackathonType,
    ProjectScoreType,
    ProjectType,
} from "interfaces";

const now = dayjs();

export const DashboardPage: React.FC = () => {
    const currentHackathons = useList<HackathonType>({
        resource: "hackathons",
        config: {
            filters: [
                {
                    field: "start",
                    operator: "lte",
                    value: now,
                },
                {
                    field: "end",
                    operator: "gte",
                    value: now,
                },
            ],
        },
    });

    const currentHackathon = currentHackathons.data?.data[0];

    const projects = useList<ProjectType>({
        resource: "projects",
        config: {
            filters: [
                {
                    field: "hackathon_id",
                    operator: "eq",
                    value: currentHackathon?.id,
                },
            ],
            pagination: {
                pageSize: 1000,
            },
        },
        queryOptions: {
            enabled: !currentHackathons.isLoading,
        },
    });

    const projectIds = projects.data?.data.map((p) => p.id);

    const criterias = useList<CriteriaType>({
        resource: "criterias",
        config: {
            filters: [
                {
                    field: "hackathon_id",
                    operator: "eq",
                    value: currentHackathon?.id,
                },
            ],
        },
        queryOptions: {
            enabled: !projects.isLoading && !currentHackathons.isLoading,
        },
    });

    const projectScores = useList<ProjectScoreType>({
        resource: "projectscores",
        config: {
            filters: [
                {
                    field: "project_id",
                    operator: "in",
                    value: projectIds,
                },
            ],
        },
        queryOptions: {
            enabled: !projects.isLoading,
        },
    });

    const { mutate } = useCreate();

    return (
        <Card title={currentHackathon?.name}>
            <AntdList
                dataSource={projects.data?.data}
                renderItem={(item) => {
                    const totalProjectScore = projectScores.data?.data
                        .filter((i) => i.project_id === item.id)
                        .map((ps) => parseInt(ps.score))
                        .reduce((prev, cur) => prev + cur, 0);
                    return (
                        <Card
                            title={item.name}
                            style={{ marginBottom: 20 }}
                            extra={
                                <Typography.Text strong>
                                    Total Score: {totalProjectScore}
                                </Typography.Text>
                            }
                        >
                            <Form
                                layout="vertical"
                                onFinish={(values) => {
                                    Object.keys(values).forEach(
                                        (criteria_id) => {
                                            mutate({
                                                resource: "projectscores",
                                                values: {
                                                    project_id: item.id,
                                                    criteria_id: criteria_id,
                                                    score: values[criteria_id],
                                                },
                                            });
                                        },
                                    );
                                }}
                            >
                                {criterias.data?.data.map((criteria) => {
                                    const totalCriteriaScore =
                                        projectScores.data?.data
                                            .filter(
                                                (i) =>
                                                    i.criteria_id ===
                                                        criteria.id &&
                                                    i.project_id === item.id,
                                            )
                                            .map((ps) => parseInt(ps.score))
                                            .reduce(
                                                (prev, cur) => prev + cur,
                                                0,
                                            );

                                    return (
                                        <Row key={criteria.id}>
                                            <Form.Item
                                                style={{ flexGrow: 1 }}
                                                label={criteria.name}
                                                name={criteria.id}
                                                key={criteria.id}
                                            >
                                                <Rate defaultValue={5} />
                                            </Form.Item>
                                            <Typography.Text>
                                                Total: {totalCriteriaScore}
                                            </Typography.Text>
                                        </Row>
                                    );
                                })}
                                <Button htmlType={"submit"}>Save</Button>
                            </Form>
                        </Card>
                    );
                }}
            />
        </Card>
    );
};
