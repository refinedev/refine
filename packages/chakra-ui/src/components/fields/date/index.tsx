import React from "react";

import { RefineFieldDateProps } from "@pankod/refine-ui-types";
import dayjs, { ConfigType } from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { Text, TextProps } from "@chakra-ui/react";

dayjs.extend(LocalizedFormat);

const defaultLocale = dayjs.locale();

export type DateFieldProps = RefineFieldDateProps<ConfigType, TextProps>;

/**
 * This field is used to display dates. It uses {@link https://day.js.org/docs/en/display/format `Day.js`} to display date format and
 * Mantine {@link https://chakra-ui.com/docs/components/text `<Text>`} component
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/fields/date} for more details.
 */
export const DateField: React.FC<DateFieldProps> = ({
    value,
    locales,
    format: dateFormat = "L",
    ...rest
}) => {
    return (
        <Text {...rest}>
            {dayjs(value)
                .locale(locales || defaultLocale)
                .format(dateFormat)}
        </Text>
    );
};
