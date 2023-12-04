import React from "react";
import { FaBook } from "react-icons/fa6";
import { InfoBadge } from "../info-badge";

type Props = {
    id: string;
    description: string;
    text?: string;
};

export const GuideBadge = ({
    id,
    description = "Please check the guide for more information on this topic.",
    text,
}: Props) => {
    return (
        <InfoBadge
            id={id}
            color="cyan"
            icon={<FaBook />}
            text={text}
            description={
                <>
                    <div className="text-xs font-semibold mb-1">
                        {text ?? "Check the guide"}
                    </div>
                    <div className="text-xs">{description}</div>
                </>
            }
        />
    );
};
