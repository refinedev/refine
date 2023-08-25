import { FC } from "react";
import { Company } from "../../interfaces/graphql";
import {
    Avatar,
    Button,
    Card,
    Col,
    Pagination,
    Row,
    Space,
    Tooltip,
} from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Text } from "../../components";
import {
    currencyNumber,
    getNameInitials,
    getRandomColorFromString,
} from "../../utilities";

type Props = {
    loading?: boolean;
    companies: readonly Company[];
    pagination: {
        pageSize: number;
        current: number;
        total: number;
        onChange: (page: number, pageSize: number) => void;
    };
};

export const CompaniesCardView: FC<Props> = ({ companies, pagination }) => {
    return (
        <>
            <Row wrap gutter={[32, 32]}>
                {companies.map((company) => {
                    return (
                        <Col
                            key={company.id}
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            xl={6}
                            xxl={4}
                        >
                            <Card
                                size="small"
                                style={{}}
                                actions={[
                                    <div
                                        key="1"
                                        style={{
                                            width: "100%",
                                            height: "60px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "0 16px",
                                        }}
                                    >
                                        <Space
                                            direction="vertical"
                                            align="start"
                                        >
                                            <Text size="xs">
                                                Related contacts
                                            </Text>
                                            <Avatar.Group
                                                maxCount={3}
                                                size="small"
                                            >
                                                {company?.contacts?.nodes?.map(
                                                    (contact) => {
                                                        return (
                                                            <Tooltip
                                                                title={
                                                                    contact.name
                                                                }
                                                                key={contact.id}
                                                            >
                                                                <Avatar
                                                                    src={
                                                                        contact.avatarUrl
                                                                    }
                                                                    size="small"
                                                                    style={{
                                                                        textTransform:
                                                                            "uppercase",
                                                                        backgroundColor:
                                                                            getRandomColorFromString(
                                                                                contact.name,
                                                                            ),
                                                                    }}
                                                                >
                                                                    {getNameInitials(
                                                                        {
                                                                            name: contact.name,
                                                                        },
                                                                    )}
                                                                </Avatar>
                                                            </Tooltip>
                                                        );
                                                    },
                                                )}
                                            </Avatar.Group>
                                        </Space>
                                        <Space direction="vertical" align="end">
                                            <Text size="xs">Sales owner</Text>
                                            <Tooltip
                                                title={
                                                    company?.salesOwner?.name
                                                }
                                                key={company?.salesOwner?.id}
                                            >
                                                <Avatar
                                                    src={
                                                        company?.salesOwner
                                                            ?.avatarUrl
                                                    }
                                                    size="small"
                                                    style={{
                                                        textTransform:
                                                            "uppercase",
                                                        backgroundColor:
                                                            getRandomColorFromString(
                                                                company
                                                                    ?.salesOwner
                                                                    ?.name,
                                                            ),
                                                    }}
                                                >
                                                    {getNameInitials({
                                                        name: company
                                                            ?.salesOwner?.name,
                                                    })}
                                                </Avatar>
                                            </Tooltip>
                                        </Space>
                                    </div>,
                                ]}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        position: "relative",
                                    }}
                                >
                                    <Button
                                        type="text"
                                        shape="circle"
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                        }}
                                        icon={
                                            <MoreOutlined
                                                style={{
                                                    transform: "rotate(90deg)",
                                                }}
                                            />
                                        }
                                    />
                                    <Avatar
                                        size="small"
                                        src={company.avatarUrl}
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                            display: "flex",
                                            alignItems: "center",
                                            textTransform: "uppercase",
                                            backgroundColor:
                                                getRandomColorFromString(
                                                    company.name,
                                                ),
                                        }}
                                    >
                                        {getNameInitials({
                                            name: company.name,
                                        })}
                                    </Avatar>

                                    <Text
                                        strong
                                        size="md"
                                        ellipsis={{ tooltip: company.name }}
                                        style={{
                                            marginTop: "12px",
                                        }}
                                    >
                                        {company.name}
                                    </Text>

                                    <Space
                                        direction="vertical"
                                        size={0}
                                        style={{
                                            marginTop: "8px",
                                        }}
                                    >
                                        <Text type="secondary">
                                            Open deals amount
                                        </Text>
                                        <Text
                                            strong
                                            size="md"
                                            style={{
                                                marginTop: "12px",
                                            }}
                                        >
                                            {currencyNumber(
                                                company.totalRevenue || 0,
                                            )}
                                        </Text>
                                    </Space>
                                </div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            <Pagination
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "32px",
                }}
                hideOnSinglePage
                total={pagination.total}
                current={pagination.current}
                pageSize={pagination.pageSize}
                pageSizeOptions={["12", "24", "48", "96"]}
                onChange={(page: number, pageSize: number) => {
                    pagination.onChange(page, pageSize);
                }}
                showTotal={(total) => {
                    return (
                        <span
                            style={{
                                marginLeft: "48px",
                            }}
                        >
                            <span className="ant-text secondary">{total}</span>{" "}
                            compaines in total
                        </span>
                    );
                }}
            />
        </>
    );
};
