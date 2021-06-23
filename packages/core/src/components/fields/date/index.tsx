import React from "react";
import dayjs, { ConfigType } from "dayjs";
import { Typography } from "antd";

import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { FieldProps } from "../../../interfaces";

dayjs.extend(LocalizedFormat);

type DateProps = {
    locales?: string;
    format?: string;
};

export type DateFieldProps = FieldProps<ConfigType> & DateProps;

export const DateField: React.FC<DateFieldProps> = ({
    value,
    format: dateFormat = "L",
}) => {
    const { Text } = Typography;

    return <Text>{dayjs(value).format(dateFormat)}</Text>;
};
