import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HikerIcon, RocketIcon } from "../icons";

export const SectionFreeStart: React.FC = () => {
    const ref = React.useRef<HTMLDivElement>(null);

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
    const rightCardOpacity = useTransform(scroll, [1, 0, -1], [0, 1, 0]);
    const rightCardX = useTransform(scroll, [1, 0, -1], [100, 0, 100]);
    const orOpacity = useTransform(scroll, [1, 0, -1], [0, 1, 0]);
    const orY = useTransform(scroll, [1, 0, -1], [200, 0, -200]);
    const orRotate = useTransform(scroll, [1, 0, -1], [-180, -5, 180]);

    return (
        // Scroll animated container
        <motion.div
            ref={ref}
            className="h-[calc(578px+48px)] lg:h-[calc(400px+48px)] bg-white"
        >
            {/* Scroll animated section */}
            <motion.div className="h-[calc(578px+48px)] lg:h-[calc(400px+48px)] w-screen top-0 left-0 sticky pt-16 px-7 md:px-10 lg:px-16 xl:px-24 flex flex-col">
                <div className="flex pt-12 gap-7 max-w-5xl px-3 mx-auto w-full items-center">
                    <motion.div
                        className="shadow-startTiles rounded-xl p-2.5 flex-1 h-full"
                        style={{ x: leftCardX, opacity: leftCardOpacity }}
                    >
                        <div className="border-2 border-dashed border-[#1784EB] rounded relative flex w-full pr-2.5 pl-7 pt-8 pb-10 h-full items-center">
                            <div className="text-[#1784EB]">
                                <div className="font-extrabold text-6xl font-montserrat tracking-normal leading-[50px] text-center">
                                    START
                                </div>
                                <div className="font-semibold text-4xl font-montserrat tracking-tighter leading-[36px] text-center">
                                    FROM SCRATCH
                                </div>
                                <div className="font-normal text-2xl font-montserrat tracking-tight leading-[24px] text-center">
                                    FOR FREEDOM
                                </div>
                            </div>
                            <HikerIcon className="absolute right-0 bottom-0" />
                        </div>
                    </motion.div>
                    <motion.div
                        style={{ y: orY, opacity: orOpacity, rotate: orRotate }}
                        className="h-fit z-[1] px-5 -mx-16 bg-[#3FDCF7] font-extrabold font-montserrat text-white uppercase text-[52px] leading-[52px] py-0.5 -rotate-3 shadow-startTiles"
                    >
                        or
                    </motion.div>
                    <motion.div
                        className="shadow-startTiles rounded-xl p-2.5 flex-1 h-full"
                        style={{ x: rightCardX, opacity: rightCardOpacity }}
                    >
                        <div className="border-2 border-dashed border-[#1784EB] rounded relative flex w-full pr-2.5 pl-8 py-5 h-full items-center justify-center">
                            <div className="text-[#1784EB]">
                                <div className="font-extrabold text-6xl font-montserrat tracking-normal leading-[50px] text-center">
                                    USE
                                </div>
                                <div className="font-semibold text-4xl font-montserrat tracking-tighter leading-[36px] text-center">
                                    A FRAMEWORK
                                </div>
                                <div className="font-normal text-2xl font-montserrat tracking-tight leading-[24px] text-center">
                                    FOR PRODUCTIVITY
                                </div>
                                <div className="font-normal text-2xl font-montserrat tracking-tight leading-[24px] text-center">
                                    AND ROBUSTNESS
                                </div>
                            </div>
                            <RocketIcon className="" />
                        </div>
                    </motion.div>
                </div>
                <div className="flex items-center justify-center pt-11">
                    <motion.div
                        style={{ y: orY, opacity: orOpacity, rotate: -2.5 }}
                        className="h-fit z-[1] px-5 -mx-16 bg-[#3FDCF7] font-extrabold font-montserrat text-white uppercase text-[52px] leading-[52px] py-0.5 -rotate-3 shadow-startTiles flex"
                    >
                        why not both?
                    </motion.div>
                </div>
            </motion.div>
            {/* Scroll snap alignment */}
            <div className="snap-start h-[calc(578px+48px)] lg:h-[calc(400px+48px)]" />
        </motion.div>
    );
};
