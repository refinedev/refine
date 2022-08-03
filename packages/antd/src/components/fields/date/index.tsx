import React from "react";
import dayjs, { ConfigType } from "dayjs";
import { RefineFieldDateProps } from "@pankod/refine-ui-types";
import { Typography } from "antd";
import { TextProps } from "antd/lib/typography/Text";

import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

export type DateFieldProps = RefineFieldDateProps<ConfigType, TextProps>;

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
