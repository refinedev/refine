import { parseISO, format, formatDistanceToNow } from "date-fns";

export const formattedDate = (time: string) =>
    format(new Date(parseISO(time)), "MMM dd yyyy, HH:mm");

export const timeFromNow = (time: string) =>
    formatDistanceToNow(new Date(parseISO(time)));
