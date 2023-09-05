import React from "react";
import { RefineDevtoolsIcon } from "./icons/devtools-icon";

type Props = {
    onClick?: () => void;
    active?: boolean;
};

export const DevtoolsPin = ({ active, onClick }: Props) => {
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
                transform: `scale(${hover ? 1.05 : 1})`,
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
