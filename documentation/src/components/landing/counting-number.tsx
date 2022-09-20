import React, { useEffect, useState } from "react";
import { animate, useInView } from "framer-motion";

type UseAnimatedCounter = (
    maxValue: number,
    initialValue?: number,
    duration?: number,
) => number;

export const useAnimatedCounter: UseAnimatedCounter = (
    maxValue: number,
    initialValue = 0,
    duration = 1,
) => {
    const [counter, setCounter] = useState<number>(initialValue);

    useEffect(() => {
        const controls = animate(initialValue, maxValue, {
            duration,
            ease: "easeOut",
            onUpdate(value) {
                setCounter(value);
            },
        });
        return () => controls.stop();
    }, [initialValue, maxValue, duration]);

    return counter;
};

type CountingNumberProps = {
    from?: number;
    to: number;
    duration?: number;
};

export const CountingNumber: React.FC<CountingNumberProps> = ({
    from,
    to,
    duration,
}) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    const inView = useInView(ref);
    const counter = useAnimatedCounter(inView ? to : from ?? 0, from, duration);
    return <span ref={ref}>{Math.round(counter)}</span>;
};
