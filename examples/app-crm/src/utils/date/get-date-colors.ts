import dayjs from "dayjs";

type DateColors = "error" | "warning" | "default";

export const getDateColor = (args: { date: string }): DateColors => {
    const date = dayjs(args.date);
    const today = dayjs();

    if (date.isBefore(today)) {
        return "error";
    }

    if (date.isBefore(today.add(3, "day"))) {
        return "warning";
    }

    return "default";
};
