import cn from "clsx";
import React from "react";
import s from "./Swatch.module.css";
import { Check } from "@components/icons";
import Button, { ButtonProps } from "@components/ui/Button";
import { isDark } from "@lib/colors";
interface SwatchProps {
    active?: boolean;
    children?: any;
    className?: string;
    variant?: "size" | "color" | string;
    color?: string;
    label?: string | null;
}

const Swatch: React.FC<Omit<ButtonProps, "variant"> & SwatchProps> = ({
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

export default React.memo(Swatch);
