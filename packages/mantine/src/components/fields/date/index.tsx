import React from "react";

import { RefineFieldDateProps } from "@pankod/refine-ui-types";
import dayjs, { ConfigType } from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { Text, TextProps } from "@mantine/core";

dayjs.extend(LocalizedFormat);

export type DateFieldProps = RefineFieldDateProps<ConfigType, TextProps>;

/**
 * This field is used to display dates. It uses {@link https://day.js.org/docs/en/display/format `Day.js`} to display date format and
 * Mantine {@link https://mantine.dev/core/text/ `<Text>`} component
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/fields/date} for more details.
 */
export const DateField: React.FC<DateFieldProps> = ({
    value,
    format: dateFormat = "L",
    ...rest
}) => {
    return <Text {...rest}>{dayjs(value).format(dateFormat)}</Text>;
};
