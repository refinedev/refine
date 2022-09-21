import React from "react";
import { RefineFieldBooleanProps } from "@pankod/refine-ui-types";
import { Tooltip, TooltipProps } from "@mantine/core";
import { Minus, Check, IconProps } from "tabler-icons-react";

export type BooleanFieldProps = RefineFieldBooleanProps<
    unknown,
    Omit<TooltipProps, "label" | "children">,
    { svgIconProps?: IconProps }
>;

/**
 * This field is used to display boolean values. It uses the {@link https://mantine.dev/core/tooltip/ `<Tooltip>`} values from Mantine.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mantine/components/fields/boolean} for more details.
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
                    ? trueIcon ?? <Check size={18} {...svgIconProps} />
                    : falseIcon ?? <Minus size={18} {...svgIconProps} />}
            </span>
        </Tooltip>
    );
};
