import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CreateButton } from "@refinedev/antd";
import { useGetToPath } from "@refinedev/core";

import { Col, Row } from "antd";

import { CalendarUpcomingEvents } from "@/components";

import { Calendar, CalendarCategories } from "./components";

export const CalendarPageWrapper: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const navigate = useNavigate();
    const getToPath = useGetToPath();
    const [selectedEventCategory, setSelectedEventCategory] = useState<
        string[]
    >([]);

    return (
        <div className="page-container">
            <Row gutter={[32, 32]}>
                <Col xs={24} xl={6}>
                    <CreateButton
                        block
                        size="large"
                        style={{ marginBottom: "1rem" }}
                    >
                        Create event
                    </CreateButton>

                    <CalendarUpcomingEvents
                        limit={3}
                        cardProps={{ style: { marginBottom: "1rem" } }}
                    />

                    <CalendarCategories
                        onChange={(event) => {
                            setSelectedEventCategory((prev) => {
                                if (prev.includes(event.target.value)) {
                                    return prev.filter(
                                        (item) => item !== event.target.value,
                                    );
                                }

                                return [...prev, event.target.value];
                            });
                        }}
                    />
                </Col>
                <Col xs={24} xl={18}>
                    <Calendar
                        onClickEvent={({ id }) => {
                            navigate(
                                getToPath({
                                    action: "show",
                                    meta: {
                                        id,
                                    },
                                }) ?? "",
                                {
                                    replace: true,
                                },
                            );
                        }}
                        categoryId={selectedEventCategory}
                    />
                </Col>
            </Row>
            {children}
        </div>
    );
};
