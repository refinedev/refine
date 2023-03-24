import React from "react";

const SectionReady = () => {
    return (
        <div className="flex items-center h-auto max-w-[800px] mx-auto lg:snap-start lg:h-screen py-16 px-4 lg:px-0 lg:py-0 lg:pt-16">
            <div className="flex flex-col items-center font-montserrat w-full h-full max-h-[376px] shadow-startTiles rounded-2xl bg-[#ededef33] p-4 lg:p-12">
                <h2 className="uppercase font-extrabold text-3xl text-[#2A2A42] tracking-tight mb-0">
                    now you&apos;re ready
                </h2>

                <a
                    href="https://refine.dev/docs/tutorial/introduction/index/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shadow-startTiles mt-6 appearance-none flex items-center justify-center no-underline font-bold font-montserrat text-sm h-8 w-44 text-white text-center bg-gradient-to-l from-[#1890FF] to-[#47EBF5] border-0 rounded-[4px] cursor-pointer"
                >
                    Start Tutorial
                </a>

                <div className="border border-dashed border-[#acacb68b] w-full h-[1px] my-12" />

                <p className="text-center max-w-[408px] text-[16px] leading-[20px] mb-0 font-medium text-[#242436]">
                    <strong className="block font-bold">
                        NEED ANY FURTHER INFORMATION?
                    </strong>
                    SET UP A <strong className="font-bold">1X1</strong> SESSION
                    WITH A <strong className="font-bold">refine</strong>{" "}
                    ENGINEER.
                </p>

                <a
                    href="https://refinedev.typeform.com/to/Z9wS06kE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shadow-startTiles appearance-none flex items-center justify-center mt-6 no-underline font-bold font-montserrat text-sm h-8 w-44 text-[#1890FF] text-center bg-white rounded-[4px] cursor-pointer border border-solid border-[#EDEDEF]"
                >
                    Book a session
                </a>
            </div>
        </div>
    );
};

export default SectionReady;
