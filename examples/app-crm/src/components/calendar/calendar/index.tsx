import React from "react";
import { useList } from "@refinedev/core";
import { Card, Button, Radio, Grid } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import { Text } from "../../text";
import { Event } from "../../../interfaces/graphql";

import styles from "./index.module.css";

type CalendarProps = {
    categoryId?: string[];
    onClickEvent?: (event: Event) => void;
};

export const Calendar: React.FC<CalendarProps> = ({
    categoryId,
    onClickEvent,
}) => {
    const calendarRef = React.useRef<FullCalendar>(null);
    const [title, setTitle] = React.useState(
        calendarRef.current?.getApi().view.title,
    );
    const { md } = Grid.useBreakpoint();

    React.useEffect(() => {
        if (!md) {
            calendarRef.current?.getApi().changeView("dayGridDay");
        }
    }, [md]);

    const { data } = useList<Event>({
        pagination: {
            mode: "off",
        },
        filters: [
            {
                field: "category.id",
                operator: "in",
                value: categoryId?.length ? categoryId : undefined,
            },
        ],
        meta: {
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
            ],
        },
    });

    const events = data?.data.map(
        ({ id, title, startDate, endDate, color }) => ({
            id: id,
            title: title,
            start: startDate,
            end: endDate,
            color: color,
            allDay:
                dayjs(endDate).diff(dayjs(startDate), "days") > 0
                    ? true
                    : false,
        }),
    );

    return (
        <Card>
            <div className={styles.calendar_header}>
                <div className={styles.actions}>
                    <Button
                        onClick={() => {
                            calendarRef.current?.getApi().prev();
                        }}
                        shape="circle"
                        icon={<LeftOutlined />}
                    />
                    <Button
                        onClick={() => {
                            calendarRef.current?.getApi().next();
                        }}
                        shape="circle"
                        icon={<RightOutlined />}
                    />
                </div>
                <Text className={styles.title} size="lg">
                    {title}
                </Text>
                <Radio.Group
                    // defaultValue="dayGridMonth"
                    value={calendarRef.current?.getApi().view.type}
                >
                    <Radio.Button
                        value="dayGridMonth"
                        onClick={() => {
                            calendarRef.current
                                ?.getApi()
                                .changeView("dayGridMonth");
                        }}
                    >
                        Month
                    </Radio.Button>
                    <Radio.Button
                        value="dayGridWeek"
                        onClick={() => {
                            calendarRef.current
                                ?.getApi()
                                .changeView("dayGridWeek");
                        }}
                    >
                        Week
                    </Radio.Button>
                    <Radio.Button
                        value="dayGridDay"
                        onClick={() => {
                            calendarRef.current
                                ?.getApi()
                                .changeView("dayGridDay");
                        }}
                    >
                        Day
                    </Radio.Button>
                </Radio.Group>
            </div>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin]}
                initialView={"dayGridMonth"}
                events={events}
                eventTimeFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    meridiem: false,
                }}
                eventClick={({ event }) => {
                    onClickEvent?.(
                        data?.data.find(({ id }) => id === event.id) as Event,
                    );
                }}
                datesSet={({ view }) => {
                    setTitle(view.title);
                }}
                headerToolbar={false}
                nextDayThreshold="23:59:59"
            />
        </Card>
    );
};
