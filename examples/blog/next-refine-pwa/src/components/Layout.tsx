import * as React from 'react';
import { LayoutProps } from '@pankod/refine-core';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="bg-red">
            <div className="py-8 px-24 sticky top-0 z-50 bg-[#fff] relative flex justify-between items-center">
                <a href="https://refine.dev">
                    <img src="./refine_logo.png" alt="refine logo" />
                </a>
                <button className="outline outline-[#D6D58E] outline-offset-2 py-2 px-8 bg-[#042940] w-fit text-white rounded mt-2 mb-2">
                    Cart
                </button>
            </div>
            <div className="grid-rows-3">{children}</div>
        </div>
    );
};
