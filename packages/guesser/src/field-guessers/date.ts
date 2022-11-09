import dayjs from "dayjs";
import { FieldGuesser } from "@/types";

const dateSuffixRegexp = /(_at|_on|At|On|AT|ON)(\[\])?$/;

export const dateGuess: FieldGuesser = (key, value) => {
    const isDateField =
        dateSuffixRegexp.test(key) && dayjs(value as string).isValid();
    const isValidDateString =
        typeof value === "string" && dayjs(value).isValid();

    if (isDateField || isValidDateString) {
        return {
            key,
            type: "date",
            priority: 1,
        };
    }

    return false;
};
