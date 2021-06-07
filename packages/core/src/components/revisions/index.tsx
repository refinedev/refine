import React, { useContext, useEffect, useState } from "react";
import { Timeline, Card, Spin, Alert, Button } from "antd";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { DataContext } from "@contexts/data";
import { IDataContext, Revision } from "../../interfaces";

type RevisionProps = {
    resource: string;
    id: string;
};

export const Revisions: React.FC<RevisionProps> = ({ resource, id }) => {
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

    useEffect(() => {
        (async () => {
            const { data } = await revisions(resource, id);

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
                                {`Created by ${item.user.firstName} ${
                                    item.user.lastName
                                } on ${dayjs(item.date).fromNow()}`}
                            </Timeline.Item>
                        );
                    }

                    return (
                        <Timeline.Item
                            key={item.id}
                            dot={<EditOutlined style={{ fontSize: "16px" }} />}
                        >
                            {`Edited by ${item.user.firstName} ${
                                item.user.lastName
                            } on ${dayjs(item.date).fromNow()}`}
                        </Timeline.Item>
                    );
                })}
            </Timeline>
        );
    };

    return <Card title="Revisions">{renderContent()}</Card>;
};
