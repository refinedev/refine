import cn from "clsx";
import s from "./Marquee.module.css";
import { ReactNode, Component, Children } from "react";
import { default as FastMarquee } from "react-fast-marquee";

interface MarqueeProps {
    className?: string;
    children?: ReactNode[] | Component[] | any[]; // eslint-disable-line
    variant?: "primary" | "secondary";
}

export const Marquee: React.FC<MarqueeProps> = ({
    className = "",
    children,
    variant = "primary",
}) => {
    const rootClassName = cn(
        s.root,
        {
            [s.primary]: variant === "primary",
            [s.secondary]: variant === "secondary",
        },
        className,
    );

    return (
        <FastMarquee gradient={false} className={rootClassName}>
            {Children.map(children, (child) => ({
                ...child,
                props: {
                    ...child.props,
                    className: cn(child.props.className, `${variant}`),
                },
            }))}
        </FastMarquee>
    );
};
