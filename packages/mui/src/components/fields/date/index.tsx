import React from "react";

import { RefineFieldDateProps } from "@pankod/refine-ui-types";
import dayjs, { ConfigType } from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { Typography, TypographyProps } from "@mui/material";

dayjs.extend(LocalizedFormat);

export type DateFieldProps = RefineFieldDateProps<ConfigType, TypographyProps>;

/**
 * This field is used to display dates. It uses {@link https://day.js.org/docs/en/display/format `Day.js`} to display date format and
 * Material UI {@link https://mui.com/material-ui/react-typography/#main-content `<Typography>`} component
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/fields/date} for more details.
 */
export const DateField: React.FC<DateFieldProps> = ({
    value,
    format: dateFormat = "L",
    ...rest
}) => {
    return (
        <Typography variant="body2" {...rest}>
            {dayjs(value).format(dateFormat)}
        </Typography>
    );
};
