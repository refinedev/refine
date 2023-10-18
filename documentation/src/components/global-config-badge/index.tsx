import React from "react";
import { FaGear } from "react-icons/fa6";
import { InfoBadge } from "../info-badge";

type Props = {
    id: string;
    description: string;
    text?: string;
};

export const GlobalConfigBadge = ({
    id = "core/refine-component",
    description = "This value can be configured globally. Click to see the guide for more information.",
    text,
}: Props) => {
    return (
        <InfoBadge
            color="purple"
            icon={<FaGear />}
            text={text}
            id={id}
            description={
                <>
                    <div className="text-xs font-semibold mb-1">
                        {text ?? "Globally Configurable"}
                    </div>
                    <div className="text-xs">{description}</div>
                </>
            }
        />
    );
};
