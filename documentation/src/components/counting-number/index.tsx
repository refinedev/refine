import React from "react";
import { useInView } from "framer-motion";
import { useAnimatedCounter } from "../../hooks/use-animated-counter";

type CountingNumberProps = {
    from?: number;
    to: number;
    duration?: number;
    format?: boolean;
    once?: boolean;
};

export const CountingNumber: React.FC<CountingNumberProps> = ({
    // from,
    to,
    // duration,
    format,
    // once,
}) => {
    // const ref = React.useRef<HTMLSpanElement>(null);
    // const inView = useInView(ref, { once });

    // const counter = useAnimatedCounter(inView ? to : from ?? 0, from, duration);

    // const rounded = Math.round(counter);

    return (
        <span
        /* ref={ref} */
        >
            {/* {format ? rounded.toLocaleString("en-US") : rounded} */}
            {format ? to?.toLocaleString?.("en-US") ?? to ?? 0 : to}
        </span>
    );
};
