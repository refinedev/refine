import * as React from "react";
import { LayoutProps } from "@pankod/refine-core";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="bg-red">
            <div className="relative sticky top-0 z-50 flex items-center justify-between bg-[#fff] py-8 px-24">
                <a href="https://refine.dev">
                    <img src="./refine_logo.png" alt="refine logo" />
                </a>
                <button className="mt-2 mb-2 w-fit rounded bg-[#042940] py-2 px-8 text-white outline outline-offset-2 outline-[#D6D58E]">
                    Cart
                </button>
            </div>
            <div className="grid-rows-3">{children}</div>
        </div>
    );
};
