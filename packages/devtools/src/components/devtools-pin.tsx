import React from "react";
import { RefineDevtoolsIcon } from "./icons/devtools-icon";
import { getPinButtonTransform } from "src/utilities";

type Props = {
    onClick?: () => void;
    active?: boolean;
    groupHover?: boolean;
};

export const DevtoolsPin = ({ active, onClick, groupHover }: Props) => {
    const [hover, setHover] = React.useState(false);

    return (
        <button
            type="button"
            style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "white",
                cursor: "pointer",
                width: "100%",
                height: "100%",
                transition: "all ease-in-out 0.2s",
                transform: `scale(${hover ? 1.05 : 1}) ${getPinButtonTransform(
                    groupHover,
                )}`,
                filter: `drop-shadow(0 0 ${
                    hover ? "8px" : "5px"
                } rgba(71, 235, 235, ${hover ? "0.5" : "0.25"}))`,
            }}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onClick={onClick}
        >
            <RefineDevtoolsIcon active={active} hovered={hover} />
        </button>
    );
};
