import { IResourceComponentsProps } from "@pankod/refine-core";

import { Badge, BadgeProps, Calendar, Show } from '@pankod/refine-antd';
import { CalendarMode } from "antd/lib/calendar/generateCalendar";
import dayjs from "dayjs";
import "./index.css";

const getListData = (value: dayjs.Dayjs) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: "warning", content: "This is warning event." },
                { type: "success", content: "This is usual event." },
            ];
            break;
        case 10:
            listData = [
                { type: "warning", content: "This is warning event." },
                { type: "success", content: "This is usual event." },
                { type: "error", content: "This is error event." },
            ];
            break;
        case 15:
            listData = [
                { type: "warning", content: "This is warning event" },
                {
                    type: "success",
                    content: "This is very long usual event。。....",
                },
                { type: "error", content: "This is error event 1." },
                { type: "error", content: "This is error event 2." },
                { type: "error", content: "This is error event 3." },
                { type: "error", content: "This is error event 4." },
            ];
            break;
        default:
    }
    return listData || [];
};

const getMonthData = (value: dayjs.Dayjs) => {
    if (value.month() === 8) {
        return 1394;
    }
};

export const CalendarPage: React.FC<IResourceComponentsProps> = () => {
    const monthCellRender = (value: dayjs.Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const panelChange = (value: dayjs.Dayjs, mode: CalendarMode) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    const dateCellRender = (value: dayjs.Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge
                            status={item.type as BadgeProps["status"]}
                            text={item.content}
                        />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Show pageHeaderProps={{ extra: null }}>
            <Calendar
                onPanelChange={panelChange}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
            />
        </Show>
    );
};
