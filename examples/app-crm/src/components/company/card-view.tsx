import { FC } from "react";
import {
    Button,
    Card,
    Col,
    Dropdown,
    Pagination,
    Row,
    Space,
    Tooltip,
} from "antd";
import { DeleteOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";

import { Text, CustomAvatar } from "..";
import { currencyNumber } from "../../utilities";
import { Company } from "../../interfaces/graphql";
import { useDelete, useNavigation } from "@refinedev/core";
import { CustomAvatarGroup } from "../custom-avatar-group";

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
    const { edit } = useNavigation();
    const { mutate } = useDelete();

    return (
        <>
            <Row wrap gutter={[32, 32]}>
                {companies.map((company) => {
                    const relatedContactAvatars = company.contacts?.nodes?.map(
                        (contact) => {
                            return {
                                name: contact.name,
                                src: contact.avatarUrl as string | undefined,
                            };
                        },
                    );

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
                                actions={[
                                    <div
                                        key="1"
                                        style={{
                                            width: "100%",
                                            height: "60px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
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
                                            <CustomAvatarGroup
                                                size={"small"}
                                                overlap
                                                gap="4px"
                                                avatars={relatedContactAvatars}
                                            />
                                        </Space>
                                        <Space direction="vertical" align="end">
                                            <Text size="xs">Sales owner</Text>
                                            <Tooltip
                                                title={company.salesOwner?.name}
                                                key={company.salesOwner?.id}
                                            >
                                                <CustomAvatar
                                                    name={
                                                        company.salesOwner?.name
                                                    }
                                                    src={
                                                        company.salesOwner
                                                            ?.avatarUrl
                                                    }
                                                />
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
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    label: "View company",
                                                    key: "1",
                                                    icon: <EyeOutlined />,
                                                    onClick: () => {
                                                        edit(
                                                            "companies",
                                                            company.id,
                                                        );
                                                    },
                                                },
                                                {
                                                    danger: true,
                                                    label: "Delete company",
                                                    key: "2",
                                                    icon: <DeleteOutlined />,
                                                    onClick: () => {
                                                        mutate({
                                                            resource: "company",
                                                            id: company.id,
                                                        });
                                                    },
                                                },
                                            ],
                                        }}
                                        placement="bottom"
                                        arrow
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
                                                        transform:
                                                            "rotate(90deg)",
                                                    }}
                                                />
                                            }
                                        />
                                    </Dropdown>

                                    <CustomAvatar
                                        name={company.name}
                                        src={company.avatarUrl}
                                        shape="square"
                                        style={{
                                            width: "48px",
                                            height: "48px",
                                        }}
                                    />
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
                                            alignItems: "center",
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
                                                company?.dealsAggregate?.[0].sum
                                                    ?.value || 0,
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
