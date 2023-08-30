import { Badge } from "antd";
import dayjs, { Dayjs } from "dayjs";

import { Text } from "../text";
import { Event } from "../../interfaces/graphql";

type CalendarCellProps = {
    value: Dayjs;
    events: Event[];
    onClickEvent?: (event: Event) => void;
};

export const CalendarCell: React.FC<CalendarCellProps> = ({
    events,
    value,
    onClickEvent,
}) => {
    const todayEvents = events.filter((event) => {
        const startDate = dayjs(event.startDate);
        const endDate = dayjs(event.endDate);

        return (
            startDate.isSame(value, "day") ||
            endDate.isSame(value, "day") ||
            (startDate.isBefore(value, "day") && endDate.isAfter(value, "day"))
        );
    });

    return (
        <div>
            {todayEvents.slice(0, 3).map((item) => (
                <div onClick={() => onClickEvent?.(item)} key={item.id}>
                    <Text ellipsis={{ tooltip: true }}>
                        <Badge
                            style={{ marginRight: "0.5rem" }}
                            color={item.color}
                        />
                        {item.title}
                    </Text>
                </div>
            ))}
            {todayEvents.length > 3 && (
                <Text strong>{todayEvents.length - 3} more</Text>
            )}
        </div>
    );
};
