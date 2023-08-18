import dayjs from "dayjs";

export const getDateHumanize = (date: string): string => {
    const dateObject = dayjs(date);
    const now = dayjs();

    const duration = dayjs.duration(dateObject.diff(now));
    return dayjs.duration(duration.asMinutes(), "minute").humanize(true);
};
