import React, { FC } from "react";
import { Quote, QuoteUpdateInput } from "../../../interfaces/graphql";
import { Button, ConfigProvider, Space } from "antd";
import { HttpError, useUpdate } from "@refinedev/core";

interface Props {
    id: string;
    status: Quote["status"];
    style?: React.CSSProperties;
}

export const Status: FC<Props> = ({ id, status, style }) => {
    const { mutate } = useUpdate<Quote, HttpError, QuoteUpdateInput>();

    const onStatusChange = (newStatus: Quote["status"]) => {
        mutate({
            resource: "quotes",
            id,
            values: {
                status: newStatus,
            },
            mutationMode: "optimistic",
            invalidates: [],
        });
    };

    const variant = {
        DRAFT: {
            color: "#0958D9",
        },
        SENT: {
            color: "#08979C",
        },
        ACCEPTED: {
            color: "#389E0D",
        },
    } as const;

    const step = {
        DRAFT: 0,
        SENT: 1,
        ACCEPTED: 2,
    } as const;

    return (
        <div style={style}>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimaryHover: variant[status].color,
                            colorPrimary: variant[status].color,
                        },
                    },
                }}
            >
                <Space>
                    <Button
                        type="primary"
                        onClick={() => onStatusChange("DRAFT")}
                    >
                        Draft
                    </Button>
                    <Button
                        type={step[status] > 0 ? "primary" : "default"}
                        onClick={() => onStatusChange("SENT")}
                    >
                        Sent
                    </Button>
                    <Button
                        type={step[status] > 1 ? "primary" : "default"}
                        onClick={() => onStatusChange("ACCEPTED")}
                    >
                        Accepted
                    </Button>
                </Space>
            </ConfigProvider>
        </div>
    );
};
