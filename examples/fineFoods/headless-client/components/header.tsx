import React from "react";

import { MotorcycleIcon, FinefoodsIcon, BasketIcon } from "../components/icons";

export const Header: React.FC = () => {
    return (
        <header className="bg-primary">
            <div className="container flex justify-between items-center h-full mx-auto px-2 md:px-0">
                <div className="flex gap-4">
                    <MotorcycleIcon />
                    <FinefoodsIcon width={200} />
                </div>
                <BasketIcon />
            </div>
        </header>
    );
};
