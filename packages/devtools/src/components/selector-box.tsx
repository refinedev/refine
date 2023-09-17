import React from "react";

export const SelectorBox = ({
    width,
    height,
    x,
    y,
    name,
}: {
    width: number;
    height: number;
    x: number;
    y: number;
    name: string;
}) => {
    const namePosition = y - 6 > 25 ? "top" : "bottom";

    const outlinePosition = x > 7 ? "outside" : "inside";

    return (
        <div
            id="selector-box"
            style={{
                pointerEvents: "none",
                position: "fixed",
                opacity: name ? 1 : 0,
                transition: "all 0.2s ease-in-out",
                border: "1.5px solid #47EBEB",
                borderRadius: "4px",
                borderTopLeftRadius: 0,
                background: "rgba(37,160,160, 0.25)",
                backdropFilter: "sepia(30%) hue-rotate(180deg)",
                zIndex: 9999,
                ...(outlinePosition === "outside"
                    ? {
                          left: -6,
                          top: -6,
                          width: width + 10,
                          height: height + 10,
                          transform: `translate(${x}px, ${y}px)`,
                      }
                    : {
                          left: 0,
                          top: 0,
                          width: width - 10,
                          height: height - 20,
                          transform: `translate(${x + 4}px, ${y + 4}px)`,
                      }),
            }}
        >
            <div
                style={{
                    position: "absolute",
                    left: "-1.5px",
                    background: "#1D1E30",
                    padding: "4px 6px",
                    border: "1.5px solid #47EBEB",
                    fontSize: "13px",
                    lineHeight: "16px",
                    fontWeight: 600,
                    color: "#CFD7E2",
                    display: name ? "block" : "none",
                    ...(namePosition === "top"
                        ? {
                              top: "-27px",
                              borderTopLeftRadius: "4px",
                              borderTopRightRadius: "4px",
                          }
                        : {
                              top: "-1.5px",
                              borderBottomLeftRadius: "0",
                              borderBottomRightRadius: "4px",
                          }),
                }}
            >
                {name}
            </div>
        </div>
    );
};
