import { CrudFilters, HttpError, useUpdate } from "@refinedev/core";

import { List, useSimpleList, DateField } from "@refinedev/antd";

import {
    Typography,
    List as AntdList,
    Form,
    Row,
    Col,
    Tag,
    Radio,
    Space,
    Descriptions,
    Button,
    Card,
} from "antd";

import { IFeedback, IFeedbackFilterVariables, FeedBackType } from "interfaces";

const { Paragraph } = Typography;

const addTagColor = (type: FeedBackType) => {
    switch (type) {
        case "issue":
            return "error";
        case "idea":
            return "orange";
        default:
            return "default";
    }
};

export const FeedbackList: React.FC = () => {
    const { listProps, searchFormProps } = useSimpleList<
        IFeedback,
        HttpError,
        IFeedbackFilterVariables
    >({
        initialSorter: [{ field: "created_at", order: "desc" }],
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { type } = params;

            filters.push({
                field: "type",
                operator: "eq",
                value: type || undefined,
            });

            return filters;
        },
    });

    const { mutate, isLoading } = useUpdate();

    const renderItem = (item: IFeedback) => {
        const { id, description, type, page, created_at } = item;
        return (
            <AntdList.Item>
                <Card hoverable>
                    <AntdList.Item.Meta
                        description={
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Tag
                                    color={addTagColor(type)}
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {type}
                                </Tag>
                                <DateField format="LLL" value={created_at} />
                            </div>
                        }
                    />
                    <Paragraph strong>{description}</Paragraph>
                    <Descriptions
                        labelStyle={{ color: "grey", fontWeight: 600 }}
                    >
                        <Descriptions.Item label="Path">
                            {page}
                        </Descriptions.Item>
                    </Descriptions>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "end",
                            gap: "4px",
                        }}
                    >
                        <Button
                            size="small"
                            loading={isLoading}
                            onClick={() =>
                                mutate({
                                    id,
                                    resource: "feedbacks",
                                    values: {
                                        type: "archive",
                                    },
                                })
                            }
                        >
                            Archive
                        </Button>
                    </div>
                </Card>
            </AntdList.Item>
        );
    };

    return (
        <List title="" headerProps={{ style: { height: "100%" } }}>
            <Row gutter={[64, 0]} justify="center">
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                    <Form
                        {...searchFormProps}
                        layout="vertical"
                        onValuesChange={() => searchFormProps.form?.submit()}
                        initialValues={{
                            type: "",
                        }}
                    >
                        <Form.Item label="FILTERS" name="type">
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio.Button value="">All</Radio.Button>
                                    <Radio.Button value="issue">
                                        Issue
                                    </Radio.Button>
                                    <Radio.Button value="idea">
                                        Idea
                                    </Radio.Button>
                                    <Radio.Button value="other">
                                        Other
                                    </Radio.Button>
                                    <Radio.Button value="archive">
                                        Archive
                                    </Radio.Button>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                    <AntdList
                        {...listProps}
                        split={false}
                        renderItem={renderItem}
                        itemLayout="vertical"
                    />
                </Col>
            </Row>
        </List>
    );
};
