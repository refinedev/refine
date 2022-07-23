import cn from "clsx";
import React, {
    forwardRef,
    ButtonHTMLAttributes,
    JSXElementConstructor,
    useRef,
} from "react";
import mergeRefs from "react-merge-refs";
import s from "./Button.module.css";
import { LoadingDots } from "@components/ui";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    className?: string;
    variant?: "flat" | "slim" | "ghost" | "naked";
    active?: boolean;
    type?: "submit" | "reset" | "button";
    Component?: string | JSXElementConstructor<any>;
    width?: string | number;
    loading?: boolean;
    disabled?: boolean;
}

// eslint-disable-next-line react/display-name
const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
    const {
        className,
        variant = "flat",
        children,
        active,
        width,
        loading = false,
        disabled = false,
        style = {},
        Component = "button",
        ...rest
    } = props;
    const ref = useRef<typeof Component>(null);

    const rootClassName = cn(
        s.root,
        {
            [s.ghost]: variant === "ghost",
            [s.slim]: variant === "slim",
            [s.naked]: variant === "naked",
            [s.loading]: loading,
            [s.disabled]: disabled,
        },
        className,
    );

    return (
        <Component
            aria-pressed={active}
            data-variant={variant}
            ref={mergeRefs([ref, buttonRef])}
            className={rootClassName}
            disabled={disabled}
            style={{
                width,
                ...style,
            }}
            {...rest}
        >
            {children}
            {/* {loading && (
                <i className="pl-2 m-0 flex">
                    <LoadingDots />
                </i>
            )} */}
        </Component>
    );
});

export default Button;
