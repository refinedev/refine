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
        const startDate = dayjs.utc(queryResult?.data?.data.startDate);
        const endDate = dayjs.utc(queryResult?.data?.data.endDate);

        form.setFieldsValue({
            categoryId: queryResult?.data?.data.category.id,
            participantIds: queryResult?.data?.data.participants.map(
                (participant) => participant.id,
            ),
            date: [startDate, endDate],
        });

        // check if event is all day
        if (
            startDate.isSame(startDate.startOf("day")) &&
            endDate.isSame(endDate.endOf("day"))
        ) {
            setIsAllDayEvent(true);
        }
    }, [queryResult?.data]);

    const handleOnFinish = async (values: any) => {
        const { date, color, ...otherValues } = values;

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
