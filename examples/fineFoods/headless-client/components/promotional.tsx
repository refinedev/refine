import React from "react";

import { PlateIcon } from "../components/icons";

export const Promotional: React.FC = () => {
    return (
        <div className="flex flex-wrap items-center justify-between ">
            <div className="text-white font-[Montserrat]">
                <h1 className="text-7xl font-bold leading-[64px]">
                    Delight <br /> in every bite!
                </h1>
                <h3 className="text-3xl">
                    Delivering happiness,{" "}
                    <span className="underline underline-offset-4">
                        on time
                    </span>
                    .
                </h3>
            </div>
            <PlateIcon height={400} />
        </div>
    );
};
