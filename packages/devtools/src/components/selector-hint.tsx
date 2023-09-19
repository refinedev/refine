import React from "react";

export const SelectorHint = ({
    active,
    groupHover,
}: {
    active: boolean;
    groupHover?: boolean;
}) => {
    return (
        <div
            style={{
                pointerEvents: "none",
                position: "absolute",
                left: "calc(-50% - 100px - 14px)",
                top: "-50px",
                width: "200px",
                opacity: active ? 1 : 0,
                transform: groupHover ? "translateX(0)" : "translateX(40px)",
                transitionDuration: "0.2s",
                transitionProperty: "transform,opacity",
                transitionTimingFunction: "ease-in-out",
                padding: "8px",
                fontSize: "10px",
                lineHeight: "12px",
                fontWeight: 400,
                textShadow:
                    "0 0 2px #1D1E30, 1px 0 2px #1D1E30, -1px 0 2px #1D1E30, 0 1px 2px #1D1E30, 0 -1px 2px #1D1E30",
            }}
        >
            <kbd
                style={{
                    marginLeft: "4px",
                    padding: "1px 2px",
                    borderRadius: "2px",
                    background: "whitesmoke",
                    color: "dimgray",
                    border: "0.5px solid silver",
                    boxShadow: "0 1px 1px silver",
                    textShadow: "none",
                }}
            >
                shift
            </kbd>{" "}
            to move to parent.
            <kbd
                style={{
                    marginLeft: "4px",
                    padding: "1px 2px",
                    borderRadius: "2px",
                    background: "whitesmoke",
                    color: "dimgray",
                    border: "0.5px solid silver",
                    boxShadow: "0 1px 1px silver",
                    textShadow: "none",
                }}
            >
                space
            </kbd>{" "}
            to highlight in monitor.
        </div>
    );
};
