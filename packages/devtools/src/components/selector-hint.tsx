import React from "react";

export const SelectorHint = ({ active }: { active: boolean }) => {
  return (
    <div
      style={{
        color: "white",
        pointerEvents: "none",
        position: "absolute",
        left: "calc(-50% - 144px - 14px)",
        top: "-36px",
        width: "max-content",
        borderRadius: "8px",
        backgroundColor: "#40414A",
        opacity: active ? 1 : 0,
        transitionDuration: "0.2s",
        transitionProperty: "transform,opacity",
        transitionTimingFunction: "ease-in-out",
        padding: "8px",
        fontSize: "12px",
        lineHeight: "12px",
        fontWeight: 400,
        textShadow:
          "0 0 2px #1D1E30, 1px 0 2px #1D1E30, -1px 0 2px #1D1E30, 0 1px 2px #1D1E30, 0 -1px 2px #1D1E30",
      }}
    >
      <kbd
        style={{
          marginLeft: "4px",
          padding: "2px 4px",
          borderRadius: "2px",
          background: "#1D1E30",
          color: "#CFD7E2",
          border: "none",
          textShadow: "none",
        }}
      >
        shift
      </kbd>{" "}
      to move to parent.
      <kbd
        style={{
          marginLeft: "4px",
          padding: "2px 4px",
          borderRadius: "2px",
          background: "#1D1E30",
          color: "#CFD7E2",
          border: "none",
          textShadow: "none",
        }}
      >
        space
      </kbd>{" "}
      to highlight in monitor.
    </div>
  );
};
