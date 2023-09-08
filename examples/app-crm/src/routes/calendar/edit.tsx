import React from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetToPath, useResource } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import dayjs from "dayjs";

import { CalendarForm } from "../../components/calendar/form";
import { Event } from "../../interfaces/graphql";

export const CalendarEditPage = () => {
    const [isAllDayEvent, setIsAllDayEvent] = React.useState(false);
    const { id } = useResource();
    const navigate = useNavigate();
    const getToPath = useGetToPath();

    const { formProps, saveButtonProps, form, onFinish, queryResult } =
        useForm<Event>({
            action: "edit",
            id,
            queryOptions: {
                enabled: true,
            },
            queryMeta: {
                fields: [
                    "id",
                    "title",
                    "description",
                    "startDate",
                    "endDate",
                    "color",
                    "createdAt",
                    {
                        createdBy: ["id", "name"],
                    },
                    {
                        category: ["id", "title"],
                    },
                    {
                        participants: ["id", "name"],
                    },
                ],
            },
        });

    React.useEffect(() => {
        const startDate = queryResult?.data?.data.startDate;
        const endDate = queryResult?.data?.data.endDate;

        form.setFieldsValue({
            categoryId: queryResult?.data?.data.category.id,
            participantIds: queryResult?.data?.data.participants.map(
                (participant) => participant.id,
            ),
        });

        // if more then 12 hours, set as all day event
        if (dayjs(endDate).diff(dayjs(startDate), "hours") > 12) {
            setIsAllDayEvent(true);
            form.setFieldsValue({
                rangeDate: [dayjs(startDate).utc(), dayjs(endDate).utc()],
            });
        } else {
            form.setFieldsValue({
                date: dayjs(startDate).utc(),
                time: [dayjs(startDate).utc(), dayjs(endDate).utc()],
            });
        }
    }, [queryResult?.data]);

    const handleOnFinish = async (values: any) => {
        const { rangeDate, date, time, color, ...otherValues } = values;

        let startDate = dayjs();
        let endDate = dayjs();

        if (rangeDate) {
            startDate = rangeDate[0].utc().startOf("day");
            endDate = rangeDate[1].utc().endOf("day");
        } else {
            startDate = date
                .utc()
                .set("hour", time[0].hour())
                .set("minute", time[0].minute())
                .set("second", 0);

            endDate = date
                .utc()
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
            title="Edit Event"
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
