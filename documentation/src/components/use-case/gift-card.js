import React from "react";
import Link from "@docusaurus/Link";

export const GiftCard = () => {
    return (
        <div className="bg-[#eeeef0] p-6 rounded-lg shadow-startTiles">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-4 order-2 sm:order-1">
                    <div className="font-montserrat font-medium text-[#242436]">
                        IF YOU’RE ALREADY USING <strong>refine</strong>,
                        <br />
                        <strong>SHARE</strong> YOUR USECASE &{" "}
                        <strong>INSPIRE</strong> OTHERS
                    </div>
                    <div className="font-montserrat text-[#242436] text-sm">
                        We are very happy to see how people are building great
                        things with <strong>refine</strong>. Share your use-case
                        to get listed on the showcase page and receive{" "}
                        <strong>$100 Amazon Gift card</strong>.
                    </div>
                    <Link
                        to="https://refinedev.typeform.com/to/Ypm6r6oj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shadow-startTiles appearance-none flex items-center justify-center no-underline font-bold font-montserrat text-sm h-8 w-44 text-white text-center bg-gradient-to-l from-[#1890FF] to-[#47EBF5] border-0 rounded-[4px] cursor-pointer"
                    >
                        ADD YOURS <span className="mx-1 font-normal">&</span>
                        WIN
                    </Link>
                </div>
                <div className="flex justify-center order-1 sm:order-2">
                    <img
                        className="h-[170px] ml-0 sm:ml-12"
                        src="/landing/giftcard.png"
                        alt="Giftcard"
                    />
                </div>
            </div>
        </div>
    );
};
