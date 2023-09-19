import React from "react";
import { ResizeHandleIcon } from "./icons/resize-handle";
import clsx from "clsx";

type Props = {
    left: React.ReactNode;
    right: React.ReactNode;
    className?: string;
    defaultPercentage?: number;
    maxPercentage?: number;
};

export const ResizablePane = ({
    left,
    right,
    className,
    defaultPercentage = 60,
    maxPercentage = 75,
}: Props) => {
    const [viewPercentage, setViewPercentage] =
        React.useState(defaultPercentage);
    const [resizing, setResizing] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleMouseUp = () => {
            setResizing(false);
        };

        if (resizing !== null) {
            window.addEventListener("mouseup", handleMouseUp);

            return () => {
                window.removeEventListener("mouseup", handleMouseUp);
            };
        }

        return;
    }, [resizing]);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (resizing) {
                const containerRect =
                    containerRef.current?.getBoundingClientRect();

                if (!containerRect) return;

                const newViewPercentage = Math.min(
                    maxPercentage,
                    Math.max(
                        100 - maxPercentage,
                        ((e.clientX - containerRect.left) /
                            containerRect.width) *
                            100,
                    ),
                );

                setViewPercentage(newViewPercentage);
            }
        };

        if (resizing !== null) {
            window.addEventListener("mousemove", handleMouseMove);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }

        return;
    }, [resizing]);

    React.useEffect(() => {
        const currentCursor = document.body.style.cursor;

        if (resizing) {
            document.body.style.cursor = "col-resize";
        } else {
            document.body.style.cursor = "auto";
        }

        return () => {
            document.body.style.cursor = currentCursor;
        };
    }, [resizing]);

    return (
        <div
            className={clsx("re-flex-1", "re-grid", className)}
            style={{
                gridTemplateColumns: `minmax(0, ${
                    viewPercentage / 100
                }fr) 16px minmax(0, ${(100 - viewPercentage) / 100}fr)`,
            }}
            ref={containerRef}
        >
            <div>{left}</div>
            <div
                className={clsx(
                    "re-w-4",
                    "re-flex-shrink-0",
                    "re-flex",
                    "re-items-center",
                    "re-justify-center",
                )}
            >
                <ResizeHandleIcon
                    className="re-cursor-col-resize"
                    onMouseDown={(event) => {
                        setResizing(true);
                        event.preventDefault();
                    }}
                />
            </div>
            <div>{right}</div>
        </div>
    );
};
