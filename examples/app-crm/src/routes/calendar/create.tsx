import React from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetToPath } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import dayjs from "dayjs";

import { CalendarForm } from "../../components/calender/form";
import { Event } from "../../interfaces/graphql";

export const CalendarCreatePage = () => {
    const [isAllDayEvent, setIsAllDayEvent] = React.useState(false);
    const navigate = useNavigate();
    const getToPath = useGetToPath();

    const { formProps, saveButtonProps, form, onFinish } = useForm<Event>({
        resource: "events",
        queryOptions: {
            enabled: false,
        },
        mutationMeta: {
            operation: "createOneEvent",
        },
    });

    const handleOnFinish = async (values: any) => {
        const { date, ...otherValues } = values;

        let startDate = dayjs.utc(date[0]);
        let endDate = dayjs.utc(date[1]);

        if (isAllDayEvent) {
            startDate = startDate.startOf("day");
            endDate = endDate.endOf("day");
        }

        await onFinish({
            ...otherValues,
            startDate: startDate.utc().toISOString(),
            endDate: endDate.utc().toISOString(),
        });
    };

    return (
        <Modal
            title="Create Event"
            open
            onCancel={() => {
                navigate(
                    getToPath({
                        action: "list",
                    }) ?? "",
                    {
                        replace: true,
                    },
                );
            }}
            okButtonProps={{
                ...saveButtonProps,
            }}
            okText="Save"
        >
            <CalendarForm
                isAllDayEvent={isAllDayEvent}
                setIsAllDayEvent={setIsAllDayEvent}
                form={form}
                formProps={{
                    ...formProps,
                    onFinish: handleOnFinish,
                }}
            />
        </Modal>
    );
};
