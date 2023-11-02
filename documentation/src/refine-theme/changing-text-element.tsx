import React from "react";

type Props = {
    first: string;
    second: string;
    onEnd?: () => void;
    tick?: number;
    className?: string;
    prevClassName?: string;
    nextClassName?: string;
    activeClassName?: string;
};

export type ChangingTextElementRef = {
    start: () => void;
    reset: () => void;
};

export const ChangingTextElement = React.forwardRef<
    ChangingTextElementRef,
    Props
>(function ChangingText(
    {
        first,
        second,
        onEnd,
        tick = 75,
        className,
        prevClassName,
        nextClassName,
        activeClassName,
    },
    ref,
) {
    const maxLen = Math.max(first.length, second.length);
    const prev = first.padEnd(maxLen, " ");
    const next = second.padEnd(maxLen, " ");
    const [pos, setPos] = React.useState(-1);
    const [status, setStatus] = React.useState<"idle" | "running" | "done">(
        "idle",
    );

    React.useImperativeHandle(ref, () => ({
        start: () => {
            setPos(-1);
            setStatus("running");
        },
        reset: () => {
            setPos(-1);
            setStatus("idle");
        },
    }));

    React.useEffect(() => {
        if (status === "running") {
            setPos(-1);
        }
    }, [status]);

    React.useEffect(() => {
        if (status === "running") {
            const timer = setInterval(() => {
                setPos((prev) => {
                    if (prev === maxLen - 1) {
                        setStatus("done");
                        return prev;
                    }

                    return prev + 1;
                });
            }, tick);

            return () => clearInterval(timer);
        }
    }, [status, tick, maxLen]);

    React.useEffect(() => {
        if (status === "done") {
            onEnd?.();
        }
    }, [status]);

    return (
        <span className={className}>
            {next
                .split("")
                .slice(0, Math.max(pos, 0))

                .map((letter, index) => {
                    return (
                        <span key={`next-${index}`} className={prevClassName}>
                            {letter}
                        </span>
                    );
                })}
            {next.split("")[pos] && (
                <span key={`${pos}-${next[pos]}`} className={activeClassName}>
                    {next.split("")[pos]}
                </span>
            )}
            {prev
                .split("")
                .slice(pos + 1)
                .map((letter, index) => {
                    return (
                        <span key={`prev-${index}`} className={nextClassName}>
                            {letter}
                        </span>
                    );
                })}
        </span>
    );
});
