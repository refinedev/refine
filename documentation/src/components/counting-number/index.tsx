import React from "react";
import { useInView } from "framer-motion";
import { useAnimatedCounter } from "../../hooks/use-animated-counter";

type CountingNumberProps = {
    className?: string;
    from?: number;
    to: number;
    duration?: number;
    format?: (value: number) => string;
    once?: boolean;
};

export const CountingNumber: React.FC<CountingNumberProps> = ({
    className,
    from,
    to,
    format,
    duration = 1,
    once = true,
}) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once });

    const counter = useAnimatedCounter(inView ? to : from ?? 0, from, duration);

    return (
        <span ref={ref} className={className}>
            {format ? format(counter) : counter}
        </span>
    );
};
