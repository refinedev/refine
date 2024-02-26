import React from "react";
import { ArrowUnionIcon } from "./icons/arrow-union-icon";

const Y_OFFSET = 38;
const X_OFFSET = 7;

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
  const namePosition =
    y > Y_OFFSET ? "top" : height > 3 * Y_OFFSET ? "inset" : "bottom";

  const outlinePosition = x > X_OFFSET && y > X_OFFSET ? "outside" : "inside";

  return (
    <div
      id="selector-box"
      style={{
        pointerEvents: "none",
        position: "fixed",
        opacity: name ? 1 : 0,
        transitionProperty: "width, height, transform, opacity",
        transitionDuration: "0.15s",
        transitionTimingFunction: "ease-out",
        border: "1.5px solid #47EBEB",
        borderRadius: "4px",
        background: "rgba(37,160,160, 0.25)",
        backdropFilter: "sepia(30%) hue-rotate(180deg)",
        zIndex: 99998,
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
          background: "#303450",
          border: "1px solid #474E6B",
          borderRadius: "4px",
          padding: "8px 12px",
          fontSize: "12px",
          lineHeight: "16px",
          fontWeight: 400,
          color: "#ffffff",
          display: name ? "block" : "none",
          ...(namePosition === "top" && {
            top: "-38px",
          }),
          ...(namePosition === "bottom" && {
            bottom: "-38px",
          }),
          ...(namePosition === "inset" && {
            top: "4px",
            left: "8px",
          }),
        }}
      >
        {name}

        <ArrowUnionIcon
          style={{
            position: "absolute",
            left: "30%",
            ...(namePosition === "top" && {
              transform: "translateX(-50%) rotate(180deg)",
              bottom: "-9px",
            }),
            ...(namePosition === "bottom" && {
              transform: "translateX(-50%) ",
              top: "-9px",
            }),
            ...(namePosition === "inset" && {
              transform: "translateX(-50%) rotate(-90deg)",
              top: "8px",
              left: "-1px",
            }),
            display: name ? "block" : "none",
          }}
        />
      </div>
    </div>
  );
};
