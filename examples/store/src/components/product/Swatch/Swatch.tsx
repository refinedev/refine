import React, { PropsWithChildren } from "react";
import cn from "clsx";

import { Check } from "@components/icons";
import { Button, ButtonProps } from "@components/ui/Button";
import { isDark } from "@lib/colors";

import s from "./Swatch.module.css";
interface SwatchProps extends PropsWithChildren {
    active?: boolean;
    className?: string;
    variant?: "size" | "color" | string;
    color?: string;
    label?: string | null;
}

export const Swatch: React.FC<Omit<ButtonProps, "variant"> & SwatchProps> = ({
    active,
    className,
    color = "",
    label = null,
    variant = "size",
    ...props
}) => {
    variant = variant?.toLowerCase();

    if (label) {
        label = label?.toLowerCase();
    }

    const swatchClassName = cn(
        s.swatch,
        {
            [s.color]: color,
            [s.active]: active,
            [s.size]: variant === "size",
            [s.dark]: color ? isDark(color) : false,
            [s.textLabel]: !color && label && label.length > 3,
        },
        className,
    );

    return (
        <Button
            role="option"
            aria-selected={active}
            aria-label={
                variant && label ? `${variant} ${label}` : "Variant Swatch"
            }
            className={swatchClassName}
            {...(label && color && { title: label })}
            style={color ? { backgroundColor: color } : {}}
            {...props}
        >
            {color && active && (
                <span>
                    <Check />
                </span>
            )}
            {!color ? label : null}
        </Button>
    );
};
