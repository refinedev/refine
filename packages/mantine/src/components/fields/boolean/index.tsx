import React from "react";
import { RefineFieldBooleanProps } from "@pankod/refine-ui-types";
import { Tooltip, TooltipProps } from "@mantine/core";
import { IconX, IconCheck, TablerIconProps } from "@tabler/icons";

export type BooleanFieldProps = RefineFieldBooleanProps<
    unknown,
    Omit<TooltipProps, "label" | "children">,
    { svgIconProps?: TablerIconProps }
>;

/**
 * This field is used to display boolean values. It uses the {@link https://mantine.dev/core/tooltip/ `<Tooltip>`} values from Mantine.
 *
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/fields/boolean} for more details.
 */
export const BooleanField: React.FC<BooleanFieldProps> = ({
    value,
    valueLabelTrue = "true",
    valueLabelFalse = "false",
    trueIcon,
    falseIcon,
    svgIconProps,
    ...rest
}) => {
    return (
        <Tooltip label={value ? valueLabelTrue : valueLabelFalse} {...rest}>
            <span>
                {value
                    ? trueIcon ?? <IconCheck size={18} {...svgIconProps} />
                    : falseIcon ?? <IconX size={18} {...svgIconProps} />}
            </span>
        </Tooltip>
    );
};
