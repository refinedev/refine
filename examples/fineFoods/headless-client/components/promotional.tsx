import React from "react";

import { PlateIcon } from "../components/icons";

export const Promotional: React.FC = () => {
    return (
        <div className="flex flex-wrap items-center justify-between ">
            <div className="flex flex-col gap-8">
                <div className=" text-white font-[Montserrat]">
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
                <button className="w-48 bg-white hover:bg-gray-100 text-primary text-xl font-bold py-2 px-4 border border-primary rounded-md">
                    Explore Menu
                </button>
            </div>
            <PlateIcon height={400} />
        </div>
    );
};
