import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HikerIcon, RocketIcon } from "../icons";
import { useTWBreakpoints } from "../../../hooks/use-tw-breakpoints";

export const SectionFreeStart: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

    const { sm, md, lg, xl } = useTWBreakpoints();

    const { scrollYProgress: scrollYProgressIncoming } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const { scrollYProgress: scrollYProgressOutgoing } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const scroll = useTransform<number, number>(
        [scrollYProgressIncoming, scrollYProgressOutgoing],
        ([incoming, outgoing]) => {
            return incoming - outgoing;
        },
    );

    const leftCardOpacity = useTransform(scroll, [1, 0, -1], [0, 1, 0]);
    const leftCardX = useTransform(scroll, [1, 0, -1], [-100, 0, -100]);
    const leftCardRotate = useTransform(
        scroll,
        [1, 0, -1],
        ["0deg", "-4deg", "0deg"],
    );
    const rightCardOpacity = useTransform(scroll, [1, 0, -1], [0, 1, 0]);
    const rightCardX = useTransform(scroll, [1, 0, -1], [100, 0, 100]);
    const rightCardRotate = useTransform(
        scroll,
        [1, 0, -1],
        ["0deg", "4deg", "0deg"],
    );
    const orOpacity = useTransform(scroll, [1, 0, -1], [0, 1, 0]);
    const orY = useTransform(scroll, [1, 0, -1], [200, 0, -200]);
    const orRotate = useTransform(scroll, [1, 0, -1], [-180, -5, 180]);

    const whyNotOpacity = useTransform(scroll, [1, 0, -1], [0, 1, 1]);
    const whyNotY = useTransform(scroll, [1, 0, -1], [180, 0, 180]);

    return (
        // Scroll animated container
        <motion.div ref={ref} className="h-auto lg:h-[318px] bg-white">
            {/* Scroll animated section */}
            <motion.div className="h-auto lg:h-[318px] w-screen top-0 left-0 relative lg:sticky pt-8 lg:pt-16 px-4 md:px-10 lg:px-16 xl:px-24 flex flex-col">
                <div className="flex flex-col lg:flex-row lg:pt-12 gap-0 lg:gap-7 max-w-5xl lg:px-3 lg:mx-auto w-full items-center">
                    <motion.div
                        className="shadow-startTiles rounded-xl p-2.5 flex-1 h-full w-full lg:w-auto"
                        style={
                            lg
                                ? {
                                      x: leftCardX,
                                      opacity: leftCardOpacity,
                                      rotate: leftCardRotate,
                                  }
                                : {}
                        }
                    >
                        <div className="border-2 border-dashed border-[#1784EB] rounded relative flex w-full pr-2.5 pl-1 lg:pl-7 pt-8 pb-10 h-full items-center">
                            <div className="text-[#1784EB] w-2/3 lg:w-full">
                                <div className="font-extrabold text-[43px] md:text-5xl lg:text-6xl font-montserrat tracking-normal leading-[50px] text-center">
                                    START
                                </div>
                                <div className="font-semibold text-2xl md:text-3xl lg:text-4xl font-montserrat tracking-tighter leading-[36px] text-center">
                                    FROM SCRATCH
                                </div>
                                <div className="font-normal text-lg md:text-xl lg:text-2xl font-montserrat tracking-tight leading-[24px] text-center">
                                    FOR FREEDOM
                                </div>
                            </div>
                            <HikerIcon className="absolute right-0 bottom-0 w-2/3 h-auto lg:w-[257px] lg:h-[160px]" />
                        </div>
                    </motion.div>
                    <motion.div
                        style={
                            lg
                                ? {
                                      y: orY,
                                      opacity: orOpacity,
                                      rotate: orRotate,
                                  }
                                : { rotate: -3 }
                        }
                        className="h-fit z-[1] px-5 -my-4 lg:my-0 lg:-mx-16 bg-[#3FDCF7] font-extrabold font-montserrat text-white uppercase text-[39px] leading-[42px] lg:text-[52px] lg:leading-[52px] py-0.5 -rotate-3 shadow-startTiles"
                    >
                        or
                    </motion.div>
                    <motion.div
                        className="shadow-startTiles rounded-xl p-2.5 flex-1 h-full w-full lg:w-auto"
                        style={
                            lg
                                ? {
                                      x: rightCardX,
                                      opacity: rightCardOpacity,
                                      rotate: rightCardRotate,
                                  }
                                : {}
                        }
                    >
                        <div className="border-2 border-dashed border-[#1784EB] rounded relative flex w-full pr-2.5 pl-1 lg:pl-8 py-5 h-full items-center justify-center">
                            <div className="text-[#1784EB] w-2/3 lg:w-full">
                                <div className="font-extrabold text-[43px] md:text-5xl lg:text-6xl font-montserrat tracking-normal leading-[50px] text-center">
                                    USE
                                </div>
                                <div className="font-semibold text-2xl md:text-3xl lg:text-4xl font-montserrat tracking-tighter leading-[36px] text-center">
                                    A FRAMEWORK
                                </div>
                                <div className="font-normal text-lg md:text-xl lg:text-2xl font-montserrat tracking-tight leading-[24px] text-center">
                                    FOR PRODUCTIVITY
                                </div>
                                <div className="font-normal text-lg md:text-xl lg:text-2xl font-montserrat tracking-tight leading-[24px] text-center">
                                    AND ROBUSTNESS
                                </div>
                            </div>
                            <RocketIcon className="w-[28%] h-auto lg:w-[129px] lg:h-[129px]" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
            {/* Scroll snap alignment */}
            <div className="hidden lg:block snap-start h-screen lg:h-[318px]" />
        </motion.div>
    );
};
