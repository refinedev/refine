import React, { useContext, useEffect, useState } from "react";
import { Timeline, Card, Spin, Alert } from "antd";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import dayjs from "dayjs";

import { useTranslate } from "@hooks/translate";
import { DataContext } from "@contexts/data";
import { IDataContext, ResourceRouterParams, Revision } from "../../interfaces";
import { useResourceWithRoute } from "@hooks/resource";

type RevisionProps = {
    resource?: string;
    id?: string;
};

export const Revisions: React.FC<RevisionProps> = ({
    resource: resourceFromProps,
    id: idFromProps,
}) => {
    const { resource: routeResourceName, id: routeId } =
        useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(routeResourceName ?? resourceFromProps);
    const id = routeId ?? idFromProps;

    const translate = useTranslate();
    const [loading, setLoading] = useState(true);
    const [revisionData, setRevisionData] = useState<Revision[]>([]);

    const { revisions } = useContext<IDataContext>(DataContext);

    if (!revisions) {
        return (
            <Alert
                showIcon
                type="error"
                message="Revision History is not configured."
                description={
                    <>
                        For configuration details, see
                        <a
                            target="_blank"
                            href="https://google.com"
                            rel="noreferrer"
                            style={{ paddingLeft: 5 }}
                        >
                            documentation
                        </a>
                    </>
                }
            />
        );
    }

    if (!resource || !id) {
        return (
            <Alert showIcon type="error" message="Resource or id not found!" />
        );
    }

    useEffect(() => {
        (async () => {
            const { data } = await revisions(resource.name, id);

            setRevisionData(data);
            setLoading(false);
        })();
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div style={{ textAlign: "center" }}>
                    <Spin spinning />
                </div>
            );
        }

        return (
            <Timeline mode="left">
                {revisionData.map((item) => {
                    if (item.action === "create") {
                        return (
                            <Timeline.Item
                                key={item.id}
                                dot={
                                    <PlusCircleOutlined
                                        style={{ fontSize: "16px" }}
                                    />
                                }
                            >
                                {translate(
                                    "revisions.create",
                                    {
                                        name: `${item.user.firstName} ${item.user.lastName}`,
                                        date: dayjs(item.date).fromNow(),
                                    },
                                    `Created by ${item.user.firstName} ${
                                        item.user.lastName
                                    } on ${dayjs(item.date).fromNow()}`,
                                )}
                            </Timeline.Item>
                        );
                    }

                    return (
                        <Timeline.Item
                            key={item.id}
                            dot={<EditOutlined style={{ fontSize: "16px" }} />}
                        >
                            {translate(
                                "revisions.edit",
                                {
                                    name: `${item.user.firstName} ${item.user.lastName}`,
                                    date: dayjs(item.date).fromNow(),
                                },
                                `Edited by ${item.user.firstName} ${
                                    item.user.lastName
                                } on ${dayjs(item.date).fromNow()}`,
                            )}
                        </Timeline.Item>
                    );
                })}
            </Timeline>
        );
    };

    return (
        <Card title={translate("revisions.revisions", "Revision History")}>
            {renderContent()}
        </Card>
    );
};
