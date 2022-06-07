import React from "react";

import dayjs, { ConfigType } from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { Typography, TypographyProps } from "@mui/material";

import { FieldProps } from "src/interfaces/field";

dayjs.extend(LocalizedFormat);

type DateProps = {
    locales?: string;
    format?: string;
};

export type DateFieldProps = FieldProps<ConfigType> &
    DateProps &
    TypographyProps;

/**
 * This field is used to display dates. It uses {@link https://day.js.org/docs/en/display/format `Day.js`} to display date format and
 * Material UI {@link https://mui.com/material-ui/react-typography/#main-content `<Typography>`} component
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
