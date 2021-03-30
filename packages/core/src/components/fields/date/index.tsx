import React from "react";
import dayjs from "dayjs";

import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { BaseFieldProps } from "../../../interfaces";
import { renderFieldRecord } from "@definitions";

dayjs.extend(LocalizedFormat);

type DateProps = {
    locales?: string;
    format?: string;
};

export type DateFieldProps = BaseFieldProps & DateProps;

export const DateField: React.FC<DateFieldProps> = ({
    value,
    record,
    renderRecordKey,
    format: dateFormat = "L",
}) => (
    <span>
        {dayjs(renderFieldRecord({ value, record, renderRecordKey })).format(
            dateFormat,
        )}
    </span>
);
