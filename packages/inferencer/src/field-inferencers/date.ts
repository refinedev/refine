import dayjs from "dayjs";
import { FieldInferencer } from "@/types";

const dateSuffixRegexp = /(_at|_on|At|On|AT|ON)(\[\])?$/;

export const dateInfer: FieldInferencer = (key, value) => {
    const isDateField =
        dateSuffixRegexp.test(key) && dayjs(value as string).isValid();
    const isValidDateString =
        typeof value === "string" && dayjs(value).isValid();

    const isAcceptableLength = typeof value === "string" && value.length > 4;

    if (isDateField || (isValidDateString && isAcceptableLength)) {
        return {
            key,
            type: "date",
            priority: 1,
        };
    }

    return false;
};
