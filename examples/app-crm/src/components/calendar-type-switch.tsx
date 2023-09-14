import React from "react";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetToPath } from "@refinedev/core";

export const CalendarTypeSwitch: React.FC = () => {
    const { type } = useParams();

    const navigate = useNavigate();
    const getToPath = useGetToPath();

    const onTypeChange = (event: RadioChangeEvent) => {
        navigate(
            getToPath({
                action: "list",
                meta: {
                    type: event.target.value,
                },
            }) ?? "",
            {
                replace: true,
            },
        );
    };

    return (
        <Radio.Group onChange={onTypeChange} value={type}>
            <Radio.Button value="month">month</Radio.Button>
            <Radio.Button value="list">list</Radio.Button>
        </Radio.Group>
    );
};
