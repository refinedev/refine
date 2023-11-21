import React from "react";
import { FaRoute } from "react-icons/fa6";
import { InfoBadge } from "../info-badge";

type Props = {
    id: string;
    description: string;
    text?: string;
};

export const RouterBadge = ({
    id = "guides-concepts/routing/",
    description = "This value can be inferred from the route. Click to see the guide for more information.",
    text,
}: Props) => {
    return (
        <InfoBadge
            id={id}
            color="orange"
            text={text}
            icon={<FaRoute />}
            description={
                <>
                    <div className="text-xs font-semibold mb-1">
                        {text ?? "Router Integrated"}
                    </div>
                    <div className="text-xs">{description}</div>
                </>
            }
        />
    );
};
