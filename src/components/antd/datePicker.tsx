import * as React from "react";

import dayjs, { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker, {
    PickerProps,
} from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/index";

const DayJSDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export const DatePicker = React.forwardRef<any, PickerProps<Dayjs>>(
    (props, ref) => {
        const value: any = props.value;

        return (
            <DayJSDatePicker
                {...props}
                defaultValue={dayjs(value)}
                value={dayjs(value)}
                ref={ref}
            />
        );
    },
);

DatePicker.displayName = "DatePicker";
