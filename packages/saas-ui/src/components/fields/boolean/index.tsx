import React from "react";
import { RefineFieldBooleanProps } from "@pankod/refine-ui-types";
import { Tooltip, TooltipProps } from "@chakra-ui/react";
import { IconMinus, IconCheck, TablerIconProps } from "@tabler/icons";

export type BooleanFieldProps = RefineFieldBooleanProps<
    unknown,
    Omit<TooltipProps, "label" | "children">,
    { svgIconProps?: TablerIconProps }
>;

/**
 * This field is used to display boolean values. It uses the {@link https://chakra-ui.com/docs/components/tooltip `<Tooltip>`} values from Chakra UI.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/fields/boolean} for more details.
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
                    ? trueIcon ?? <IconCheck size={20} {...svgIconProps} />
                    : falseIcon ?? <IconMinus size={20} {...svgIconProps} />}
            </span>
        </Tooltip>
    );
};
