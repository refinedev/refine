import React from "react";
import dayjs, { ConfigType } from "dayjs";

import LocalizedFormat from "dayjs/plugin/localizedFormat";
import RelativeTime from "dayjs/plugin/relativeTime";

import { FieldProps } from "../../../interfaces";

dayjs.extend(LocalizedFormat);
dayjs.extend(RelativeTime);

type DateProps = {
    locales?: string;
    format?: string;
};

export type DateFieldProps = FieldProps<ConfigType> & DateProps;

export const DateField: React.FC<DateFieldProps> = ({
    value,
    format: dateFormat = "L",
}) => <span>{dayjs(value).format(dateFormat)}</span>;
