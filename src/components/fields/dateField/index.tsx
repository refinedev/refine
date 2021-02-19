import React from "react";
import dayjs from "dayjs";

import LocalizedFormat from "dayjs/plugin/localizedFormat";
/* import "dayjs/locale/tr"; */

import { BaseFieldProps } from "@interfaces";
import { fieldContent } from "@definitions";

dayjs.extend(LocalizedFormat);
/* dayjs.locale("tr"); */

type DateProps = {
    locales?: string;
    format?: string;
};

export type DateFieldProps = BaseFieldProps & DateProps;

export const DateField: React.FC<DateFieldProps> = ({
    record,
    source,
    format: dateFormat = "L",
}) => <div>{dayjs(fieldContent({ record, source })).format(dateFormat)}</div>;
