import React from "react";
import { DevtoolsSelector } from "./devtools-selector";
import { DevtoolsIcon } from "./icons/devtools-icon";
import { SelectorButtonIcon } from "./icons/selector-button";

type Props = {
  onClick?: () => void;
  groupHover?: boolean;
  onSelectorHighlight: (name: string) => void;
  onSelectorOpen: () => void;
};

export const DevtoolsPin = ({
  onClick,
  onSelectorHighlight,
  onSelectorOpen,
}: Props) => {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={{
        position: "relative",
        userSelect: "none",
        WebkitUserSelect: "none",
        background: "none",
        border: "none",
        padding: 0,
        paddingRight: "1px",
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: hover ? "#0FBDBD" : "#6C7793",
        transition: "color 0.1s ease-in-out",
      }}
      onClick={onClick}
    >
      <DevtoolsIcon />
      <DevtoolsSelector
        style={{
          position: "absolute",
          top: 5,
          right: 18,
          width: "16px",
          height: "16px",
        }}
        icon={
          <SelectorButtonIcon
            width={16}
            height={16}
            style={{ pointerEvents: "none" }}
          />
        }
        onSelectorOpen={onSelectorOpen}
        onHighlight={onSelectorHighlight}
      />
    </div>
  );
};
