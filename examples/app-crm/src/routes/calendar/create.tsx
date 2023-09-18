import React, { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { HttpError, useGetToPath } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import dayjs from "dayjs";

import { CalendarForm } from "../../components/calendar/form";
import { Event, EventCreateInput } from "../../interfaces/graphql";

type FormValues = EventCreateInput & {
    rangeDate: [dayjs.Dayjs, dayjs.Dayjs];
    date: dayjs.Dayjs;
    time: [dayjs.Dayjs, dayjs.Dayjs];
    color: any;
};

export const CalendarCreatePage: React.FC = () => {
    const [isAllDayEvent, setIsAllDayEvent] = useState(false);
    const navigate = useNavigate();
    const getToPath = useGetToPath();

    const { formProps, saveButtonProps, form, onFinish } = useForm<
        Event,
        HttpError,
        EventCreateInput
    >();

    const handleOnFinish = async (values: FormValues) => {
        const { rangeDate, date, time, color, ...otherValues } = values;

        let startDate = dayjs();
        let endDate = dayjs();

        if (rangeDate) {
            startDate = rangeDate[0].startOf("day");
            endDate = rangeDate[1].endOf("day");
        } else {
            startDate = date
                .set("hour", time[0].hour())
                .set("minute", time[0].minute())
                .set("second", 0);

            endDate = date
                .set("hour", time[1].hour())
                .set("minute", time[1].minute())
                .set("second", 0);
        }

        await onFinish({
            ...otherValues,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            color: typeof color === "object" ? `#${color.toHex()}` : color,
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
            width={560}
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
