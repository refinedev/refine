import React from "react";
import dayjs, { ConfigType } from "dayjs";
import { Typography } from "antd";
import { TextProps } from "antd/lib/typography/Text";

import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { FieldProps } from "../../../interfaces";

dayjs.extend(LocalizedFormat);

type DateProps = {
    locales?: string;
    format?: string;
};

export type DateFieldProps = FieldProps<ConfigType> & DateProps & TextProps;

/**
 * This field is used to display dates. It uses {@link https://day.js.org/docs/en/display/format `Day.js`} to display date format.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/date} for more details.
 */
export const DateField: React.FC<DateFieldProps> = ({
    value,
    format: dateFormat = "L",
    ...rest
}) => {
    const { Text } = Typography;

    return <Text {...rest}>{dayjs(value).format(dateFormat)}</Text>;
};
